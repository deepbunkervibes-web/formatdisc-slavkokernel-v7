import React, { useCallback, useEffect, useState } from 'react';
import { Upload, FileCode, MousePointer2 } from 'lucide-react';
import { api } from '../api';
import { ProjectManifest } from '../types';

interface UploadZoneProps {
  onUpload: (id: string, manifest: ProjectManifest) => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const processFile = async (file: File) => {
    setLoading(true);
    try {
      const { sessionId } = await api.upload(file);
      const { manifest } = await api.analyze(sessionId);
      onUpload(sessionId, manifest);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`h-full w-full flex flex-col items-center justify-center border transition-all duration-500 relative overflow-hidden rounded-[40px] p-10 cursor-pointer group select-none ${
        isDragging 
          ? 'border-dashed border-terminal-green bg-terminal-green/5 scale-[0.99] shadow-[0_0_50px_rgba(0,255,65,0.1)]' 
          : 'border-dashed border-white/5 hover:border-white/10 bg-black'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept=".zip,.tar.gz" 
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer z-50"
      />

      {/* Version Stamp - Top Left */}
      <div className="absolute top-12 left-12 text-left pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100">
        <div className="text-[10px] font-mono font-bold text-zinc-800 tracking-widest uppercase leading-loose">
          VER: 1.0.42-STABLE<br/>
          AUTH: APEX_SIG_7
        </div>
      </div>
      
      {loading ? (
        <div className="text-center space-y-8 pointer-events-none">
           <div className="relative inline-block">
             <FileCode className="w-16 h-16 text-terminal-green mx-auto animate-pulse" />
             <div className="absolute inset-0 bg-terminal-green/20 blur-xl animate-pulse rounded-full"></div>
           </div>
           <div className="space-y-2">
             <div className="text-2xl font-black tracking-tighter text-white silver-edge animate-flicker">BOOTING_CORE_STRUCT</div>
             <div className="text-[10px] text-terminal-green font-mono font-bold uppercase tracking-[0.2em] animate-pulse">Scanning Bytecodes...</div>
           </div>
        </div>
      ) : (
        <div className="text-center space-y-8 relative z-10 pointer-events-none">
          <div className="relative transition-transform duration-500 group-hover:-translate-y-2">
            <Upload className={`w-24 h-24 mx-auto transition-colors duration-500 ${isDragging ? 'text-terminal-green' : 'text-zinc-800 group-hover:text-zinc-700'}`} strokeWidth={1} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight silver-edge uppercase drop-shadow-2xl">
              INITIALIZE_SYSTEM
            </h2>
            <p className="text-[10px] md:text-xs text-zinc-700 font-mono font-bold tracking-[0.4em] uppercase group-hover:text-zinc-600 transition-colors">
              DROP .ZIP PAYLOAD
            </p>
          </div>
        </div>
      )}

      {/* Subtle Hint */}
      {showHint && !isDragging && !loading && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="flex items-center gap-2 text-[10px] text-zinc-700 font-mono uppercase tracking-widest">
                <MousePointer2 size={12} /> Click to browse payload
            </div>
        </div>
      )}
    </div>
  );
}