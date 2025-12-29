import * as React from 'react';import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface KernelConsciousnessProps {
  phase: 'EVALUATING' | 'MVP_BUILDING' | 'IDLE';
  confidence?: number; // 0-1
  currentThought?: string;
  decisionNodes?: Array<{label: string;weight: number;}>;
}

export const KernelConsciousness: React.FC<KernelConsciousnessProps> = ({
  phase,
  confidence = 0.5,
  currentThought = 'Analyzing market viability...',
  decisionNodes = []
}) => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-black via-purple-950/20 to-black rounded-2xl overflow-hidden border border-purple-500/20">
            {/* 3D Hologram Canvas */}
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#14F1D9" />

                {/* Central Brain Sphere */}
                <BrainCore phase={phase} confidence={confidence} />

                {/* Orbiting Decision Nodes */}
                {decisionNodes.map((node, idx) =>
        <DecisionNode
          key={idx}
          position={[
          Math.cos(idx / decisionNodes.length * Math.PI * 2) * 3,
          Math.sin(idx / decisionNodes.length * Math.PI * 2) * 2,
          0]
          }
          label={node.label}
          weight={node.weight}
          index={idx} />

        )}

                {/* Neural Connections */}
                <NeuralWeb nodeCount={decisionNodes.length} phase={phase} />

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Status Bar */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-lg px-4 py-3">
                        <div className="text-xs text-purple-400 font-mono mb-1">KERNEL STATUS</div>
                        <div className="text-lg font-bold text-white">{phase}</div>
                    </div>

                    <ConfidenceMeter value={confidence} />
                </div>

                {/* Live Thought Stream */}
                <div className="absolute bottom-6 left-6 right-6">
                    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg px-6 py-4">
            
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            <div className="text-xs text-cyan-400 font-mono">CURRENT THOUGHT</div>
                        </div>
                        <div className="text-white font-mono text-sm">{currentThought}</div>
                    </motion.div>
                </div>

                {/* Quantum State Indicator */}
                <div className="absolute top-6 right-6">
                    <QuantumStateIndicator phase={phase} />
                </div>
            </div>
        </div>);

};

// Central pulsating brain sphere
const BrainCore: React.FC<{phase: string;confidence: number;}> = ({ phase, confidence }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const color = useMemo(() => {
    if (phase === 'EVALUATING') return '#14F1D9';
    if (phase === 'MVP_BUILDING') return '#a855f7';
    return '#38bdf8';
  }, [phase]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;

    // Pulse based on confidence
    const scale = 1 + Math.sin(t * 2) * 0.1 * confidence;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8} />
      
        </mesh>);

};

// Orbiting decision nodes
const DecisionNode: React.FC<{
  position: [number, number, number];
  label: string;
  weight: number;
  index: number;
}> = ({ position, label, weight, index }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t + index;

    // Orbit around center
    const radius = 3;
    const angle = index / 5 * Math.PI * 2 + t * 0.3;
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
  });

  return (
    <group>
            <mesh ref={meshRef} position={position}>
                <octahedronGeometry args={[0.2 + weight * 0.3, 0]} />
                <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={weight}
          metalness={0.9}
          roughness={0.1} />
        
            </mesh>
            <Text
        position={[position[0], position[1] + 0.5, position[2]]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle">
        
                {label}
            </Text>
        </group>);

};

// Neural web connections
const NeuralWeb: React.FC<{nodeCount: number;phase: string;}> = ({ nodeCount, phase }) => {
  const linesRef = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle1 = i / nodeCount * Math.PI * 2;
      const angle2 = (i + 1) / nodeCount * Math.PI * 2;

      vertices.push(
        Math.cos(angle1) * 3, Math.sin(angle1) * 2, 0,
        0, 0, 0,
        Math.cos(angle2) * 3, Math.sin(angle2) * 2, 0
      );
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, [nodeCount]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const t = state.clock.getElapsedTime();
    (linesRef.current.material as THREE.LineBasicMaterial).opacity =
    0.3 + Math.sin(t * 2) * 0.2;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
            <lineBasicMaterial color="#a855f7" transparent opacity={0.3} />
        </lineSegments>);

};

// Confidence meter component
const ConfidenceMeter: React.FC<{value: number;}> = ({ value }) => {
  return (
    <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-lg px-4 py-3 min-w-[200px]">
            <div className="text-xs text-purple-400 font-mono mb-2">CONFIDENCE</div>
            <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${value * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }} />
          
                </div>
                <div className="text-white font-bold text-lg">{Math.round(value * 100)}%</div>
            </div>
        </div>);

};

// Quantum state indicator
const QuantumStateIndicator: React.FC<{phase: string;}> = ({ phase }) => {
  const states = {
    EVALUATING: { label: 'ANALYSIS', color: 'cyan' },
    MVP_BUILDING: { label: 'SYNTHESIS', color: 'purple' },
    IDLE: { label: 'DORMANT', color: 'blue' }
  };

  const current = states[phase as keyof typeof states] || states.IDLE;

  return (
    <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-lg px-4 py-3">
            <div className="text-xs text-purple-400 font-mono mb-2">QUANTUM STATE</div>
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 bg-${current.color}-400 rounded-full animate-pulse`} />
                <div className="text-white font-mono text-sm">{current.label}</div>
            </div>
        </div>);

};