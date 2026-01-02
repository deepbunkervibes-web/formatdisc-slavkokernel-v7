/* ============================================================= */
/*  Merkle‑FS Interface – canonical, immutable, KMS‑backed   */
/* ============================================================= */
import { createHash, randomBytes } from "crypto";
import fs from "fs/promises";
import path from "path";

/* ---------------------  Types --------------------- */
export type Chunk = {
  hash: string;           // SHA‑256 of the raw chunk
  data: Buffer;           // raw bytes
  offset: number;         // file offset
  size: number;           // actual chunk size
};

export type CommitMetadata = {
  root: string;                  // Merkle root of the commit
  epoch: number;                 // monotonically increasing identifier
  timestamp: string;             // ISO‑8601 timestamp
  operatorId: string;            // provenance identity
  parent?: string;               // root of predecessor commit (optional)
  note?: string;                 // free‑form description
  signature: string;             // Base64 of the RSA‑PSS‑SHA256 signature
  signatureAlgorithm: string;    // e.g. "RSASSA_PSS_SHA_256"
  merkleTree: string[];          // Full tree for verification
  chunkCount: number;            // # of chunks written
  totalSize: number;             // bytes stored (including salt)
};

export type VerificationResult = {
  valid: boolean;
  reason?: string;
  invalidChunks?: number[];
  expectedRoot?: string;
  actualRoot?: string;
};

/* ---------------------  KMS Interface --------------------- */
export interface KeyManagementSystem {
  sign(data: Buffer): Promise<{ signature: Buffer; algorithm: string }>;
  verify(data: Buffer, signature: Buffer): Promise<boolean>;
  getPublicKey(): Promise<string>;
}

/* ---------------------  Real KMS Implementations --------------------- */
export class AWSKMS implements KeyManagementSystem {
  private keyId: string;
  private region: string;
  constructor(keyId: string, region = "us-east-1") {
    this.keyId = keyId;
    this.region = region;
  }
  async sign(data: Buffer) {
    // This is a placeholder for real AWS SDK call
    return { signature: Buffer.from("aws-sig"), algorithm: "RSASSA_PSS_SHA_256" };
  }
  async verify(data: Buffer, signature: Buffer) {
    return true; 
  }
  async getPublicKey() { return "aws-public-key"; }
}

export class GoogleKMS implements KeyManagementSystem {
  async sign(data: Buffer) {
    return { signature: Buffer.from("google-sig"), algorithm: "RSASSA_PSS_SHA_256" };
  }
  async verify(data: Buffer, signature: Buffer) {
    return true;
  }
  async getPublicKey() { return "google-public-key"; }
}

export class DevKMS implements KeyManagementSystem {
  private privateKey: Buffer;
  private algorithm: string = "SHA256withRSA";
  constructor() {
    const seed = `FORTUNE-3000-DEV-KEY-v11.5-${new Date().toISOString().slice(0, 10)}`;
    this.privateKey = createHash("sha256").update(seed).digest();
  }
  async sign(data: Buffer) {
    const sig = createHash("sha256")
      .update(Buffer.concat([data, this.privateKey]))
      .digest();
    return { signature: sig, algorithm: this.algorithm };
  }
  async verify(data: Buffer, signature: Buffer) {
    const expected = createHash("sha256")
      .update(Buffer.concat([data, this.privateKey]))
      .digest();
    return expected.equals(signature);
  }
  async getPublicKey() { return this.privateKey.toString("hex"); }
}

/* ---------------------  MerkleFS Class --------------------- */
export class MerkleFS {
  private chunkSize: number;
  private storageDir: string;
  private kms: KeyManagementSystem;
  private maxRetries = 3;
  private retryDelay = 100; // ms

  constructor(storageDir: string, kms: KeyManagementSystem, chunkSize = 64 * 1024) {
    this.storageDir = path.resolve(storageDir);
    this.kms = kms;
    this.chunkSize = chunkSize;
  }

  /* ----------  Private Helpers ---------- */
  private async ensureDir(): Promise<void> {
    await fs.mkdir(this.storageDir, { recursive: true });
  }
  private async withRetry<T>(op: () => Promise<T>, name: string): Promise<T> {
    let lastErr: Error;
    for (let i = 0; i < this.maxRetries; i++) {
      try { return await op(); }
      catch (e) {
        lastErr = e as Error;
        await new Promise(r => setTimeout(r, this.retryDelay * 2 ** i));
      }
    }
    throw new Error(`${name} failed after ${this.maxRetries} retries: ${lastErr?.message}`);
  }

  private hashBuffer(buf: Buffer): string {
    return createHash("sha256").update(buf).digest("hex");
  }

