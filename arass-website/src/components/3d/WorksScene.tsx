'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import ScrollDevice from './ScrollDevice';
import ParticleField from './ParticleField';
import FloatingGrid from './FloatingGrid';


export default function WorksScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative z-0">
      {/* Background glow to ground the scene */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,198,255,0.05),transparent_70%)] pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        frameloop={isVisible ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" castShadow />
        <pointLight position={[-5, 5, 5]} intensity={2} color="#00c6ff" />
        <pointLight position={[5, -5, -5]} intensity={2} color="#7b2ff7" />
        
        <Suspense fallback={<Loader />}>
          <ParticleField count={300} />
          
          <group position={[0, -2, 0]}>
            <FloatingGrid />
          </group>
          
          <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
            <ScrollDevice />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

import { useProgress, Html } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <div className="text-white font-mono text-sm tracking-widest">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}
