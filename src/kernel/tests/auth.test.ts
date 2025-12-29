
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
// Note: We need to import the app from dev-server.ts or create a testable instance.
// Since dev-server.ts starts listening properly, we might need to refactor it to export 'app' 
// or run against the live local server.
// For this test, we will assume the server is running on localhost:3001 if testing E2E style, 
// or strictly unit test if we can import 'app'. 
// Given the structure, running against the local URL is a robust integration test.

const API_URL = 'http://localhost:3001';

describe('Auth API Integration Tests', () => {
    const agent = request.agent(API_URL);
    const email = 'demo@investor.com';

    it('should reject login with non-whitelisted email', async () => {
        const res = await agent
            .post('/api/auth/login')
            .send({ email: 'hacker@nope.com' });

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
    });

    it('should accept login with whitelisted email and set cookie', async () => {
        const res = await agent
            .post('/api/auth/login')
            .send({ email });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toBe(email);
        // Expect set-cookie header
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should retrieve current user via /me using session cookie', async () => {
        // Agent persists cookies automatically
        const res = await agent.get('/api/auth/me');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toBe(email);
    });

    it('should logout successfully', async () => {
        const res = await agent.post('/api/auth/logout');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should return 401 after logout', async () => {
        const res = await agent.get('/api/auth/me');
        expect(res.status).toBe(401);
    });
});