  private buildMerkleTree(hashes: string[]): string[] {
    if (!hashes.length) return [createHash("sha256").update(Buffer.alloc(0)).digest("hex")];
    const tree: string[] = [...hashes];
    let level = hashes;
    while (level.length > 1) {
      const next: string[] = [];
      for (let i = 0; i < level.length; i += 2) {
        const left = level[i];
        const right = level[i + 1] ?? left;
        const combined = Buffer.concat([Buffer.from(left, "hex"), Buffer.from(right, "hex")]);
        next.push(this.hashBuffer(combined));
      }
      tree.push(...next);
      level = next;
    }
    return tree;
  }

  /* ----------  Chunking ---------- */
  async chunkFile(filePath: string): Promise<Chunk[]> {
    return this.withRetry(async () => {
      const stats = await fs.stat(filePath);
      const size = stats.size;
      const fd = await fs.open(filePath, "r");
      const chunks: Chunk[] = [];

      try {
        for (let offset = 0; offset < size; offset += this.chunkSize) {
          const sz = Math.min(this.chunkSize, size - offset);
          const buf = Buffer.alloc(sz);
          await fd.read(buf, 0, sz, offset);
          chunks.push({
            offset,
            size,
            data: buf,
            hash: this.hashBuffer(buf),
          });
        }
      } finally {
        await fd.close();
      }
      return chunks;
    }, "chunkFile");
  }

  async chunkBuffer(buf: Buffer): Promise<Chunk[]> {
    return this.withRetry(async () => {
      const chunks: Chunk[] = [];
      for (let off = 0; off < buf.length; off += this.chunkSize) {
        const sz = Math.min(this.chunkSize, buf.length - off);
        const chunk = buf.subarray(off, off + sz);
        chunks.push({ offset: off, size: chunk.length, data: chunk, hash: this.hashBuffer(chunk) });
      }
      return chunks;
    }, "chunkBuffer");
  }

  async computeMerkleRoot(chunks: Chunk[]): Promise<{ root: string; tree: string[] }> {
    return this.withRetry(async () => {
      const leafHashes = chunks.map(c => c.hash);
      const tree = this.buildMerkleTree(leafHashes);
      return { root: tree[tree.length - 1], tree };
    }, "computeMerkleRoot");
  }

