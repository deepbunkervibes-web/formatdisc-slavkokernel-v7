
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Slide, TeamMember, ArchitecturePoint, SummaryPoint, ComparisonPoint } from '../types';
import { ShieldCheck, Cpu, HardDrive, Activity, Zap, AlertCircle, Search, RefreshCw, FileText, ExternalLink, ArrowRight, X, Rocket } from 'lucide-react'; 
import { MarketChart } from './Charts';
import { Favicon } from './Favicon'; 
import { api, NewsItem } from '../api'; 
import { CTA_LOCK_MS, STATE_CHECKSUM } from '../constants';
import { useProjectPoints } from '../hooks';

interface SlideRendererProps {
  slide: Slide;
  onFetchNews: (query: string) => void;
  newsItems: NewsItem[];             
  isFetchingNews: boolean;
  newsError: string | null;           
}

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ArchCard: React.FC<{ point: ArchitecturePoint }> = ({ point }) => {
  const Icon = point.title.includes('Kernel') ? HardDrive :
               point.title.includes('Protocol') ? Zap :
               point.title.includes('Fusion') ? Activity : ShieldCheck;

  return (
    <div className="premium-card p-6 rounded-xl border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
        <Icon size={60} />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="text-terminal-green bg-terminal-green/10 p-2.5 rounded-lg border border-terminal-green/20 group-hover:bg-terminal-green group-hover:text-black transition-colors">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="font-extrabold text-white text-xs lg:text-sm tracking-tight silver-edge uppercase">{point.title}</h4>
          <div className="mt-1">
            <span className="text-[8px] text-zinc-600 font-black tracking-widest bg-white/5 px-1.5 py-0.5 rounded uppercase">
              {point.subtitle}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        <p className="text-[11px] text-zinc-400 mb-6 leading-relaxed font-medium">
          {point.description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5">
        <p className="text-[9px] text-terminal-green font-black uppercase tracking-widest flex items-center gap-2">
          <span className="opacity-30">[ENFORCED_STATE]:</span> 
          <span className="silver-edge">{point.impact}</span>
        </p>
      </div>
    </div>
  );
};
const MemoizedArchCard = React.memo(ArchCard);

const CompetitiveGrid: React.FC<{ points: ComparisonPoint[] }> = ({ points }) => (
  <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 premium-card shadow-2xl">
    <table className="w-full text-left border-collapse" aria-label="Competitive Comparison">
      <thead>
        <tr className="border-b border-white/10 bg-white/5">
          <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Feature Segment</th>
          <th className="p-4 text-[10px] font-black uppercase tracking-widest text-terminal-green">SlavkoKernel V7</th>
          <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Legacy Cloud AI</th>
          <th className="p-4 text-[10px] font-black uppercase tracking-widest text-terminal-amber">Business Impact</th>
        </tr>
      </thead>
      <tbody>
        {points.map((p, i) => (
          <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <td className="p-4 text-xs font-bold text-white uppercase tracking-tight silver-edge">{p.feature}</td>
            <td className="p-4 text-xs font-black text-terminal-green italic flex items-center gap-2">
              <ShieldCheck size={12} /> {p.advantage}
            </td>
            <td className="p-4 text-xs font-medium text-zinc-600 line-through decoration-terminal-red/40">{p.competitorWeakness}</td>
            <td className="p-4 text-[10px] font-black text-terminal-amber uppercase tracking-wider">
              <span className="bg-terminal-amber/5 px-2 py-1 rounded border border-terminal-amber/20">{p.quantifiedImpact}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const MemoizedCompetitiveGrid = React.memo(CompetitiveGrid);

interface NewsCardProps {
  item: NewsItem;
  refinedSummary: string | null;
  isRefining: boolean;
  onRefine: (item: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, refinedSummary, isRefining, onRefine }) => {
  const handleRefine = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRefine(item);
  };

  const hostname = new URL(item.uri).hostname;

  return (
    <div className="p-6 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-all group relative overflow-hidden flex flex-col gap-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-3">
          <div className="mt-0.5 shrink-0 bg-white/10 p-1.5 rounded-md border border-white/10 group-hover:border-terminal-green/30 transition-colors shadow-lg">
            <Favicon url={item.uri} alt={item.title} className="w-6 h-6 object-contain" />
          </div>
          <div className="space-y-1">
            <a 
              href={item.uri} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white text-sm font-extrabold group-hover:text-terminal-green transition-colors leading-tight tracking-tight silver-edge uppercase flex items-center gap-2"
            >
              {item.title}
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="flex items-center gap-2">
              <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">
                {hostname.toUpperCase()}
              </span>
              {refinedSummary && (
                <span className="text-[7px] font-black text-terminal-green uppercase tracking-widest px-1.5 py-0.5 bg-terminal-green/10 rounded-sm border border-terminal-green/20">
                  AI_REFINED
                </span>
              )}
            </div>
          </div>
        </div>
        <button 
          onClick={handleRefine}
          disabled={isRefining || !!refinedSummary}
          title="Generate AI Executive Summary"
          aria-label="Generate AI executive summary for this news item"
          className="shrink-0 p-2 text-zinc-600 hover:text-terminal-green hover:bg-terminal-green/5 rounded-md transition-all disabled:opacity-20"
        >
          <FileText size={16} className={isRefining ? "animate-pulse" : ""} />
        </button>
      </div>
      
      <div className="relative">
        <p className="text-[11px] text-zinc-400 font-medium leading-relaxed italic border-l-2 border-terminal-green/20 pl-4 py-1">
          {refinedSummary || item.summary}
        </p>
      </div>
    </div>
  );
};
const MemoizedNewsCard = React.memo(NewsCard);

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="premium-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group h-full">
    <div className="flex items-center gap-4 mb-5">
      <div className="w-14 h-14 bg-zinc-900 flex items-center justify-center rounded-2xl border border-white/10 group-hover:scale-110 transition-transform shadow-xl">
        {member.type === 'executive' ? <ShieldCheck size={28} className="text-terminal-green" /> : <Cpu size={28} className="text-zinc-400" />}
      </div>
      <div>
        <h4 className="font-extrabold text-white text-lg tracking-tight silver-edge">{member.name}</h4>
        <p className="text-[11px] text-terminal-green font-black uppercase tracking-[0.1em]">{member.role}</p>
      </div>
    </div>
    <div className="space-y-3">
      {member.achievement.split('\n').map((point, idx) => (
        <div key={idx} className="flex gap-3 items-start">
          <span className="text-terminal-green font-bold shrink-0 mt-0.5">•</span>
          <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
            {point.replace(/^•\s*/, '')}
          </p>
        </div>
      ))}
    </div>
  </div>
);
const MemoizedTeamCard = React.memo(TeamCard);

const SummaryCard: React.FC<{ point: SummaryPoint; index: number }> = ({ point, index }) => {
  const icons = [AlertCircle, ShieldCheck, Activity, Zap];
  const Icon = icons[index % icons.length];

  return (
    <div className="p-7 rounded-2xl premium-card border border-white/5 relative group hover:scale-[1.02] transition-all h-full">
      <div className="flex items-center gap-5 mb-4">
        <div className="p-3 bg-white/5 text-white rounded-xl border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
          <Icon size={22} />
        </div>
        <h3 className="text-white font-extrabold tracking-tight silver-edge text-sm lg:text-base">{point.label}</h3>
      </div>
      <p className="text-[12px] text-zinc-400 leading-relaxed font-medium italic">
        {point.value}
      </p>
      <div className="absolute top-4 right-6 opacity-[0.05] pointer-events-none">
        <span className="text-5xl font-black">0{index + 1}</span>
      </div>
    </div>
  );
}
const MemoizedSummaryCard = React.memo(SummaryCard);

// Fix: Explicitly typed the component as React.FC<SlideRendererProps> to ensure React's intrinsic props, like `key`, are correctly handled by TypeScript.
const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, onFetchNews, newsItems, isFetchingNews, newsError }) => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [hasBooted, setHasBooted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [refinedSummaries, setRefinedSummaries] = useState<Record<string, { summary: string | null, isRefining: boolean }>>({});

  const architecturePoints = useProjectPoints(slide, 'architecturePoints');
  const summaryPoints = useProjectPoints(slide, 'summaryPoints');
  const marketData = useProjectPoints(slide, 'marketData');
  const comparisonPoints = useProjectPoints(slide, 'comparisonPoints');
  const team = useProjectPoints(slide, 'team');
  const content = useProjectPoints(slide, 'content');

  const handleRefineSummary = useCallback(async (item: NewsItem) => {
    setRefinedSummaries(prev => ({ ...prev, [item.uri]: { summary: null, isRefining: true } }));
    const summary = await api.generateRefinedSummary(item.uri, item.title);
    setRefinedSummaries(prev => ({ ...prev, [item.uri]: { summary, isRefining: false } }));
  }, []);

  useEffect(() => {
    // Authority Hardening: Scroll-lock and Phase Transitions
    if (slide.type === 'cta') {
      setIsLocked(true);
      setHasBooted(false);
      
      const bootTimer = setTimeout(() => {
        setIsLocked(false);
        setHasBooted(true);
      }, CTA_LOCK_MS);

      return () => {
        clearTimeout(bootTimer);
      };
    } else {
      setHasBooted(false);
      setIsLocked(false);
    }
  }, [slide.id, slide.type]);

  // Cleanup on unmount for hot reloads
  useEffect(() => {
    return () => {
      setIsLocked(false);
      setHasBooted(false);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`h-full w-full flex flex-col p-8 md:p-16 max-w-7xl mx-auto relative transition-all duration-300 animate-page-turn ${isLocked ? 'overflow-hidden' : 'overflow-y-auto'}`}
      style={{ transformOrigin: 'top center' }}
    >
      {showLightbox && (
        <div className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center animate-fade-in" onClick={() => setShowLightbox(false)}>
            <div className="w-[90%] h-[85%] bg-zinc-950 border-2 border-terminal-green/20 relative shadow-2xl shadow-terminal-green/10" onClick={(e) => e.stopPropagation()}>
                <div className="absolute -top-12 right-0 flex items-center gap-4">
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Live Demo: formatdisc.hr</span>
                  <button onClick={() => setShowLightbox(false)} aria-label="Close live demo" className="p-2 text-zinc-600 bg-zinc-900 border border-white/5 rounded-full hover:text-white hover:bg-terminal-red transition-all">
                    <X size={16} />
                  </button>
                </div>
                <iframe src="https://formatdisc.hr" className="w-full h-full" title="Live Demo - formatdisc.hr" />
            </div>
        </div>
      )}

      {slide.type !== 'cta' && (
        <ScrollReveal>
          <div className="mb-12 relative z-10">
            <div className="flex items-center gap-4 text-[10px] text-zinc-600 mb-3 font-black uppercase tracking-[0.4em]">
              <span>PROJ: APEX 1.0</span>
              <span className="opacity-20">/</span>
              <span className="text-terminal-green">SIGNAL 0x0{slide.id}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter silver-edge leading-tight mb-6" style={{fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-[10px] lg:text-xs text-terminal-green tracking-tight border-l-4 border-terminal-green/50 pl-6 font-bold uppercase">
                {slide.subtitle}
              </p>
            )}
          </div>
        </ScrollReveal>
      )}

      <div className="flex-1 relative z-10 h-full">
        {slide.type === 'title' && (
          <div className="h-full flex flex-col justify-center border-t border-white/5 pt-16">
            <div className="text-[10rem] lg:text-[15rem] font-black text-white/5 absolute -z-10 select-none -top-20 -left-10 tracking-tighter" style={{fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
              APEX
            </div>
            <div className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-extrabold text-white/5 absolute -z-10 select-none -bottom-20 right-10 tracking-tighter">
              SLAVKOKERNEL APEX 1.0
            </div>
            <ScrollReveal delay={200}>
              <p className="text-white text-xl md:text-3xl max-w-3xl leading-tight font-extrabold silver-edge italic border-l-8 border-terminal-green pl-10 py-4 shadow-2xl uppercase" style={{fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
                "Building the deterministic backbone for the decentralized AI age. | Izgradnja determinističke jezgre za doba decentralizirane inteligencije."
              </p>
            </ScrollReveal>
          </div>
        )}

        {slide.type === 'summary' && summaryPoints && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {summaryPoints.map((point, i) => (
              <ScrollReveal key={i} delay={i * 100} className="h-full">
                <MemoizedSummaryCard point={point} index={i} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {slide.type === 'market' && marketData && (
          <div className="mt-4 p-8 premium-card rounded-3xl">
             <ScrollReveal>
               <MarketChart data={marketData} />
             </ScrollReveal>
             <ScrollReveal delay={200}>
               <div className="mt-8 border-t border-white/5 pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <h4 className="text-white font-black text-xs tracking-widest uppercase silver-edge">Intelligence Terminal</h4>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Real-time market signal acquisition</p>
                    </div>
                    <button
                        onClick={() => onFetchNews("latest AI infrastructure market news")}
                        disabled={isFetchingNews}
                        aria-label="Scan for latest market news"
                        className="flex items-center gap-2 px-4 py-2 bg-terminal-green text-black text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-terminal-green/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,255,65,0.2)]"
                    >
                        {isFetchingNews ? (
                            <>
                                <Activity size={12} className="animate-spin" /> FETCHING_SIGNAL...
                            </>
                        ) : (
                            <>
                                <Zap size={12} /> SCAN_MARKET_NEWS
                            </>
                        )}
                    </button>
                  </div>
                  
                  {isFetchingNews && (
                      <div className="mt-12 mb-12 flex flex-col items-center justify-center gap-4 text-terminal-green">
                          <Activity size={48} className="animate-spin opacity-50" />
                          <span className="text-[10px] font-black tracking-[0.5em] animate-pulse">ACQUIRING_GROUNDED_DATA_PACKETS...</span>
                      </div>
                  )}

                  {newsError && (
                      <div className="mt-6 flex items-center gap-3 text-terminal-red text-sm leading-relaxed font-bold bg-terminal-red/5 p-4 rounded-xl border border-terminal-red/10">
                          <AlertCircle size={16} />
                          <span className="flex-1">{newsError}</span>
                          <button
                              onClick={() => onFetchNews("latest AI infrastructure market news")}
                              disabled={isFetchingNews}
                              aria-label="Retry fetching news"
                              className="flex items-center gap-1 px-3 py-1 bg-terminal-red/20 text-terminal-red text-[9px] font-bold uppercase tracking-widest rounded-md hover:bg-terminal-red/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                              <RefreshCw size={10} /> RETRY
                          </button>
                      </div>
                  )}

                  {newsItems.length > 0 && !isFetchingNews && (
                      <div className="mt-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {newsItems.map((item, i) => (
                                  <ScrollReveal key={i} delay={i * 100}>
                                    <MemoizedNewsCard 
                                      item={item}
                                      refinedSummary={refinedSummaries[item.uri]?.summary ?? null}
                                      isRefining={refinedSummaries[item.uri]?.isRefining ?? false}
                                      onRefine={handleRefineSummary}
                                    />
                                  </ScrollReveal>
                              ))}
                          </div>
                      </div>
                  )}

                  <div className="mt-12 border-t border-white/5 pt-8 flex items-center gap-3">
                      <div className="relative flex-1 group">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ENTER_CUSTOM_INTEL_QUERY..."
                            aria-label="Custom intelligence query input"
                            className="w-full bg-black border border-white/10 px-5 py-3 text-white text-[10px] font-mono focus:border-terminal-green/50 outline-none transition-all disabled:opacity-50 tracking-widest uppercase placeholder:opacity-20"
                            disabled={isFetchingNews}
                        />
                        <div className="absolute inset-0 border border-terminal-green/5 pointer-events-none group-focus-within:border-terminal-green/20 transition-all" />
                      </div>
                      <button
                          onClick={() => onFetchNews(searchQuery)}
                          disabled={isFetchingNews || !searchQuery.trim()}
                          aria-label="Submit custom intelligence query"
                          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
                      >
                          {isFetchingNews ? (
                              <Activity size={12} className="animate-spin" />
                          ) : (
                              <Search size={12} />
                          )}
                          QUERY
                      </button>
                  </div>
               </div>
             </ScrollReveal>
          </div>
        )}

        {slide.type === 'competitive' && comparisonPoints && (
          <ScrollReveal>
            <MemoizedCompetitiveGrid points={comparisonPoints} />
          </ScrollReveal>
        )}

        {slide.type === 'architecture' && architecturePoints && (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6 relative z-10">
              {architecturePoints.map((point, i) => (
                <ScrollReveal key={i} delay={i * 150} className="h-full">
                  <MemoizedArchCard point={point} />
                </ScrollReveal>
              ))}
            </div>
            {/* Structural Background Lines for layered feel */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 z-0 hidden lg:block"></div>
          </div>
        )}

        {slide.type === 'content' && content && (
          <div className="space-y-6">
            {Array.isArray(content) ? (
              <ul className="space-y-4">
                {content.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 100}>
                    <li className="flex gap-6 items-start border-b border-white/5 pb-4 group hover:bg-white/[0.02] transition-colors p-4 rounded-2xl">
                      <span className="text-terminal-green font-black shrink-0 mt-1 text-[10px] bg-terminal-green/5 px-2 py-1 rounded">0{i+1}</span>
                      <p className="text-zinc-300 text-xs lg:text-sm font-medium leading-relaxed uppercase tracking-tight">
                        {item}
                      </p>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            ) : (
              <ScrollReveal>
                <p className="text-lg lg:text-2xl font-extrabold silver-edge border-l-8 border-terminal-green pl-12 py-12 premium-card rounded-3xl uppercase">
                  {content}
                </p>
              </ScrollReveal>
            )}
          </div>
        )}

        {slide.type === 'team' && team && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 150} className="h-full">
                <MemoizedTeamCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {slide.type === 'cta' && content && (
          <div className="h-full flex flex-col justify-between py-12 relative overflow-hidden">
            {/* Phase A (TOP): Authority Instruction */}
            <div className="animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="flex items-center gap-4 text-[10px] text-zinc-600 mb-6 font-black uppercase tracking-[0.4em]">
                <span>PROJ: APEX 1.0</span>
                <span className="opacity-20">/</span>
                <span className="text-terminal-green">SIGNAL 0x0{slide.id}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter silver-edge uppercase" style={{fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
                {slide.title}
              </h2>
            </div>

            {/* Phase B (MID): Execution Invariant (Monolingual) */}
            <div className="my-12 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
              <div className="inline-block bg-zinc-950 border border-terminal-green/10 p-6 rounded-sm shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-terminal-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <code className="text-terminal-green text-sm md:text-lg lg:text-xl tracking-tight silver-edge relative z-10 block">
                  <span className="opacity-30 mr-3 select-none">$</span>
                  {content}
                </code>
              </div>
               <button
                  onClick={() => setShowLightbox(true)}
                  aria-label="Launch Sovereign OS Live Demo"
                  className="mt-8 flex items-center gap-3 px-6 py-3 bg-terminal-green text-black text-xs font-bold uppercase tracking-widest rounded-md hover:scale-105 transition-transform active:scale-100 shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                >
                  <Rocket size={14} /> Launch Sovereign OS
                </button>
            </div>

            {/* Phase C (BOTTOM): Confirmation Terminal */}
            <div className={`transition-all duration-[1000ms] delay-[400ms] ${hasBooted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
               <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter silver-edge uppercase leading-none filter drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]" style={{fontFamily: '"Plus Jakarta Sans", sans-serif'}}>
                 {slide.subtitle}
               </h1>
               
               {/* State Checksum Artifact */}
               <div className="absolute bottom-4 right-4 text-[9px] text-zinc-800 tracking-[0.3em] uppercase select-none pointer-events-none text-right font-bold">
                 STATE_CHECKSUM: {STATE_CHECKSUM}<br/>
                 INTEGRITY: L7_VERIFIED
               </div>
            </div>

            {/* One-time Phosphor Flare Effect */}
            <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-[800ms] ease-out z-50 ${hasBooted ? 'opacity-0' : 'opacity-[0.08]'}`} />
          </div>
        )}
      </div>

       <div className="absolute bottom-8 left-8 text-[9px] font-mono text-zinc-700 tracking-widest uppercase space-y-1 text-left pointer-events-none z-20">
            <div>🛡️ V7_INTEGRITY_VERIFIED</div>
            <div>🌐 ZGB-SOVEREIGN-NODE</div>
        </div>
    </div>
  );
}
export default SlideRenderer;