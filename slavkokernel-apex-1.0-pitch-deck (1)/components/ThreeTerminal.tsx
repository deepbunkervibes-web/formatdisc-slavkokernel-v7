
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Box, Wireframe, Float, Grid, Stars, Icosahedron, Torus, Html } from '@react-three/drei';
import { ProjectManifest } from '../types';
import { GoogleGenAI } from "@google/genai";
import * as THREE from 'three';
import { CRTOverlay } from './CRTOverlay';
import { Clipboard, CheckCircle2 } from 'lucide-react';

// Aliases to bypass JSX intrinsic element type checking in environments where R3F types are restricted
const group = 'group' as any;
const mesh = 'mesh' as any;
const boxGeometry = 'boxGeometry' as any;
const meshStandardMaterial = 'meshStandardMaterial' as any;
const planeGeometry = 'planeGeometry' as any;
const meshBasicMaterial = 'meshBasicMaterial' as any;
const ambientLight = 'ambientLight' as any;
const pointLight = 'pointLight' as any;

const GLITCH_CHARS = "01$#!?%&X@{}[]<>/\\|+=~^!@#$%^&*()_+={}[]<>,.?/\\|~";
const BINARY_POOL = "01010101";

interface SceneProps {
  manifest: ProjectManifest | null;
  latestMessage: string;
  scanlineIntensity: number;
}

function DataStreamLines() {
  const count = 100;
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ],
      speed: Math.random() * 0.1 + 0.05,
      length: Math.random() * 10 + 2,
      opacity: Math.random() * 0.15
    }));
  }, []);

  const G = group;
  return (
    <G>
      {lines.map((line, i) => (
        <DataLine key={i} {...line} />
      ))}
    </G>
  );
}

function DataLine({ pos, speed, length, opacity }: { pos: number[], speed: number, length: number, opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.position.y -= speed;
      if (ref.current.position.y < -20) ref.current.position.y = 20;
    }
  });

  const M = mesh;
  const BG = boxGeometry;
  const MSM = meshStandardMaterial;
  return (
    <M ref={ref} position={pos as any}>
      <BG args={[0.01, length, 0.01]} />
      <MSM color="#00ff41" transparent opacity={opacity} emissive="#00ff41" emissiveIntensity={0.5} />
    </M>
  );
}

function DynamicBackground({ triggerText }: { triggerText: string }) {
  const { viewport } = useThree();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [targetOpacity, setTargetOpacity] = useState(0);
  const [currentOpacity, setCurrentOpacity] = useState(0);
  
  const lastGenRef = useRef(0);
  const meshRef = useRef<THREE.Mesh>(null);
  const isGeneratingRef = useRef(false);

  useEffect(() => {
    const generateBg = async () => {
      if (!process.env.API_KEY || !triggerText) return;
      const now = Date.now();
      if (now - lastGenRef.current < 12000 || isGeneratingRef.current) return;
      if (triggerText.length < 5) return;

      isGeneratingRef.current = true;
      lastGenRef.current = now;

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { text: `Generate a dark, abstract, sci-fi terminal background texture. Style: Cyberpunk, wireframe, glitch art, data noise. Colors: Mostly black with subtle dark green or deep red digital artifacts. Context: "${triggerText}". Output: High contrast, dark, no text.` }
            ]
          }
        });

        let base64 = null;
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    base64 = part.inlineData.data;
                    break;
                }
            }
        }

        if (base64) {
          const loader = new THREE.TextureLoader();
          const newTex = loader.load(`data:image/png;base64,${base64}`);
          newTex.wrapS = THREE.RepeatWrapping;
          newTex.wrapT = THREE.RepeatWrapping;
          setTexture(newTex);
          setTargetOpacity(0.15);
          setCurrentOpacity(0);
        }
      } catch (e) {
        console.error("BG Gen Error", e);
      } finally {
        isGeneratingRef.current = false;
      }
    };
    generateBg();
  }, [triggerText]);

  useFrame((state, delta) => {
    if (meshRef.current && texture) {
        if (currentOpacity < targetOpacity) {
            setCurrentOpacity(prev => Math.min(prev + delta * 0.2, targetOpacity));
        }
        const mat = meshRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = currentOpacity;
        mat.color.setHex(0xffffff);
        const t = state.clock.elapsedTime;
        meshRef.current.rotation.z = Math.sin(t * 0.05) * 0.02;
        meshRef.current.scale.set(
            viewport.width * (1.1 + Math.sin(t * 0.1) * 0.02), 
            viewport.height * (1.1 + Math.cos(t * 0.1) * 0.02), 
            1
        );
    }
  });

  const M = mesh;
  const PG = planeGeometry;
  const MBM = meshBasicMaterial;
  if (!texture) return null;
  return (
    <M ref={meshRef} position={[0, 0, -10]}>
      <PG />
      <MBM map={texture} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </M>
  );
}