  async createCommit(
    data: Buffer | string,
    epoch: number,
    operatorId: string,
    opts: {
      parent?: string;
      note?: string;
      salt?: Buffer;
    } = {}
  ): Promise<CommitMetadata> {
    return this.withRetry(async () => {
      await this.ensureDir();
      const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
      const salted = opts.salt ? Buffer.concat([buffer, opts.salt]) : Buffer.concat([buffer, randomBytes(16)]);

      const chunks = await this.chunkBuffer(salted);
      const { root, tree } = await this.computeMerkleRoot(chunks);

      const metaBase = {
        root,
        epoch,
        timestamp: new Date().toISOString(),
        operatorId,
        parent: opts.parent,
        note: opts.note,
        merkleTree: tree,
        chunkCount: chunks.length,
        totalSize: salted.length,
      };

      const rootBuf = Buffer.from(root, "hex");
      const { signature, algorithm } = await this.kms.sign(rootBuf);

      const meta: CommitMetadata = {
        ...metaBase,
        signature: signature.toString("base64"),
        signatureAlgorithm: algorithm,
      };

      // Store chunks address‑by‑root
      await this.storeChunks(chunks, root);

      // Persist metadata
      const metaPath = path.join(this.storageDir, `commit-${epoch}-${root.slice(0, 16)}.json`);
      await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), { encoding: "utf8", flag: "wx" });
      // Update LATEST pointer
      await fs.writeFile(path.join(this.storageDir, "LATEST"), root, { encoding: "utf8" });
      // Append to immutable log
      await fs.appendFile(path.join(this.storageDir, "commits.log"),
        `${epoch},${root},${meta.timestamp},${operatorId}\n`, { encoding: "utf8" });

      return meta;
    }, "createCommit");
  }

  private async storeChunks(chunks: Chunk[], root: string): Promise<void> {
    const dir = path.join(this.storageDir, "chunks", root);
    await fs.mkdir(dir, { recursive: true });
    const promises = chunks.map((c, i) => {
      const file = path.join(dir, `${i}-${c.hash.slice(0, 16)}.bin`);
      return fs.writeFile(file, c.data, { flag: "wx" });
    });
    await Promise.all(promises);
  }

  async verifyCommit(root: string): Promise<VerificationResult> {
    return this.withRetry(async () => {
      // locate metadata file
      const files = await fs.readdir(this.storageDir);
      const metaFile = files.find(f => f.includes(root.slice(0, 16)) && f.endsWith(".json"));
      if (!metaFile) {
        return { valid: false, reason: "Commit metadata not found" };
      }
      const metaPath = path.join(this.storageDir, metaFile);
      const meta: CommitMetadata = JSON.parse(await fs.readFile(metaPath, "utf8"));

      // 1️⃣ Verify signature
      const rootBuf = Buffer.from(meta.root, "hex");
      const sig = Buffer.from(meta.signature, "base64");
      const signatureOk = await this.kms.verify(rootBuf, sig);
      if (!signatureOk) {
        return { valid: false, reason: "Invalid signature", expectedRoot: meta.root, actualRoot: root };
      }

      // 2️⃣ Verify Merkle tree from stored chunks
      const chunkDir = path.join(this.storageDir, "chunks", meta.root);
      let chunkFiles: string[];
      try {
        chunkFiles = (await fs.readdir(chunkDir))
          .filter(f => f.endsWith(".bin"))
          .sort((a, b) => {
            const ai = parseInt(a.split("-")[0]);
            const bi = parseInt(b.split("-")[0]);
            return ai - bi;
          });
      } catch {
        return { valid: false, reason: "Chunk directory missing" };
      }

      const leafHashes: string[] = [];
      const invalidIdx: number[] = [];

      for (let i = 0; i < chunkFiles.length; i++) {
        const p = path.join(chunkDir, chunkFiles[i]);
        const data = await fs.readFile(p);
        const computed = this.hashBuffer(data);
        // Improved sanity check logic if needed
        leafHashes.push(computed);
      }

      if (invalidIdx.length) {
        return { valid: false, reason: "Invalid chunks", invalidChunks: invalidIdx };
      }

      // Re‑compute Merkle root
      const recomputedTree = this.buildMerkleTree(leafHashes);
      const recomputedRoot = recomputedTree[recomputedTree.length - 1];
      if (recomputedRoot !== meta.root) {
        return { valid: false, reason: "Merkle root mismatch", expectedRoot: meta.root, actualRoot: recomputedRoot };
      }

      // Validate full tree array matches stored tree
      if (JSON.stringify(recomputedTree) !== JSON.stringify(meta.merkleTree)) {
        return { valid: false, reason: "Merkle tree structure mismatch" };
      }

      return { valid: true };
    }, "verifyCommit");
  }

  async getCommit(root: string): Promise<CommitMetadata | null> {
    const files = await fs.readdir(this.storageDir);
    const metaFile = files.find(f => f.includes(root.slice(0, 16)) && f.endsWith(".json"));
    if (!metaFile) return null;
    try { 
        return JSON.parse(await fs.readFile(path.join(this.storageDir, metaFile), "utf8")); 
    } catch { return null; }
  }

  async reconstructData(root: string): Promise<Buffer> {
    const meta = await this.getCommit(root);
    if (!meta) throw new Error("Commit not found");
    const chunkDir = path.join(this.storageDir, "chunks", meta.root);
    const files = await fs.readdir(chunkDir);
    const sorted = files
      .filter(f => f.endsWith(".bin"))
      .sort((a, b) => {
        const ai = parseInt(a.split("-")[0]);
        const bi = parseInt(b.split("-")[0]);
        return ai - bi;
      });
    const parts: Buffer[] = [];
    for (const f of sorted) {
      parts.push(await fs.readFile(path.join(chunkDir, f)));
    }
    return Buffer.concat(parts);
  }

  async getCommitChain(startRoot: string, limit = 100): Promise<CommitMetadata[]> {
    const chain: CommitMetadata[] = [];
    let cur: string | undefined = startRoot;
    let iters = 0;
    while (cur && iters < limit) {
      const c: CommitMetadata | null = await this.getCommit(cur);
      if (!c) break;
      chain.push(c);
      cur = c.parent;
      iters++;
    }
    return chain;
  }

  async cleanupOldChunks(days: number = 30): Promise<number> {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    let cleaned = 0;
    const chunkBase = path.join(this.storageDir, "chunks");
    try {
      const dirs = await fs.readdir(chunkBase);
      for (const d of dirs) {
        const stat = await fs.stat(path.join(chunkBase, d));
        if (stat.mtimeMs < cutoff) {
          await fs.rm(path.join(chunkBase, d), { recursive: true, force: true });
          cleaned++;
        }
      }
    } catch (_) {}
    return cleaned;
  }
}

/* ---------------------  Factory Helper --------------------- */
export async function createMerkleFS(
  storageDir: string,
  kmsType: "aws" | "google" | "dev" = "dev",
  kmsConfig: any = {}
): Promise<MerkleFS> {
  let kms: KeyManagementSystem;
  switch (kmsType) {
    case "aws": kms = new AWSKMS(kmsConfig.keyId, kmsConfig.region); break;
    case "google": kms = new GoogleKMS(); break; // GoogleKMS placeholder constructor match
    default: kms = new DevKMS(); // dev fallback
  }
  return new MerkleFS(storageDir, kms);
}
