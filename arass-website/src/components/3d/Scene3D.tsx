'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import ParticleField from './ParticleField';
import FloatingGrid from './FloatingGrid';

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#007bff" />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="#00c6ff" />
          <pointLight position={[0, 3, -5]} intensity={0.2} color="#7b2ff7" />
          <ParticleField count={1500} />
          <FloatingGrid />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
