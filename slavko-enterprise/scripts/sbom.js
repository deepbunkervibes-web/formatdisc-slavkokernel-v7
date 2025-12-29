import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// GENERATE SBOM FROM PACKAGE.JSON
const pkgPath = path.join(ROOT, 'package.json');
let pkg = { name: 'unknown', version: '0.0.0' }; // Default if missing

if (fs.existsSync(pkgPath)) {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}

const sbom = {
    bomFormat: "CycloneDX",
    specVersion: "1.4",
    version: 1,
    metadata: {
        timestamp: new Date().toISOString(),
        tools: [
            { vendor: "slavko-static", name: "sbom-generator", version: "1.0" }
        ],
        component: {
            type: "application",
            name: pkg.name,
            version: pkg.version,
            description: pkg.description || ""
        }
    },
    components: []
};

// ADD DEPENDENCIES
if (pkg.dependencies) {
    Object.entries(pkg.dependencies).forEach(([name, version]) => {
        sbom.components.push({
            type: "library",
            name,
            version: version.replace('^', ''),
            purl: `pkg:npm/${name}@${version}`
        });
    });
}

fs.writeFileSync(path.join(ROOT, 'sbom.json'), JSON.stringify(sbom, null, 2));
console.log('✓ SBOM generated: sbom.json');
