import { VercelRequest, VercelResponse } from '@vercel/node';
import AdmZip from 'adm-zip';
import crypto from 'crypto';
import multer from 'multer';

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    // Use multer middleware (simplified for Vercel/Express hybrid)
    upload.single('file')(req, res, async (err: any) => {
        if (err) return res.status(500).json({ error: err.message });

        const { ideaId, type } = req.body;
        const file = req.file;

        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        let signals: any = {};
        let fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');

        if (type === 'zip') {
            try {
                const zip = new AdmZip(file.buffer);
                const entries = zip.getEntries();
                signals = {
                    fileCount: entries.length,
                    hasPackageJson: entries.some(e => e.entryName === 'package.json'),
                    hasPrisma: entries.some(e => e.entryName.includes('schema.prisma')),
                    hasReadme: entries.some(e => e.entryName.toLowerCase() === 'readme.md'),
                    structure: entries.map(e => e.entryName).slice(0, 10) // Small sample
                };
            } catch (err) {
                console.error('Zip parse error:', err);
            }
        }

        const artifact = {
            id: `art_${Math.random().toString(36).substr(2, 9)}`,
            ideaProfileId: ideaId,
            type,
            filePath: `storage/${type}/${ideaId}_${file.originalname}`,
            hash: fileHash,
            metadata: signals,
            createdAt: new Date().toISOString()
        };

        // In a real app, we'd update the idea_profile in DB
        // Here we just return the "new" state
        res.json({
            artifact,
            profile: {
                id: ideaId,
                ideaScore: type === 'zip' && signals.hasPackageJson ? 8.5 : 5.0,
                readinessFlag: true
            }
        });
    });
}
