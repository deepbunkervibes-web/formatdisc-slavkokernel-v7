import { useEffect, useRef, useMemo } from 'react';
import { useObsStore } from '../../stores/observabilityStore';

/**
 * A "fake" force-directed graph visualized on canvas for performance/simplicity.
 * Real implementation would use d3.js or react-force-graph.
 */
export function CorrelationGraph() {
    const findings = useObsStore((s) => s.findings);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Create nodes from unique services
    const nodes = useMemo(() => {
        const services = Array.from(new Set(findings.map(f => f.service)));
        // Position them in a circle
        const count = services.length;
        const radius = 80;
        const centerX = 150;
        const centerY = 150;

        return services.map((svc, i) => {
            const angle = (i / count) * 2 * Math.PI;
            return {
                id: svc,
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
                alerts: findings.filter(f => f.service === svc).length
            };
        });
    }, [findings]);

    // Create links if services appear close in time (mock correlation)
    // For visual effect, we just link everyone to a central "Kernel" node or each other
    const links = useMemo(() => {
        // Connect services that have high severity events to others approx
        const activeNodes = nodes.filter(n => n.alerts > 0);
        const edges: { source: typeof nodes[0], target: typeof nodes[0] }[] = [];

        for (let i = 0; i < activeNodes.length; i++) {
            for (let j = i + 1; j < activeNodes.length; j++) {
                edges.push({ source: activeNodes[i], target: activeNodes[j] });
            }
        }
        return edges;
    }, [nodes]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, 300, 300);

        // Draw links
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)';
        ctx.lineWidth = 1;

        links.forEach(link => {
            ctx.beginPath();
            ctx.moveTo(link.source.x, link.source.y);
            ctx.lineTo(link.target.x, link.target.y);
            ctx.stroke();
        });

        // Draw nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 4 + Math.min(node.alerts, 10), 0, 2 * Math.PI);

            ctx.fillStyle = node.alerts > 0
                ? (node.alerts > 5 ? '#ef4444' : '#f59e0b')
                : '#10b981';

            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.stroke();

            // Label
            ctx.fillStyle = '#9ca3af';
            ctx.font = '10px monospace';
            ctx.fillText(node.id, node.x - 10, node.y - 12);
        });

        // Central Kernel Node
        ctx.beginPath();
        ctx.arc(150, 150, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();

    }, [nodes, links]);

    return (
        <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-6 border border-gray-800 flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-2 self-start">CORRELATION GRAPH</h3>
            <div className="relative w-[300px] h-[300px]">
                <canvas ref={canvasRef} width={300} height={300} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
}
