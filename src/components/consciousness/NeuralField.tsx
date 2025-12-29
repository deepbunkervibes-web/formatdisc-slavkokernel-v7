import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralField = React.memo(({ phase, confidence = 0.0 }: { phase: string; confidence?: number }) => {
    const groupRef = useRef<THREE.Group>(null!);

    const layers = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 4; i++) {
            arr.push({
                z: -4 + i * 2.5,
                nodes: Array.from({ length: 18 }, () => ({
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 4,
                })),
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // 1. Base Rotation (modulated by confidence - higher confidence = steadier, slower rotation)
        // actually, let's make it more active with higher confidence (excitement)
        const rotationSpeed = 0.15 + (confidence * 0.2);
        groupRef.current.rotation.y = Math.sin(t * 0.2) * rotationSpeed;

        // 2. Heartbeat Pulse (Scale)
        // High confidence = Strong, steady pulse
        // Low confidence = Weak, erratic pulse (simulated by faster, smaller fluctuations if we wanted, but let's keep it simple)
        const pulseFrequency = 1 + (confidence * 2); // 1Hz to 3Hz
        const pulseAmplitude = 0.02 + (confidence * 0.05);
        const scale = 1 + Math.sin(t * pulseFrequency) * pulseAmplitude;
        groupRef.current.scale.set(scale, scale, scale);

        // Phase reactivity
        if (phase === 'EVALUATING') {
            groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
        }
    });

    const nodeColor = useMemo(() => {
        switch (phase) {
            case 'EVALUATING': return '#14F1D9'; // Cyan
            case 'MVP_BUILDING': return '#a855f7'; // Purple
            case 'RESULT': return '#fbbf24'; // Gold
            default: return '#38bdf8'; // Blue
        }
    }, [phase]);

    return (
        <Canvas camera={{ position: [0, 0, 14], fov: 55 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color={nodeColor} />
            <group ref={groupRef}>
                {layers.map((layer, i) => (
                    <group key={i} position={[0, 0, layer.z]}>
                        {layer.nodes.map((n, idx) => (
                            <mesh key={idx} position={[n.x, n.y, 0]}>
                                <sphereGeometry args={[0.15, 16, 16]} />
                                <meshStandardMaterial
                                    color={nodeColor}
                                    emissive={nodeColor}
                                    emissiveIntensity={0.8}
                                    transparent
                                    opacity={0.8}
                                />
                            </mesh>
                        ))}
                        {/* Simple connections within layer */}
                        {layer.nodes.map((n, idx) => {
                            if (idx % 2 === 0 && idx + 1 < layer.nodes.length) {
                                const next = layer.nodes[idx + 1];
                                return (
                                    <line key={`line-${idx}`}>
                                        <bufferGeometry attach="geometry" onUpdate={geo => {
                                            const points = [new THREE.Vector3(n.x, n.y, 0), new THREE.Vector3(next.x, next.y, 0)];
                                            geo.setFromPoints(points);
                                        }} />
                                        <lineBasicMaterial attach="material" color={nodeColor} transparent opacity={0.2} />
                                    </line>
                                )
                            }
                            return null;
                        })}
                    </group>
                ))}
            </group>
        </Canvas>
    );
});
