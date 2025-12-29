import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
    Activity, Users, Clock, AlertTriangle, CheckCircle, TrendingUp,
    RefreshCw, Loader2, Zap, Server
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';

// Types
interface MetricsData {
    system: {
        status: string;
        uptime: number;
        version: string;
        manifestVersion: string;
    };
    performance: {
        totalDecisions: number;
        averageLatency: number;
        errorRate: number;
        cacheHitRate: number;
    };
    resources: {
        providers: string[];
        cacheSize: number;
        auditEnabled: boolean;
    };
    usage: {
        modelUsage: Record<string, number>;
        totalTokens: number;
    };
}

interface ChartData {
    timestamp: number;
    requests: number;
    avgLatency: number;
    errorRate: number;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export function MetricsRoute() {
    const [metrics, setMetrics] = useState<MetricsData | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('24h');

    useEffect(() => {
        loadMetrics();
    }, [timeframe]);

    const loadMetrics = async () => {
        setLoading(true);
        try {
            const overviewRes = await fetch('/api/kernel/metrics?type=overview');
            const overviewData = await overviewRes.json();
            if (overviewData.success) setMetrics(overviewData.data);

            const perfRes = await fetch(`/api/kernel/metrics?type=performance&timeframe=${timeframe}`);
            const perfData = await perfRes.json();
            if (perfData.success) setChartData(perfData.data.chartData || []);
        } catch (err) {
            console.error('Failed to load metrics', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-accentPrimary/30">
            <Navigation />

            <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <Activity className="w-5 h-5 text-green-400" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">System Metrics</h1>
                        </div>
                        <p className="text-muted-foreground max-w-2xl">
                            Real-time telemetry and performance analytics for the SlavkoKernel engine.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-sm text-neutral-300 focus:outline-none focus:border-blue-500"
                        >
                            <option value="1h">Last Hour</option>
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                        </select>
                        <button
                            onClick={loadMetrics}
                            disabled={loading}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {metrics ? (
                    <div className="space-y-8">
                        {/* KPI Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <MetricCard
                                label="Total Decisions"
                                value={metrics.performance.totalDecisions.toLocaleString()}
                                sub="All time requests"
                                icon={<Zap className="w-4 h-4 text-yellow-400" />}
                            />
                            <MetricCard
                                label="Avg Latency"
                                value={`${metrics.performance.averageLatency}ms`}
                                sub="Response time"
                                icon={<Clock className="w-4 h-4 text-blue-400" />}
                            />
                            <MetricCard
                                label="Error Rate"
                                value={`${(metrics.performance.errorRate * 100).toFixed(2)}%`}
                                sub="Failed requests"
                                icon={<AlertTriangle className="w-4 h-4 text-red-400" />}
                            />
                            <MetricCard
                                label="Tokens Processed"
                                value={(metrics.usage.totalTokens / 1000000).toFixed(1) + 'M'}
                                sub="Total volume"
                                icon={<Server className="w-4 h-4 text-purple-400" />}
                            />
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5">
                                <h3 className="text-sm font-medium mb-6 text-neutral-300">Request Volume</h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                            <XAxis
                                                dataKey="timestamp"
                                                tickFormatter={(t) => new Date(t).getHours() + 'h'}
                                                stroke="#525252"
                                                tick={{ fontSize: 12 }}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#525252"
                                                tick={{ fontSize: 12 }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                                                itemStyle={{ color: '#e5e5e5' }}
                                                labelStyle={{ color: '#a3a3a3' }}
                                                labelFormatter={(t) => new Date(t).toLocaleString()}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="requests"
                                                stroke="#3b82f6"
                                                strokeWidth={2}
                                                dot={false}
                                                activeDot={{ r: 4, fill: '#3b82f6' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5">
                                <h3 className="text-sm font-medium mb-6 text-neutral-300">Latency Trend</h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                            <XAxis
                                                dataKey="timestamp"
                                                tickFormatter={(t) => new Date(t).getHours() + 'h'}
                                                stroke="#525252"
                                                tick={{ fontSize: 12 }}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#525252"
                                                tick={{ fontSize: 12 }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                                                itemStyle={{ color: '#e5e5e5' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="avgLatency"
                                                stroke="#10b981"
                                                strokeWidth={2}
                                                dot={false}
                                                activeDot={{ r: 4, fill: '#10b981' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Model Distribution */}
                        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5">
                            <h3 className="text-sm font-medium mb-6 text-neutral-300">Model Usage Distribution</h3>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="h-[250px] w-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={Object.entries(metrics.usage.modelUsage).map(([name, value]) => ({ name, value }))}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {Object.entries(metrics.usage.modelUsage).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 w-full space-y-4">
                                    {Object.entries(metrics.usage.modelUsage).map(([model, count], index) => (
                                        <div key={model} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                                <span className="text-sm font-medium">{model}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">{count.toLocaleString()} reqs</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

function MetricCard({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
    return (
        <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{label}</span>
                {icon}
            </div>
            <div className="text-2xl font-bold mb-1">{value}</div>
            <div className="text-xs text-neutral-500">{sub}</div>
        </div>
    );
}
