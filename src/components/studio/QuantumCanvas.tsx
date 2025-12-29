import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useKernel } from "../../kernel/KernelProvider";
import { KernelBootPhase, kernelPhaseVisuals, PhaseVisuals } from "../../constants/kernelVisuals";
import { IdeaEvaluation } from "../../types";

interface QuantumCanvasProps {
    phase: KernelBootPhase;
    verdict?: IdeaEvaluation['verdict'] | null;
    sessionHash?: string;
    className?: string;
}

export const QuantumCanvas: React.FC<QuantumCanvasProps> = ({
    phase,
    verdict,
    sessionHash,
    className,
}) => {
    const { audit } = useKernel();

    // Fine-tuned visuals based on phase and verdict
    const visuals = useMemo(() => {
        const base = kernelPhaseVisuals[phase] || kernelPhaseVisuals.READY;

        // Override for result verdicts
        if (phase === 'RESULT' && verdict) {
            if (verdict === 'PROCEED') return { ...base, baseColor: "#FCD34D", accentColor: "#FBBF24", activityLevel: 0.4 };
            if (verdict === 'REVISE') return { ...base, baseColor: "#F59E0B", accentColor: "#D97706", activityLevel: 0.7 };
            if (verdict === 'REJECT') return { ...base, baseColor: "#EF4444", accentColor: "#B91C1C", activityLevel: 0.9 };
        }

        return base;
    }, [phase, verdict]);

    // Seed for determinism
    const seed = useMemo(() => {
        if (!sessionHash) return 42;
        // Map hash characters to a numeric seed
        return sessionHash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 42;
    }, [sessionHash]);

    return (
        <div className={className ?? "fixed inset-0 -z-10 bg-black pointer-events-none"}>
            <Canvas
                camera={{ position: [0, 0, 20], fov: 55 }}
                gl={{ antialias: true, alpha: true }}
            >
                <fog attach="fog" args={['black', 15, 35]} />
                <ambientLight intensity={0.2} />
                <pointLight position={[0, 0, 15]} intensity={1.5} color={visuals.accentColor} />
                <pointLight position={[-15, -15, -15]} intensity={0.5} color="#0f172a" />
                <QuantumField visuals={visuals} seed={seed} />
            </Canvas>

            {/* Audit Hash Stream Overlay */}
            <AuditHashOverlay sessionHash={sessionHash} />
        </div>
    );
};

interface QuantumFieldProps {
    visuals: PhaseVisuals;
    seed: number;
}

const QuantumField: React.FC<QuantumFieldProps> = ({ visuals, seed }) => {
    const groupRef = useRef<THREE.Group>(null!);

    const { positions, connections } = useMemo(() => {
        const rng = mulberry32(seed);
        const nodeCount = 50;
        const posArray: THREE.Vector3[] = [];
        const conArray: [number, number][] = [];

        // Generate positions
        for (let i = 0; i < nodeCount; i++) {
            const radius = 8 + rng() * 5;
            const phi = rng() * Math.PI * 2;
            const theta = rng() * Math.PI;
            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);
            posArray.push(new THREE.Vector3(x, y, z));
        }

        // Connections based on distance and density
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const d = posArray[i].distanceTo(posArray[j]);
                const threshold = THREE.MathUtils.lerp(7, 18, 1 - visuals.connectionDensity);
                if (d < threshold && rng() < visuals.connectionDensity) {
                    conArray.push([i, j]);
                }
            }
        }

        return { positions: posArray, connections: conArray };
    }, [seed, visuals.connectionDensity]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (!groupRef.current) return;

        // Slow rotation
        groupRef.current.rotation.y = t * 0.05;
        groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.08;
    });

    return (
        <group ref={groupRef}>
            {positions.map((pos, idx) => (
                <AnimatedNode
                    key={idx}
                    position={pos}
                    baseColor={visuals.baseColor}
                    activityLevel={visuals.activityLevel}
                    index={idx}
                />
            ))}
            <Lines
                positions={positions}
                connections={connections}
                color={visuals.accentColor}
                activityLevel={visuals.activityLevel}
            />
        </group>
    );
};

interface AnimatedNodeProps {
    position: THREE.Vector3;
    baseColor: string;
    activityLevel: number;
    index: number;
}

const AnimatedNode: React.FC<AnimatedNodeProps> = ({ position, baseColor, activityLevel, index }) => {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime() + index * 0.2;
        const pulse = 0.7 + Math.sin(t * (1.5 + activityLevel)) * 0.3 * (0.6 + activityLevel);
        meshRef.current.scale.setScalar(pulse);
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
                color={baseColor}
                emissive={baseColor}
                emissiveIntensity={0.8 + activityLevel}
                roughness={0.2}
                metalness={0.5}
            />
        </mesh>
    );
};

interface LinesProps {
    positions: THREE.Vector3[];
    connections: [number, number][];
    color: string;
    activityLevel: number;
}

const Lines: React.FC<LinesProps> = ({ positions, connections, color, activityLevel }) => {
    const lineRef = useRef<THREE.LineSegments>(null!);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const verts: number[] = [];
        connections.forEach(([i, j]) => {
            verts.push(positions[i].x, positions[i].y, positions[i].z, positions[j].x, positions[j].y, positions[j].z);
        });
        geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
        return geo;
    }, [positions, connections]);

    useFrame((state) => {
        if (!lineRef.current) return;
        const t = state.clock.getElapsedTime();
        const opacity = 0.2 + Math.abs(Math.sin(t * 0.8)) * 0.4 * (0.5 + activityLevel);
        (lineRef.current.material as THREE.LineBasicMaterial).opacity = opacity;
    });

    return (
        <lineSegments ref={lineRef} geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </lineSegments>
    );
};

const AuditHashOverlay = ({ sessionHash }: { sessionHash?: string }) => {
    const { audit } = useKernel();
    const visibleAudits = useMemo(() => audit.slice(-6).reverse(), [audit]);

    return (
        <div className="absolute bottom-8 left-8 space-y-2 pointer-events-none select-none">
            {visibleAudits.map((entry) => (
                <div key={entry.id} className="font-mono text-[9px] text-accent-cyan/40 flex gap-3 animate-in fade-in slide-in-from-left-2 duration-700">
                    <span className="opacity-30">[{new Date(entry.timestamp).toLocaleTimeString()}]</span>
                    <span className="tracking-tighter">{entry.hash.substring(0, 24)}...</span>
                </div>
            ))}
            {sessionHash && (
                <div className="pt-4 mt-4 border-t border-white/5 opacity-50">
                    <p className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest leading-none">
                        SEAL_DNA // {sessionHash.substring(0, 32)}
                    </p>
                </div>
            )}
        </div>
    );
};

function mulberry32(a: number) {
    return function () {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
