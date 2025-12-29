const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const ROOT = path.resolve(process.cwd(), 'src');
console.log('ROOT:', ROOT);
const pattern = `${ROOT}/**/*.{ts,tsx,js,jsx}`.replace(/\\/g, '/'); // Glob likes forward slashes
console.log('Pattern:', pattern);

const files = glob.sync(pattern, { nodir: true, ignore: ['**/node_modules/**'] });
console.log('Files found:', files.length);

for (const file of files) {
    let src = fs.readFileSync(file, 'utf8');
    if (!/from\s+['"]react['"]/.test(src)) continue;

    let ast;
    try {
        ast = parser.parse(src, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
    } catch (e) {
        console.error('PARSE_ERROR', file, e.message);
        continue;
    }

    let modified = false;

    traverse(ast, {
        ImportDeclaration(pathNode) {
            const srcVal = pathNode.node.source.value;
            if (srcVal !== 'react') return;

            const specifiers = pathNode.node.specifiers;
            // If already namespace import, skip
            if (specifiers.some(s => s.type === 'ImportNamespaceSpecifier')) return;

            // If default import or default + named, convert:
            // import React, { useState } from 'react'
            // -> import * as React from 'react';
            //    import { useState } from 'react';
            const defaultSpecifier = specifiers.find(s => s.type === 'ImportDefaultSpecifier');
            const namedSpecifiers = specifiers.filter(s => s.type === 'ImportSpecifier');

            if (defaultSpecifier) {
                const newImports = [];

                // namespace import
                newImports.push({
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportNamespaceSpecifier',
                        local: defaultSpecifier.local
                    }],
                    source: pathNode.node.source
                });

                // named import if any
                if (namedSpecifiers.length) {
                    newImports.push({
                        type: 'ImportDeclaration',
                        specifiers: namedSpecifiers,
                        source: pathNode.node.source
                    });
                }

                // replace
                pathNode.replaceWithMultiple(newImports);
                modified = true;
            }
        }
    });

    if (modified) {
        const output = generate(ast, { retainLines: true }).code;
        fs.writeFileSync(file, output, 'utf8');
        console.log('patched', path.relative(process.cwd(), file));
    }
}
