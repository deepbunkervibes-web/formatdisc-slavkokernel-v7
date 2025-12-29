import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const brotliCompress = promisify(zlib.brotliCompress);
const gzip = promisify(zlib.gzip);

async function compressBuild() {
    const buildDir = path.join(ROOT, 'build');

    if (!fs.existsSync(buildDir)) {
        console.error('Build directory not found. Run npm run build first.');
        process.exit(1);
    }

    const files = fs.readdirSync(buildDir)
        .filter(f => f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js'))
        .map(f => path.join(buildDir, f));

    console.log(`Found ${files.length} files to optimize...`);

    for (const file of files) {
        const content = fs.readFileSync(file);

        // Brotli (Level 11 = max)
        const br = await brotliCompress(content, {
            params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                [zlib.constants.BROTLI_PARAM_SIZE_HINT]: content.length
            }
        });
        fs.writeFileSync(`${file}.br`, br);

        // Gzip (Level 9 = max)
        const gz = await gzip(content, { level: 9 });
        fs.writeFileSync(`${file}.gz`, gz);

        console.log(`✓ Compressed ${path.basename(file)} (BR: ${br.length}B, GZ: ${gz.length}B)`);
    }

    console.log('\n📦 All artifacts pre-compressed and ready for edge delivery.');
}

compressBuild().catch(console.error);
