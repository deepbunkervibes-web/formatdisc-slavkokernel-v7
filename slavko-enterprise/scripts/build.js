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
            
            // REPLACE SHA256 PLACEHOLDER
            const finalHtml = minified.replace('{{SHA256_FROM_BUILD}}', hash);
            
            const hashedName = `${path.basename(pageFile, '.html')}-${hash.slice(0, 12)}.html`;

            // WRITE
            fs.writeFileSync(path.join(BUILD_DIR, pageFile), finalHtml);
            fs.writeFileSync(path.join(BUILD_DIR, hashedName), finalHtml);

            // COPY STATIC ASSETS & COMPONENTS
            if (!fs.existsSync(path.join(BUILD_DIR, 'components'))) fs.mkdirSync(path.join(BUILD_DIR, 'components'), { recursive: true });
            
            // Copy terminal.js and logs.js so they are available to index.html
            ['terminal.js', 'logs.js'].forEach(file => {
                const srcPath = path.join(SRC_DIR, 'components', file);
                if (fs.existsSync(srcPath)) {
                    fs.copyFileSync(srcPath, path.join(BUILD_DIR, 'components', file));
                }
            });

            // Copy CSS
            const stylesDir = path.join(SRC_DIR, 'styles');
            const assetsDir = path.join(BUILD_DIR, 'assets');
            if (fs.existsSync(stylesDir)) {
                fs.readdirSync(stylesDir).forEach(file => {
                    fs.copyFileSync(path.join(stylesDir, file), path.join(assetsDir, file));
                });
            }

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

    // 4. CLOUDFLARE PAGES CONFIG GENERATION
    console.log('\n--- Generating Cloudflare Config ---');
    
    // _headers - Security first
    const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
  Access-Control-Allow-Origin: *`;
    
    fs.writeFileSync(path.join(BUILD_DIR, '_headers'), headers);
    console.log('✓ Generated _headers');

    // _redirects - Handle subpath routing fallback
    const redirects = `/*    /index.html   200`;
    fs.writeFileSync(path.join(BUILD_DIR, '_redirects'), redirects);
    console.log('✓ Generated _redirects');

} else {
    console.error(`Pages directory not found: ${pagesDir}`);
}

