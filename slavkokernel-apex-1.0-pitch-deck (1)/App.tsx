
import { useState, useEffect, useMemo, useCallback } from 'react';
import UploadZone from './components/UploadZone';
import { ThreeTerminal } from './components/ThreeTerminal';
import SlideRenderer from './components/SlideRenderer';
import { ProjectManifest, ChatMessage } from './types';
import { PITCH_DECK } from './constants';
import { Terminal, Presentation, Activity, ChevronLeft, ChevronRight, Shield, Database, Zap, MonitorDot, Contrast, Radar } from 'lucide-react';
import ChatSimulation from './components/ChatSimulation';
import { api, NewsItem } from './api'; 
import { useTypedLog } from './hooks';

export default function App() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [manifest, setManifest] = useState<ProjectManifest | null>(null);
  const [viewMode, setViewMode] = useState<'kernel' | 'deck'>('deck');
  const [slideIndex, setSlideIndex] = useState(0);
  const [rawChatLog, setRawChatLog] = useState<ChatMessage[]>([]);
  const chatLog = useTypedLog(rawChatLog);
  const [latestSystemMessage, setLatestSystemMessage] = useState('');
  const [metrics, setMetrics] = useState({ cpu: 12, mem: 4.2, load: 0.01, protocolSync: 98 });
  const [scanlineIntensity, setScanlineIntensity] = useState(0.7);
  const [highContrast, setHighContrast] = useState(false);
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  const [signals, setSignals] = useState<string[]>(["INITIATING_SIGNAL_DECODER...", "SCANNING_V7_MESH..."]);
  const [isFetchingSignals, setIsFetchingSignals] = useState(false);

  const nextSlide = () => setSlideIndex((i) => Math.min(i + 1, PITCH_DECK.length - 1));
  const prevSlide = () => setSlideIndex((i) => Math.max(i - 1, 0));

  const addLog = (content: string, level: 'INFO' | 'WARN' | 'CRITICAL' = 'INFO', role: 'system' | 'user' = 'system') => {
    const newMessage: ChatMessage = {
      role,
      content,
      timestamp: Date.now(),
      level
    };
    setRawChatLog(prev => [...prev, newMessage]);
    if (role === 'system' && !content.startsWith('>')) {
      setLatestSystemMessage(content);
    }
  };

  const handleUpload = (id: string, m: ProjectManifest) => {
    setSessionId(id);
    setManifest(m);
    addLog("[PROTOCOL] INITIALIZING KERNEL | INICIJALIZACIJA JEZGRE...", 'INFO', 'system');
    addLog("[SYSTEM] COUNCIL_GOVERNANCE: ACTIVE | AKTIVNO", 'INFO', 'system');
    setViewMode('kernel');
  };

  const handleFetchNews = useCallback(async (query: string) => {
    setIsFetchingNews(true);
    setNewsError(null);
    setNewsItems([]);
    try {
      const { items } = await api.fetchNews(query);
      if (items.length === 0) setNewsError("No specific news items found.");
      setNewsItems(items);
    } catch (error) {
      setNewsError(`[ERROR] Unable to fetch news.`);
      setNewsItems([]);
    } finally {
      setIsFetchingNews(false);
    }
  }, []);

  const handleFetchPlaceholderNews = useCallback(async () => {
    setIsFetchingNews(true);
    setNewsError(null);
    setNewsItems([]);
    try {
      const { items } = await api.fetchPlaceholderNews("DEMO_V7_CONTEXT");
      setNewsItems(items);
    } catch (error) {
      setNewsError(`[MOCK_ERROR] Data acquisition failed.`);
    } finally {
      setIsFetchingNews(false);
    }
  }, []);

  const handleFetchSignals = useCallback(async () => {
    setIsFetchingSignals(true);
    try {
      const newSignals = await api.fetchSovereignSignals();
      setSignals(prev => [...newSignals, ...prev.slice(0, 10)]);
    } catch (e) {
      console.error("Signal fetch failed", e);
    } finally {
      setIsFetchingSignals(false);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => ({
        cpu: +(Math.random() * 5 + 15).toFixed(2),
        mem: +(3.8 + Math.random() * 0.2).toFixed(2),
        load: +(Math.random() * 0.08).toFixed(3),
        protocolSync: Math.random() > 0.95 ? 99 : 98
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'deck') {
        if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
      if (e.key === 'Escape') setViewMode('deck');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  return (
    <div className={`h-screen w-screen bg-black text-white flex flex-col overflow-hidden font-mono selection:bg-terminal-green selection:text-black ${highContrast ? 'high-contrast' : ''}`}>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .ticker-content {
          display: inline-block;
          animation: ticker-scroll 60s linear infinite;
        }
      `}</style>

      {/* GLOBAL SYSTEM HEADER */}
      <div className="h-16 border-b border-terminal-green/20 flex items-center px-8 justify-between bg-black z-30 relative backdrop-blur-xl">
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-terminal-green flex items-center justify-center rounded-sm">
                  <div className="w-3 h-3 bg-terminal-green animate-pulse shadow-[0_0_10px_#00ff41]" />
                </div>
                <span className="font-extrabold tracking-tighter text-xl silver-edge uppercase">SlavkoKernel V7</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 border-l border-white/10 text-[9px] font-black tracking-widest text-zinc-500 uppercase">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-terminal-green shadow-[0_0_5px_#00ff41]"></div>
                <span>NODE: ZGB-OPS-01</span>
              </div>
              <div className="flex items-center gap-2">
                <Radar size={10} className={isFetchingSignals ? "animate-spin text-terminal-green" : "text-zinc-500"} />
                <span>SYNC: {metrics.protocolSync}%</span>
              </div>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                onClick={handleFetchSignals}
                disabled={isFetchingSignals}
                className="hidden md:flex items-center gap-2 px-3 py-1 text-[8px] font-black text-terminal-green border border-terminal-green/30 rounded-sm hover:bg-terminal-green/10 transition-colors uppercase tracking-[0.2em] disabled:opacity-30"
            >
                <Zap size={10} /> {isFetchingSignals ? 'SCANNING...' : 'SIG_SCAN'}
            </button>

            <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
              <MonitorDot size={12} /> SCANLINE_INT
              <input type="range" min="0" max="1" step="0.05" value={scanlineIntensity} onChange={(e) => setScanlineIntensity(parseFloat(e.target.value))} className="w-24" />
            </div>

            <button onClick={() => setHighContrast(!highContrast)} className="p-2 text-zinc-500 hover:text-white transition-colors rounded-sm border border-transparent hover:border-white/10">
                <Contrast size={14} />
            </button>

            <div className="flex p-1 bg-zinc-900/50 rounded-sm border border-white/5">
                <button onClick={() => setViewMode('deck')} className={`flex items-center gap-2 px-5 py-1.5 rounded-sm text-[10px] font-bold tracking-widest transition-all uppercase ${viewMode === 'deck' ? 'bg-terminal-green text-black' : 'text-zinc-500 hover:text-white'}`}>
                    <Presentation size={12} /> DECK
                </button>
                <button onClick={() => setViewMode('kernel')} className={`flex items-center gap-2 px-5 py-1.5 rounded-sm text-[10px] font-bold tracking-widest transition-all uppercase ${viewMode === 'kernel' ? 'bg-terminal-green text-black' : 'text-zinc-500 hover:text-terminal-green'}`}>
                    <Activity size={12} /> TERMINAL
                </button>
            </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {viewMode === 'deck' ? (
          <div className="flex-1 flex flex-col bg-black relative">
            <div className="flex-1 relative overflow-hidden" style={{ perspective: '1500px' }}>
                <SlideRenderer 
                  key={slideIndex}
                  slide={PITCH_DECK[slideIndex]} 
                  onFetchNews={handleFetchNews} 
                  newsItems={newsItems}      
                  isFetchingNews={isFetchingNews}
                  newsError={newsError}
                />
            </div>
            
            <div className="h-20 border-t border-terminal-green/10 flex items-center justify-between px-10 bg-black/80 backdrop-blur-xl z-20">
                <div className="flex gap-10">
                    <button onClick={prevSlide} className="group flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-zinc-500 hover:text-terminal-green transition-all disabled:opacity-5 uppercase" disabled={slideIndex === 0}>
                        <ChevronLeft size={16} /> NAZAD
                    </button>
                    <button onClick={nextSlide} className="group flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-zinc-500 hover:text-terminal-green transition-all disabled:opacity-5 uppercase" disabled={slideIndex === PITCH_DECK.length - 1}>
                        DALJE <ChevronRight size={16} />
                    </button>
                </div>
                
                <div className="flex gap-2">
                  {PITCH_DECK.map((_, i) => (
                    <button key={i} className={`h-0.5 transition-all duration-700 ${i === slideIndex ? 'bg-terminal-green w-10 shadow-[0_0_10px_#00ff41]' : 'bg-zinc-800 w-2 cursor-pointer hover:bg-zinc-600'}`} onClick={() => setSlideIndex(i)} />
                  ))}
                </div>

                <div className="hidden sm:flex text-[9px] text-zinc-600 font-black uppercase tracking-[0.4em] gap-8">
                    <span className="text-terminal-green silver-edge">OLLAMA_ACTIVE</span>
                </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-black">
            <div className="w-full md:w-[450px] lg:w-[550px] h-1/2 md:h-full border-b md:border-b-0 md:border-r border-terminal-green/10 flex flex-col relative z-20 bg-black shadow-[20px_0_50px_rgba(0,0,0,1)]">
                {!sessionId || !manifest ? (
                    <div className="flex-1 p-10 flex flex-col">
                        <UploadZone onUpload={handleUpload} />
                    </div>
                ) : (
                    <ChatSimulation sessionId={sessionId} manifest={manifest} log={chatLog} onNewMessage={addLog} />
                )}
            </div>
            <div className="flex-1 h-1/2 md:h-full relative bg-black">
                <ThreeTerminal manifest={manifest} latestMessage={latestSystemMessage} scanlineIntensity={scanlineIntensity} />
            </div>
          </div>
        )}
      </div>

      {/* STRATEGIC SIGNAL TICKER */}
      <div className="h-6 bg-zinc-950 border-t border-terminal-green/10 ticker-container z-40">
        <div className="ticker-content flex items-center">
          {Array(2).fill(signals).flat().map((sig, i) => (
            <span key={i} className="px-10 text-[8px] font-bold text-terminal-green/60 uppercase tracking-[0.2em] flex items-center gap-4">
              <span className="text-terminal-green opacity-100">●</span> {sig}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
