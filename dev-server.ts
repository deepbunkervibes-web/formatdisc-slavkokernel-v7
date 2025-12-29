import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import executeHandler from './api/kernel/execute';
import metricsHandler from './api/kernel/metrics';
import auditHandler from './api/kernel/audit';
import ingestHandler from './api/observability/ingest';
import streamHandler from './api/observability/stream';
import summaryHandler from './api/observability/summary';
import profilesHandler from './api/outbound/profiles';
import artifactsHandler from './api/outbound/artifacts';
import investorsHandler from './api/outbound/investors';
import sendHandler from './api/outbound/send';
import githubIntegrationHandler from './api/outbound/integrations/github';
import logsHandler from './api/outbound/logs';


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

// Observability Routes
app.all('/api/observability/ingest', adapter(ingestHandler));
app.all('/api/observability/summary', adapter(summaryHandler));
app.get('/api/observability/stream', streamHandler);

// Outbound Engine Routes
app.all('/api/outbound/profiles', adapter(profilesHandler));
app.all('/api/outbound/artifacts', adapter(artifactsHandler));
app.all('/api/outbound/investors', adapter(investorsHandler));
app.all('/api/outbound/send', adapter(sendHandler));
app.all('/api/outbound/integrations/github', adapter(githubIntegrationHandler));
app.all('/api/outbound/logs', adapter(logsHandler));

app.listen(PORT, () => {
    console.log(`> Local API Server running at http://localhost:${PORT}`);
    console.log(`> Proxied by Vite on port 3000`);
});
