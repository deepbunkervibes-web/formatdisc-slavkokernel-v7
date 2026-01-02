const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Starting SlavkoShell OS Unified Build...');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SIMULATOR_SRC_DIR = path.join(ROOT_DIR, 'slavko-enterprise');
const SIMULATOR_BUILD_DIR = path.join(SIMULATOR_SRC_DIR, 'build');
const SIMULATOR_DEST_DIR = path.join(DIST_DIR, 'simulator');

try {
    // 1. Build Root App
    console.log('\n[1/3] Building Root Cockpit (React/Vite)...');
    execSync('npm run build', { stdio: 'inherit', cwd: ROOT_DIR });

    // 2. Build Enterprise Simulator
    console.log('\n[2/3] Building Enterprise Simulator (Static)...');
    // Ensure dependencies are installed in submodule if needed, or rely on root.
    // Assuming slavko-enterprise script runs with node
    execSync('npm run build', { stdio: 'inherit', cwd: SIMULATOR_SRC_DIR });

    // 3. Merge Artifacts
    console.log('\n[3/3] Merging Simulator into /simulator path...');
    if (!fs.existsSync(SIMULATOR_DEST_DIR)) {
        fs.mkdirSync(SIMULATOR_DEST_DIR, { recursive: true });
    }

    // Recursive copy function
    function copyDir(src, dest) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        const entries = fs.readdirSync(src, { withFileTypes: true });

        for (let entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    copyDir(SIMULATOR_BUILD_DIR, SIMULATOR_DEST_DIR);
    console.log(`✅ Simulator injected into ${SIMULATOR_DEST_DIR}`);

    console.log('\n🦅 SlavkoShell OS Unified Build Complete.');
    console.log('👉 Deploy "dist/" folder to Vercel/Netlify/Cloudflare.');

} catch (error) {
    console.error('\n❌ Build Failed:', error.message);
    process.exit(1);
}
