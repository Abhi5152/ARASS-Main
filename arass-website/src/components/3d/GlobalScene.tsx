'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Environment, PerformanceMonitor } from '@react-three/drei';
import ParticleField from './ParticleField';
import FloatingGrid from './FloatingGrid';
import ARASS3DModel from './ARASS3DModel';

export default function GlobalScene({ hideLogo = false }: { hideLogo?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />
          <ambientLight intensity={0.2} />
          <Environment preset="city" />
          
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#007bff" />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="#00c6ff" />
          <pointLight position={[0, 3, -5]} intensity={0.2} color="#7b2ff7" />
          
          {!hideLogo && <ARASS3DModel />}
          
          <ParticleField count={600} />
          
          <group position={[0, -2, 0]}>
            <FloatingGrid />
          </group>
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
