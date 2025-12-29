import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Loader, MessageCircleQuestion, TrendingUp } from 'lucide-react';

import { IdeaEvaluation, MvpStudioPhase } from '../types';

import { GlassCard } from './GlassCard';

interface EvaluationViewProps {
  evaluation: IdeaEvaluation | null;
  phase: MvpStudioPhase;
}

export function EvaluationView({ evaluation, phase }: EvaluationViewProps) {
  if (!evaluation) {
    return (
      <GlassCard className="p-6 flex items-center justify-center min-h-[300px] space-y-4 flex-col">
        <Loader className="animate-spin text-accentBlue" />
        <p className="text-slate-500 dark:text-secondaryText">The Council is analyzing the idea...</p>
      </GlassCard>
    );
  }

  const { verdict, score, summary, pattern_analysis, risk_assessment, eval_notes, think_recommendation, council_votes, simulation_results } = evaluation;

  const getVerdictStyle = () => {
    switch (verdict) {
      case 'PROCEED':
        return { icon: <CheckCircle2 size={24} />, color: 'text-accentGreen', bg: 'bg-green-100 dark:bg-accentGreen/10', border: 'border-green-300 dark:border-accentGreen/50' };
      case 'REJECT':
        return { icon: <XCircle size={24} />, color: 'text-accentRed', bg: 'bg-red-100 dark:bg-accentRed/10', border: 'border-red-300 dark:border-accentRed/50' };
      case 'REVISE':
      default:
        return { icon: <AlertCircle size={24} />, color: 'text-accentYellow', bg: 'bg-yellow-100 dark:bg-accentYellow/10', border: 'border-yellow-300 dark:border-accentYellow/50' };
    }
  };

  const style = getVerdictStyle();

  return (
    <div className="space-y-4">
      <div className={`rounded-xl ${style.bg} border ${style.border} p-6 space-y-3`}>
        <div className="flex items-center gap-3">
          <div className={style.color}>{style.icon}</div>
          <div>
            <div className="text-lg font-semibold text-slate-900 dark:text-primaryText">Verdict: {verdict}</div>
            <div className={`text-sm ${style.color}`}>Score: {score.toFixed(1)} / 10</div>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-secondaryText">{summary}</p>
      </div>

      <GlassCard className="p-6 space-y-4 text-sm">
        <h4 className="font-semibold text-slate-800 dark:text-primaryText">Council Deliberation</h4>
        <div className="space-y-3">
          {Object.entries(council_votes).map(([agent, vote]) => (
            <Vote key={agent} agent={agent.replace('_AGENT', '')} vote={vote} />
          ))}
        </div>
        
        <div className="border-t border-white/30 dark:border-borderColor/50 !mt-6 !mb-4"></div>
        <Section title="Customer Simulation">
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="flex-1 p-3 rounded-lg bg-slate-50 dark:bg-tertiaryBg/50 border border-slate-200/50 dark:border-borderColor/50">
              <div className="flex items-center gap-2 text-slate-600 dark:text-secondaryText">
                <TrendingUp size={14} />
                <span className="font-semibold">Simulated Conversion Rate</span>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-primaryText mt-1">{simulation_results.conversion_rate}%</p>
            </div>
            <div className="flex-1 p-3 rounded-lg bg-slate-50 dark:bg-tertiaryBg/50 border border-slate-200/50 dark:border-borderColor/50">
              <div className="flex items-center gap-2 text-slate-600 dark:text-secondaryText">
                <MessageCircleQuestion size={14} />
                <span className="font-semibold">Top Objections</span>
              </div>
              <ul className="mt-1 space-y-1 text-xs list-disc list-inside">
                {simulation_results.top_objections.map((objection, i) => <li key={i}>{objection}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <LineGraph conversionRate={simulation_results.conversion_rate} />
          </div>
        </Section>
        
        <div className="border-t border-white/30 dark:border-borderColor/50 !mt-6 !mb-4"></div>
        <Section title="Pattern Analysis" content={pattern_analysis} />
        <div className="border-t border-white/30 dark:border-borderColor/50"></div>
        <Section title="Risk Assessment" content={risk_assessment} />
        <div className="border-t border-white/30 dark:border-borderColor/50"></div>
        <Section title="Evaluation Notes" content={eval_notes} />
        <div className="border-t border-white/30 dark:border-borderColor/50"></div>
        <Section title="Council's Recommendation" content={think_recommendation} />
      </GlassCard>
    </div>
  );
}

const LineGraph = ({ conversionRate }: { conversionRate: number }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number } | null>(null);

  // Generate a placeholder dataset that trends towards the final conversion rate
  const data = Array.from({ length: 6 }, (_, i) => {
    const randomFactor = (Math.random() - 0.4) * (conversionRate / 10);
    const baseValue = (conversionRate / 6) * (i + 1);
    const value = Math.max(0.5, baseValue + randomFactor);
    return i === 5 ? conversionRate : value;
  });

  const width = 300;
  const height = 120;
  const padding = 20;
  const maxValue = Math.max(...data, 1);

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - (value / maxValue) * (height - 2 * padding);
    return { x, y, value };
  });

  const path = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="p-3 rounded-lg bg-slate-50 dark:bg-tertiaryBg/50 border border-slate-200/50 dark:border-borderColor/50">
      <h5 className="text-xs font-semibold text-slate-600 dark:text-secondaryText mb-2">Conversion Rate Trend (Simulated 6 Weeks)</h5>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Grid lines */}
        {[...Array(4)].map((_, i) => (
           <line
            key={i}
            x1={padding}
            y1={padding + (i * (height - 2 * padding)) / 3}
            x2={width - padding}
            y2={padding + (i * (height - 2 * padding)) / 3}
            stroke="rgba(100, 116, 139, 0.1)"
            strokeWidth="1"
           />
        ))}
        {/* Gradient for the line */}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          points={path}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="8"
            fill="transparent"
            onMouseEnter={() => setHoveredPoint(point)}
            onMouseLeave={() => setHoveredPoint(null)}
            className="cursor-pointer"
          />
        ))}
         {/* Hovered point highlight */}
        {hoveredPoint && (
           <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
        )}
        {/* Tooltip */}
        {hoveredPoint && (
          <g transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y - 12})`}>
            <rect x="-18" y="-18" width="36" height="16" fill="rgba(10, 15, 26, 0.8)" rx="4" ry="4" />
            <text
              fill="white"
              fontSize="9"
              fontWeight="bold"
              textAnchor="middle"
            >
              {hoveredPoint.value.toFixed(1)}%
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};


const Vote: React.FC<{ agent: string; vote: 'PROCEED' | 'REVISE' | 'REJECT' }> = ({ agent, vote }) => {
  const voteStyles = {
    PROCEED: { icon: CheckCircle2, color: 'text-accentGreen' },
    REVISE: { icon: AlertCircle, color: 'text-accentYellow' },
    REJECT: { icon: XCircle, color: 'text-accentRed' },
  };

  const Icon = voteStyles[vote].icon;
  const color = voteStyles[vote].color;

  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600 dark:text-secondaryText capitalize">{agent}</span>
      <div className={`flex items-center gap-1.5 font-medium ${color}`}>
        <Icon size={14} />
        <span>{vote}</span>
      </div>
    </div>
  );
};

function Section({ title, content, children }: { title: string; content?: string, children?: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-semibold text-slate-800 dark:text-primaryText mb-1">{title}</h4>
      {content && <p className="text-slate-600 dark:text-secondaryText leading-relaxed">{content}</p>}
      {children}
    </div>
  );
}