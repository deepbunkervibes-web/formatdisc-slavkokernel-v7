import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { minify } from 'html-minifier';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const BUILD_DIR = path.join(ROOT, 'build');
const SRC_DIR = path.join(ROOT, 'src');

// 1. ČISTA BUILD DIR
if (fs.existsSync(BUILD_DIR)) fs.rmSync(BUILD_DIR, { recursive: true });
fs.mkdirSync(BUILD_DIR, { recursive: true });
fs.mkdirSync(path.join(BUILD_DIR, 'assets'), { recursive: true });

// 2. UČITAJ KOMPONENTE
const components = {};
const compDir = path.join(SRC_DIR, 'components');
if (fs.existsSync(compDir)) {
    const files = fs.readdirSync(compDir);
    for (const file of files) {
        if (file.endsWith('.html')) {
            const name = path.basename(file, '.html');
            components[name] = fs.readFileSync(path.join(compDir, file), 'utf8');
        }
    }
}

// 3. PROCESIRAJ STRANICE
const pagesDir = path.join(SRC_DIR, 'pages');
if (fs.existsSync(pagesDir)) {
    const pages = fs.readdirSync(pagesDir);

    for (const pageFile of pages) {
        if (!pageFile.endsWith('.html')) continue;

        let html = fs.readFileSync(path.join(pagesDir, pageFile), 'utf8');

        // REPLACE INCLUDE DIRECTIVES
        html = html.replace(/<!-- include components\/([a-zA-Z0-9_-]+)\.html -->/g,
            (match, compName) => components[compName] || `<!-- MISSING: ${compName} -->`);

        try {
            // MINIFY
            const minified = minify(html, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
                sortAttributes: true,
                sortClassName: true
            });

            // HASH
            const hash = crypto.createHash('sha256').update(minified).digest('hex');
            const hashedName = `${path.basename(pageFile, '.html')}-${hash.slice(0, 12)}.html`;

            // WRITE
            fs.writeFileSync(path.join(BUILD_DIR, pageFile), minified);
            fs.writeFileSync(path.join(BUILD_DIR, hashedName), minified);

            // PROVENANCE
            let commitHash = 'unknown';
            try {
                commitHash = execSync('git rev-parse --short HEAD').toString().trim();
            } catch (e) {
                console.log('Warn: Not a git repo, skipping commit hash');
            }

            const prov = {
                build_time: new Date().toISOString(),
                source_commit: commitHash,
                artifact: hashedName,
                sha256: hash,
                page: pageFile,
                files_included: Object.keys(components)
            };

            fs.writeFileSync(
                path.join(BUILD_DIR, `PROVENANCE-${path.basename(pageFile, '.html')}.json`),
                JSON.stringify(prov, null, 2)
            );

            console.log(`✓ Built ${pageFile} → ${hashedName}`);
        } catch (e) {
            console.error(`Error processing ${pageFile}:`, e);
        }
    }
} else {
    console.error(`Pages directory not found: ${pagesDir}`);
}
