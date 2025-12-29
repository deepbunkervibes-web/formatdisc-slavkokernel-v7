import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import executeHandler from './api/kernel/execute';
import metricsHandler from './api/kernel/metrics';
import auditHandler from './api/kernel/audit';
import ingestHandler from './api/observability/ingest';
import { dirname } from 'path';

// --- Configuration ---
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-do-not-use-in-prod';
const IS_PROD = process.env.NODE_ENV === 'production';
const WHITELISTED_EMAILS = [
    'jc@filrougecapital.com',
    'mladen@formatdisc.hr',
    'demo@investor.com'
];

const app = express();

// --- Middleware ---
app.use(cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// --- Authentication Endpoints ---

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (WHITELISTED_EMAILS.includes(normalizedEmail)) {
        // Generate JWT
        const token = jwt.sign({ email: normalizedEmail, role: 'investor' }, JWT_SECRET, {
            expiresIn: '24h'
        });

        // Set HTTP-only cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: IS_PROD,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        console.log(`[AUTH] Successful login for: ${normalizedEmail}`);
        return res.json({ success: true, user: { email: normalizedEmail } });
    } else {
        console.warn(`[AUTH] Failed login attempt for: ${normalizedEmail}`);
        return res.status(401).json({ success: false, error: 'Unauthorized email' });
    }
});

// GET /api/auth/me
app.get('/api/auth/me', (req, res) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ success: false, error: 'No session' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string, role: string };
        return res.json({ success: true, user: { email: decoded.email } });
    } catch (err) {
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
