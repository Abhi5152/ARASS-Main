'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 150 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i3] = 0.0; colors[i3 + 1] = 0.48; colors[i3 + 2] = 1.0;
      } else if (colorChoice < 0.7) {
        colors[i3] = 0.0; colors[i3 + 1] = 0.78; colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 0.48; colors[i3 + 1] = 0.18; colors[i3 + 2] = 0.97;
      }
    }
    return { positions, colors };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  // Simple rotation only - no per-particle CPU updates
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
