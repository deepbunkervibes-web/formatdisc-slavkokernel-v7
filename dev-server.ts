import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import executeHandler from './api/kernel/execute';
import metricsHandler from './api/kernel/metrics';
import auditHandler from './api/kernel/audit';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Helper to adapt Express req/res to VercelServerless style
const adapter = (handler: any) => async (req: any, res: any) => {
    try {
        await handler(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Routes
app.all('/api/kernel/execute', adapter(executeHandler));
app.all('/api/kernel/metrics', adapter(metricsHandler));
app.all('/api/kernel/audit', adapter(auditHandler));

app.listen(PORT, () => {
    console.log(`> Local API Server running at http://localhost:${PORT}`);
    console.log(`> Proxied by Vite on port 3000`);
});