function StreamingText({ text }: { text: string }) {
  const { viewport } = useThree();
  const textRef = useRef<any>(null);
  const isMobile = viewport.width < 10;
  
  const progressRef = useRef(0);
  const lastTextRef = useRef('');
  const lastUpdateRef = useRef(0);
  const persistentCorruption = useRef<Map<number, { char: string, stuckEndTime: number | null }>>(new Map());

  const [isTextFullyRendered, setIsTextFullyRendered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copyStatusText, setCopyStatusText] = useState("COPY_INTEL");
  const copyTimeoutRef = useRef<number | null>(null);

  const isCritical = useMemo(() => {
    return /ERROR|CRITICAL|HALT|PANIC|FAIL|FATAL|WARN|DENIED|UNAUTHORIZED|ALERT|SECURITY/i.test(text);
  }, [text]);

  useEffect(() => {
    if (text !== lastTextRef.current) {
      progressRef.current = 0;
      lastTextRef.current = text;
      persistentCorruption.current.clear();
      setIsTextFullyRendered(false);
      setCopyStatusText("COPY_INTEL");
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = null;
      }
    }
  }, [text]);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (copyStatusText === "COPYING...") return;

    setCopyStatusText("COPYING...");
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatusText("COPIED_0x42");
    } catch (err) {
      console.error("Failed to copy text:", err);
      setCopyStatusText("ERROR_SIG");
    } finally {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopyStatusText("COPY_INTEL");
      }, 2000);
    }
  }, [text, copyStatusText]);

  useFrame((state, delta) => {
    if (!textRef.current) return;
    const time = state.clock.elapsedTime;
    const isReadyForUpdate = time - lastUpdateRef.current > 0.035;
    const isKernelHalt = Math.random() > (isCritical ? 0.98 : 0.997);
    let stutter = 1.0;
    if (isKernelHalt) {
        stutter = isCritical ? 0.0 : -5.0;
    } else if (Math.random() > 0.95) {
        stutter = 0.1;
    }
    const baseSpeed = isCritical ? 10 : 65;
    if (progressRef.current < text.length) {
      progressRef.current += delta * baseSpeed * stutter; 
      if (progressRef.current < 0) progressRef.current = 0;
    } else if (!isTextFullyRendered) {
        setIsTextFullyRendered(true);
    }

    if (!isReadyForUpdate) return;
    lastUpdateRef.current = time;

    const currentIdx = Math.floor(progressRef.current);
    let displayed = text.substring(0, currentIdx);
    const noisePulse = Math.pow(Math.sin(time * 2), 2) * 0.15;
    const burst = Math.random() > 0.93 ? 0.5 : 0;
    const instabilityThreshold = 0.04 + noisePulse + burst;
    const charArray = displayed.split('');
    const charLen = charArray.length;
    const isMacroGlitch = instabilityThreshold > 0.5;

    for (let i = 0; i < charLen; i++) {
      let char = charArray[i];
      if (char === '\n' || char === ' ') continue;
      const rand = Math.random();
      let corruptionEntry = persistentCorruption.current.get(i);
      const wasPersistentlyCorrupted = !!corruptionEntry;
      const wasStuckTemporary = corruptionEntry && corruptionEntry.stuckEndTime !== null;
      let triggerSpread = false;

      if (corruptionEntry && corruptionEntry.stuckEndTime !== null && time > corruptionEntry.stuckEndTime) {
          if (Math.random() < 0.2) {
              corruptionEntry = { char: corruptionEntry.char, stuckEndTime: null };
              persistentCorruption.current.set(i, corruptionEntry);
              if (wasStuckTemporary) triggerSpread = true;
          } else {
              persistentCorruption.current.delete(i);
              corruptionEntry = undefined;
          }
      }

      if (!corruptionEntry) {
          if (rand > 0.997) {
              const isNewStuckGlitch = Math.random() < 0.6;
              let newBadChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              const newStuckEndTime = isNewStuckGlitch ? time + (Math.random() * 0.5 + 0.2) : null;
              corruptionEntry = { char: newBadChar, stuckEndTime: newStuckEndTime };
              persistentCorruption.current.set(i, corruptionEntry);
              char = newBadChar;
              if (!wasPersistentlyCorrupted) triggerSpread = true;
          } else {
              if (isMacroGlitch || rand < instabilityThreshold) {
                char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              } else if (rand > 0.985 && rand < 0.99) {
                char = '█';
              } else if (rand > 0.975 && rand < 0.995) {
                const code = char.charCodeAt(0);
                if (code >= 65 && code >= 97 && code <= 122) char = String.fromCharCode(code - 32);
              } else if (rand > 0.95) {
                const flickerType = Math.random();
                if (flickerType > 0.6) char = ' ';
                else if (flickerType > 0.3) char = '░';
                else if (flickerType > 0.05) char = '▓';
                else char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              }
          }
      } else {
          char = corruptionEntry.char;
          if (corruptionEntry.stuckEndTime === null) {
              if (rand > 0.94) {
                  const mutatedChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                  persistentCorruption.current.set(i, { ...corruptionEntry, char: mutatedChar });
                  char = mutatedChar;
              }
          } else if (Math.random() < 0.7) {
                char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
      }

      if (triggerSpread) {
        const spreadChance = 0.15;
        const neighbors = [i - 1, i + 1];
        for (const neighborIdx of neighbors) {
          if (neighborIdx >= 0 && neighborIdx < charLen && !persistentCorruption.current.has(neighborIdx)) {
            if (Math.random() < spreadChance) {
              let neighborBadChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              persistentCorruption.current.set(neighborIdx, { char: neighborBadChar, stuckEndTime: time + 0.2 });
              charArray[neighborIdx] = neighborBadChar;
            }
          }
        }
      }
      if (rand > 0.9996) char = BINARY_POOL[Math.floor(Math.random() * BINARY_POOL.length)];
      charArray[i] = char;
    }
    displayed = charArray.join('');
    if (Math.random() > 0.98) {
      const lines = displayed.split('\n');
      const targetLine = Math.floor(Math.random() * lines.length);
      lines[targetLine] = ' '.repeat(Math.floor(Math.random() * 4)) + lines[targetLine];
      displayed = lines.join('\n');
    }

    let tail = "";
    if (currentIdx < text.length) {
      const tailLen = Math.floor(Math.random() * 15) + 3;
      for (let i = 0; i < tailLen; i++) {
        if (currentIdx + i < text.length) tail += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
    }

    const isTyping = progressRef.current < text.length;
    const flickerRate = isKernelHalt ? 40 : 14; 
    const showCursor = Math.floor(time * flickerRate) % 2 === 0;
    const cursor = isTyping ? '█' : (showCursor ? '_' : ' ');
    const finalString = `[V7_OVERSEER_STREAM_ACTIVE]:\n${displayed}${tail}${cursor}`;
    if (textRef.current.text !== finalString) textRef.current.text = finalString;

    const mat = textRef.current;
    const frameSeed = Math.random();
    if (frameSeed > 0.97) {
      mat.position.x = (Math.random() - 0.5) * 0.3;
      mat.position.y = (Math.random() - 0.5) * 0.05 + (isMobile ? -viewport.height / 2 + 1 : viewport.height / 2 - 1.5);
    } else {
      mat.position.x = 0;
    }

    if (frameSeed > 0.997) { mat.color.set("#ffffff"); mat.fillOpacity = 1.0; }
    else if (frameSeed > 0.99) mat.fillOpacity = 0.0;
    else if (frameSeed > 0.975) { mat.color.set("#ff0033"); mat.fillOpacity = 0.8; }
    else {
      const hum = 0.85 + Math.sin(time * 150) * 0.15;
      mat.color.setRGB(0, 0.9 + Math.random() * 0.1, 0.25);
      mat.fillOpacity = hum;
    }
  });

  const G = group;
  const position: [number, number, number] = isMobile
    ? [-viewport.width / 2 + 0.5, -viewport.height / 2 + 1, 0]
    : [viewport.width / 2 - 5, viewport.height / 2 - 1.5, 0];

  return (
    <G 
      position={position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Text
        ref={textRef}
        fontSize={isMobile ? 0.22 : 0.16}
        color="#00ff41"
        anchorX="left"
        anchorY="top"
        maxWidth={isMobile ? viewport.width - 1 : 4.5}
        lineHeight={1.4}
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t6nu48P_4K1zG7j06-A1979_82V_L0-eF9Y.woff"
      />

      {isTextFullyRendered && isHovered && (
        <Html
          position={[isMobile ? 0.5 : 4.2, 0.15, 0]}
          center
          style={{ 
            pointerEvents: 'auto',
            zIndex: 100 
          }}
        >
          <button
            onClick={handleCopy}
            disabled={copyStatusText === "COPYING..."}
            className={`flex items-center gap-2 px-2.5 py-1 bg-terminal-green text-black text-[8px] font-black uppercase tracking-widest rounded-sm transition-all animate-in fade-in zoom-in duration-200 ${copyStatusText === "COPYING..." ? 'opacity-50' : 'hover:scale-105 active:scale-95'}`}
          >
            {copyStatusText.includes("COPIED") ? <CheckCircle2 size={10} /> : <Clipboard size={10} />}
            {copyStatusText}
          </button>
        </Html>
      )}
    </G>
  );
}

interface RotatingKernelProps {
    manifest: ProjectManifest;
    playGlitchSound: () => void;
}

const RISK_SIGNAL: Record<string, number> = {
  LOW: 0.2,
  MEDIUM: 0.5,
  HIGH: 0.9,
  OK: 0.15,
  WARN: 0.45,
  CRITICAL: 0.85
};

function RotatingKernel({ manifest, playGlitchSound }: RotatingKernelProps) {
  const outerRef = useRef<any>(null);
  const coreRef = useRef<any>(null);
  const innerWireRef = useRef<any>(null);
  const ringRef = useRef<any>(null);
  const { viewport } = useThree();
  const scale = Math.min(1.4, viewport.width / 5);
  
  const [isHovered, setIsHovered] = useState(false);
  const hasRisks = manifest.riskFlags && manifest.riskFlags.length > 0;
  const themeColor = hasRisks ? '#ff0033' : '#00ff41';

  // Deterministic emissive level calculation from manifest
  const emissiveLevel = useMemo(() => {
    if (!manifest?.riskFlags || manifest.riskFlags.length === 0) return 0.2;
    
    const intensities = manifest.riskFlags.map(f => {
      const upper = f.toUpperCase();
      if (upper.includes('CRITICAL') || upper.includes('HALT') || upper.includes('PANIC')) return RISK_SIGNAL.CRITICAL;
      if (upper.includes('WARN') || upper.includes('RISK')) return RISK_SIGNAL.WARN;
      if (upper.includes('AUDIT') || upper.includes('QUORUM')) return RISK_SIGNAL.MEDIUM;
      return RISK_SIGNAL.LOW;
    });

    return Math.max(...intensities, 0.2);
  }, [manifest]);

  const [glitchProps, setGlitchProps] = useState({ 
    color: themeColor, 
    thickness: 0.02, 
    opacity: 0.3, 
    fillOpacity: 0.05 
  });

  useEffect(() => { setGlitchProps(p => ({ ...p, color: themeColor })); }, [themeColor]);
  const glitchState = useRef({ 
    isActive: false, 
    timer: 0, 
    nextGlitch: Math.random() * 3 + 2, 
    frameSkipper: 0, 
    prevIsActive: false 
  });
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const gs = glitchState.current;

    // Glitch management
    const glitchIntensityFactor = isHovered ? 0.3 : 1.0;
    if (!gs.isActive) {
      gs.nextGlitch -= 0.016 / glitchIntensityFactor;
      if (gs.nextGlitch <= 0 || (isHovered && Math.random() > 0.98)) { 
        gs.isActive = true; 
        gs.timer = Math.random() * (isHovered ? 0.4 : 0.2) + 0.1; 
      }
    } else {
      gs.timer -= 0.016;
      if (gs.timer <= 0) {
        gs.isActive = false;
        gs.nextGlitch = Math.random() * (isHovered ? 1 : 4) + (isHovered ? 0.2 : 2);
        setGlitchProps({ color: themeColor, thickness: 0.02, opacity: 0.3, fillOpacity: 0.05 });
        if (outerRef.current) { outerRef.current.position.set(0,0,0); outerRef.current.scale.set(1,1,1); }
      } else {
         let jitterAmt = isHovered ? 0.8 : 0.4;
         if (Math.random() < (isHovered ? 0.15 : 0.05)) { jitterAmt = isHovered ? 2.5 : 1.5; }
         if (outerRef.current) {
             outerRef.current.rotation.x += (Math.random() - 0.5) * jitterAmt;
             outerRef.current.rotation.y += (Math.random() - 0.5) * jitterAmt;
         }
         gs.frameSkipper++;
         if (gs.frameSkipper % (isHovered ? 1 : 2) === 0) {
             setGlitchProps({ 
               color: Math.random() > 0.5 ? '#ffffff' : themeColor, 
               thickness: Math.random() * (isHovered ? 0.2 : 0.1), 
               opacity: 0.9, 
               fillOpacity: isHovered ? 0.2 : 0.1 
             });
         }
      }
    }

    if (gs.isActive && !gs.prevIsActive) playGlitchSound();
    gs.prevIsActive = gs.isActive;

    // Normal mechanical rotation
    if (!gs.isActive || isHovered) {
        // High reactivity logic: factor in manifest risk level
        const reactiveFactor = 1.0 + (emissiveLevel * 2.0); // 1.4 to 2.8
        const speedMultiplier = (isHovered ? 8.0 : 1.0) * reactiveFactor;
        
        if (coreRef.current) {
          // mechanical rotation accelerated by risk factor
          coreRef.current.rotation.y += 0.005 * speedMultiplier;
          coreRef.current.rotation.x += 0.002 * speedMultiplier;
          
          // Dynamic scale/pulse reactive to risk levels
          const pulseFrequency = 4 + (emissiveLevel * 12);
          const pulseAmplitude = 0.03 + (emissiveLevel * 0.12);
          const pulse = (1 + Math.sin(time * pulseFrequency) * pulseAmplitude) * (isHovered ? 1.15 : 1.0);
          coreRef.current.scale.set(pulse, pulse, pulse);
          
          // manifest-driven emissive intensity with higher range on hover
          (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
              (emissiveLevel + Math.sin(time * (pulseFrequency * 0.5)) * 0.2) * (isHovered ? 3.5 : 1.5);
        }

        if (innerWireRef.current) {
          // counter-rotation for depth illusion
          innerWireRef.current.rotation.y -= 0.003 * speedMultiplier;
          innerWireRef.current.rotation.z += 0.001 * speedMultiplier;
        }

        if (outerRef.current) { 
          outerRef.current.rotation.x += 0.001 * speedMultiplier;
          outerRef.current.rotation.z -= 0.0005 * speedMultiplier; 
          
          // Wobble effect on high threat (emissiveLevel) or hover
          if (isHovered || emissiveLevel > 0.7) {
            const wobble = Math.sin(time * 25) * (0.02 * emissiveLevel);
            outerRef.current.position.y += wobble;
          }
        }

        if (ringRef.current) { 
          ringRef.current.rotation.y += 0.005 * speedMultiplier; 
        }
    }
  });

  const MSM = meshStandardMaterial;
  const MBM = meshBasicMaterial;
  const PL = pointLight;
  const G = group;
  
  return (
    <G 
      scale={scale}
      onPointerOver={() => { setIsHovered(true); playGlitchSound(); }}
      onPointerOut={() => setIsHovered(false)}
    >
      <Float speed={glitchState.current.isActive ? 25 : 1.5} rotationIntensity={0.15} floatIntensity={0.4}>
          {/* INNER SOLID CORE - High Density */}
          <Icosahedron args={[0.8, 4]} ref={coreRef}>
            <MSM 
              color="#050505" 
              emissive={themeColor} 
              emissiveIntensity={emissiveLevel} 
              roughness={0.25} 
              metalness={0.8} 
            />
          </Icosahedron>

          {/* INNER WIREFRAME SHELL - High Density Structure */}
          <Icosahedron args={[0.82, 5]} ref={innerWireRef}>
            <MBM 
              color={themeColor} 
              wireframe 
              transparent 
              opacity={0.35 + (emissiveLevel * 0.3)} 
            />
          </Icosahedron>

          <PL color={glitchProps.color} distance={6} intensity={isHovered ? 12 : 5} />
          
          <Torus args={[1.3, 0.015, 16, 100]} ref={ringRef}>
            <MSM color={themeColor} emissive={themeColor} emissiveIntensity={1.5} />
          </Torus>

          {/* OUTER PROTECTIVE SHELL */}
          <Icosahedron args={[1.6, 1]} ref={outerRef}>
             <MSM color={glitchProps.color} transparent opacity={glitchProps.fillOpacity} side={THREE.DoubleSide} />
             <Wireframe stroke={glitchProps.color} thickness={isHovered ? glitchProps.thickness * 2.5 : glitchProps.thickness} opacity={glitchProps.opacity} transparent />
          </Icosahedron>
      </Float>
    </G>
  );
}

export function ThreeTerminal({ manifest, latestMessage, scanlineIntensity }: SceneProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const initAudio = () => { if (!audioContextRef.current) audioContextRef.current = new AudioContext(); if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume(); };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const playGlitchSound = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80 + Math.random() * 40, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, []);

  const G = group;
  const AL = ambientLight;
  const PL = pointLight;

  return (
    <div className="h-full w-full bg-black relative border-l border-white/5">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
            <AL intensity={0.4} />
            <PL position={[10, 10, 10]} intensity={3} color="#00ff41" />
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={2} />
            <DataStreamLines />
            {manifest ? (
                <>
                    <DynamicBackground triggerText={latestMessage} />
                    <RotatingKernel manifest={manifest} playGlitchSound={playGlitchSound} />
                    <StreamingText text={latestMessage} />
                    <Grid infiniteGrid sectionSize={1} cellColor="#001100" sectionColor="#004400" fadeDistance={40} position={[0, -5, 0]} />
                </>
            ) : (
                <G>
                  <Text fontSize={0.4} color="#00ff41" position={[0, 0, 0]} font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t6nu48P_4K1zG7j06-A1979_82V_L0-eF9Y.woff" text="ESTABLISHING_V7_KERNEL_LINK..." />
                </G>
            )}
        </Canvas>
        <CRTOverlay scanlineIntensity={scanlineIntensity} />
    </div>
  );
}
