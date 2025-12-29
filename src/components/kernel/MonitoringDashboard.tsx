import React, { useState, useEffect, useCallback } from 'react';
import {
    Activity,
    Cpu,
    ShieldAlert,
    Clock,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    XCircle,
    RefreshCw
} from 'lucide-react';

import type { MonitoringData } from '../../types/monitoring';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const MonitoringDashboard: React.FC = () => {
    const [data, setData] = useState<MonitoringData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    const fetchHealthData = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/monitoring/health`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('slavko_token') || 'demo'}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const healthData = await response.json();
            setData(healthData);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch health data');
            console.error('Failed to fetch health data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHealthData();

        let interval: ReturnType<typeof setInterval>;
        if (autoRefresh) {
            interval = setInterval(fetchHealthData, 5000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [autoRefresh, fetchHealthData]);

    const formatUptime = (milliseconds: number) => {
        const seconds = Math.floor(milliseconds / 1000);
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${secs}s`;
        return `${secs}s`;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy':
                return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'degraded':
                return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case 'unhealthy':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Activity className="w-4 h-4 text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <div className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                    <div className="h-8 w-32 bg-muted animate-pulse rounded" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="glass p-6 rounded-xl">
                            <div className="h-4 w-24 bg-muted animate-pulse rounded mb-4" />
                            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="border border-red-500/30 bg-red-500/10 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4 text-red-500" />
                        <h3 className="font-medium text-red-500">Monitoring Error</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Failed to load monitoring data: {error}
                        <button
                            onClick={() => fetchHealthData()}
                            className="ml-2 text-sm underline text-[#00ff9d]"
                        >
                            Retry
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="p-6">
                <div className="border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <h3 className="font-medium">No Data Available</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Monitoring data is not available. Make sure the API server is running.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Activity className="w-8 h-8 text-[#00ff9d]" />
                    <div>
                        <h2 className="text-2xl font-bold">Kernel Monitoring</h2>
                        <p className="text-sm text-muted-foreground">
                            Real-time system health and performance metrics
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        {getStatusIcon(data.status)}
                        <span className="text-sm font-medium capitalize">{data.status}</span>
                    </div>

                    <button
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        className={`flex items-center space-x-2 px-3 py-1 text-sm rounded-md border ${autoRefresh ? 'border-[#00ff9d]/30 bg-[#00ff9d]/10 text-[#00ff9d]' : 'border-border bg-muted'
                            }`}
                    >
                        <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                        <span>Auto-refresh</span>
                    </button>

                    <button
                        onClick={fetchHealthData}
                        className="px-3 py-1 text-sm bg-[#00ff9d] text-black font-medium rounded-md"
                    >
                        Refresh Now
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Cpu className="w-4 h-4 text-[#00ff9d]" />
                        <span className="text-sm font-medium">System Health</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">
                                {data.kernel.analysis_count}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${data.kernel.circuit_breaker_open
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-[#00ff9d]/20 text-[#00ff9d]'
                                }`}>
                                {data.kernel.circuit_breaker_open ? 'Circuit Open' : 'Circuit Closed'}
                            </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {data.kernel.successful_analyses} successful, {data.kernel.failed_analyses} failed
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#00ff9d]"
                                style={{ width: `${data.kernel.success_rate}%` }}
                            />
                        </div>
                        <div className="text-xs text-muted-foreground flex justify-between">
                            <span>Success Rate</span>
                            <span>{data.kernel.success_rate.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-[#00ff9d]" />
                        <span className="text-sm font-medium">Performance</span>
                    </div>
                    <div className="space-y-2">
                        <div className="text-2xl font-bold">
                            {data.kernel.average_analysis_time_ms.toFixed(0)}ms
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Average analysis time
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Uptime</span>
                                <span>{formatUptime(data.kernel.uptime)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>CPU</span>
                                <span>{data.kernel.cpu_percent.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Memory</span>
                                <span>{data.kernel.memory_usage_mb.toFixed(1)} MB</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-[#00ff9d]" />
                        <span className="text-sm font-medium">Providers</span>
                    </div>
                    <div className="space-y-3">
                        <div className="text-2xl font-bold">
                            {Object.keys(data.providers).length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Active AI providers
                        </div>
                        <div className="space-y-2">
                            {Object.entries(data.providers).slice(0, 3).map(([name, stats]) => (
                                <div key={name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${stats.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                                            }`} />
                                        <span className="capitalize">{name}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {stats.success_rate.toFixed(1)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldAlert className="w-4 h-4 text-[#00ff9d]" />
                        <span className="text-sm font-medium">Security & Audit</span>
                    </div>
                    <div className="space-y-2">
                        <div className="text-2xl font-bold">
                            {data.kernel.audit_events}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Audit events recorded
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Errors</span>
                                <span className="px-2 py-0.5 rounded border border-border">
                                    {data.alerts.total} total
                                </span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Critical</span>
                                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-500">
                                    {data.alerts.critical}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Last Audit</span>
                                <span>
                                    {data.kernel.last_audit_event
                                        ? new Date(data.kernel.last_audit_event).toLocaleTimeString()
                                        : 'Never'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts Section */}
            <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00ff9d] mb-4">
                    Recent Alerts
                </h3>
                {data.alerts.recent.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No alerts in the last 24 hours
                    </div>
                ) : (
                    <div className="space-y-3">
                        {data.alerts.recent.map((alert, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg border ${alert.severity === 'critical' ? 'border-red-500/30 bg-red-500/10' :
                                        alert.severity === 'high' ? 'border-orange-500/30 bg-orange-500/10' :
                                            alert.severity === 'medium' ? 'border-yellow-500/30 bg-yellow-500/10' :
                                                'border-blue-500/30 bg-blue-500/10'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(alert.severity)}
                                            <span className="capitalize font-medium">{alert.severity} Alert</span>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {alert.message}
                                        </p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {new Date(alert.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* System Recommendations */}
            {data.system.recommendations.length > 0 && (
                <div className="glass rounded-xl p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#00ff9d] mb-4">
                        System Recommendations
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {data.system.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Footer */}
            <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                Last updated: {new Date(data.timestamp).toLocaleString()}
            </div>
        </div>
    );
};
