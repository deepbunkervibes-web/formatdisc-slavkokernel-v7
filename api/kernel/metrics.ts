import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { type = 'overview', timeframe = '24h' } = req.query;

    // Mock Data Generators
    const generateChartData = () => {
        const data = [];
        const now = Date.now();
        for (let i = 0; i < 24; i++) {
            data.push({
                timestamp: now - (23 - i) * 3600000,
                requests: Math.floor(Math.random() * 50) + 10,
                avgLatency: Math.floor(Math.random() * 500) + 200,
                errorRate: Math.random() * 0.05
            });
        }
        return data;
    };

    const responseData = {
        success: true,
        data: {}
    };

    if (type === 'overview') {
        responseData.data = {
            system: {
                status: 'healthy',
                uptime: process.uptime(),
                version: 'v12.0.0',
                manifestVersion: 'v1.4.2'
            },
            performance: {
                totalDecisions: 12453,
                averageLatency: 342,
                errorRate: 0.004,
                cacheHitRate: 0.82
            },
            resources: {
                providers: ['openai', 'claude', 'mock'],
                cacheSize: 4096,
                auditEnabled: true
            },
            usage: {
                totalTokens: 4500000,
                modelUsage: {
                    'gpt-4-turbo': 25000,
                    'claude-3-opus': 12000,
                    'mock': 5000
                }
            }
        };
    } else if (type === 'performance') {
        responseData.data = {
            chartData: generateChartData()
        };
    } else if (type === 'usage') {
        responseData.data = {
            routes: {
                'direct': 45,
                'analytics': 30,
                'creative': 15,
                'technical': 10
            },
            personas: {
                'default': 60,
                'expert': 25,
                'creative': 15
            },
            models: {
                'gpt-4': 500,
                'claude-3': 300,
                'mock': 100
            }
        };
    }

    return res.status(200).json(responseData);
}
