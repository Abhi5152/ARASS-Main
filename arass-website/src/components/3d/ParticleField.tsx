/* eslint-disable react-hooks/purity */
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Blue
        colors[i3] = 0.0;
        colors[i3 + 1] = 0.48;
        colors[i3 + 2] = 1.0;
      } else if (colorChoice < 0.7) {
        // Cyan
        colors[i3] = 0.0;
        colors[i3 + 1] = 0.78;
        colors[i3 + 2] = 1.0;
      } else {
        // Purple
        colors[i3] = 0.48;
        colors[i3 + 1] = 0.18;
        colors[i3 + 2] = 0.97;
      }
    }
    return { positions, velocities, colors };
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    mouseRef.current = { x: pointer.x, y: pointer.y };

    const posArr = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      posArr[i3] += velocities[i3] + Math.sin(time * 0.1 + i) * 0.001;
      posArr[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.15 + i) * 0.001;
      posArr[i3 + 2] += velocities[i3 + 2];

      // Mouse influence
      const dx = mouseRef.current.x * 10 - posArr[i3];
      const dy = mouseRef.current.y * 10 - posArr[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 5) {
        posArr[i3] -= dx * 0.001;
        posArr[i3 + 1] -= dy * 0.001;
      }

      // Wrap around
      if (Math.abs(posArr[i3]) > 15) posArr[i3] *= -0.9;
      if (Math.abs(posArr[i3 + 1]) > 15) posArr[i3 + 1] *= -0.9;
      if (Math.abs(posArr[i3 + 2]) > 10) posArr[i3 + 2] *= -0.9;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
