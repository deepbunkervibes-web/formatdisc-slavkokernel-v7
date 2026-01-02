
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Grid, Stars, Icosahedron, Torus, Html, Wireframe } from '@react-three/drei';
import * as THREE from 'three';
import { CRTOverlay } from '../../components/ui/CRTOverlay';
import { Clipboard, CheckCircle2 } from 'lucide-react';

// Simplified Types for Internal Use
export interface ProjectManifest {
  riskFlags: string[];
}

// Aliases to bypass JSX intrinsic element type checking
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

function StreamingText({ text }: { text: string }) {
  const { viewport } = useThree();
  const textRef = useRef<any>(null);
  const isMobile = viewport.width < 10;
  const progressRef = useRef(0);
  
  useFrame((state, delta) => {
    if (!textRef.current) return;
    const speed = 30;
    if (progressRef.current < text.length) {
        progressRef.current += delta * speed;
    }
    const currentIdx = Math.floor(progressRef.current);
    const displayed = text.substring(0, currentIdx);
    const cursor = (Math.floor(state.clock.elapsedTime * 2) % 2 === 0) ? '_' : ' ';
    textRef.current.text = `[V7_OVERSEER]:\n${displayed}${cursor}`;
  });

  const G = group;
  const position: [number, number, number] = isMobile
    ? [-viewport.width / 2 + 0.5, -viewport.height / 2 + 1, 0]
    : [viewport.width / 2 - 5, viewport.height / 2 - 1.5, 0];

  return (
    <G position={position}>
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
    </G>
  );
}

function RotatingKernel({ manifest }: { manifest: ProjectManifest }) {
  const coreRef = useRef<any>(null);
  const outerRef = useRef<any>(null);
  
  useFrame((state) => {
      const time = state.clock.elapsedTime;
      if (coreRef.current) {
          coreRef.current.rotation.y += 0.01;
          coreRef.current.rotation.x += 0.005;
      }
      if (outerRef.current) {
          outerRef.current.rotation.z -= 0.002;
          outerRef.current.rotation.x -= 0.002;
      }
  });

  const MSM = meshStandardMaterial;
  const MBM = meshBasicMaterial;
  const PL = pointLight;
  const G = group;

  return (
    <G scale={1.5}>
       <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Icosahedron args={[0.8, 4]} ref={coreRef}>
            <MSM color="#050505" emissive="#00ff41" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
          </Icosahedron>
          
          <Icosahedron args={[1.6, 1]} ref={outerRef}>
             <MSM color="#00ff41" transparent opacity={0.05} side={THREE.DoubleSide} />
             <Wireframe stroke="#00ff41" thickness={0.02} opacity={0.3} transparent />
          </Icosahedron>
       </Float>
    </G>
  );
}

export function ThreeTerminal({ latestMessage }: { latestMessage: string }) {
  const AL = ambientLight;
  const PL = pointLight;

  return (
    <div className="h-[60vh] w-full bg-black relative border-b border-terminal-green/20">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
            <AL intensity={0.4} />
            <PL position={[10, 10, 10]} intensity={3} color="#00ff41" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <DataStreamLines />
            <RotatingKernel manifest={{ riskFlags: [] }} />
            <StreamingText text={latestMessage} />
            <Grid infiniteGrid sectionSize={1} cellColor="#001100" sectionColor="#004400" fadeDistance={40} position={[0, -5, 0]} />
        </Canvas>
        <CRTOverlay scanlineIntensity={0.2} />
    </div>
  );
}
