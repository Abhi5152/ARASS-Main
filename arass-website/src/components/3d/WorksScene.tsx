'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Preload } from '@react-three/drei';
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
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        {/* All lights are immediate - no external assets needed */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-5, 5, 5]} intensity={1.5} color="#00c6ff" />
        <pointLight position={[5, -3, -5]} intensity={1.0} color="#7b2ff7" />
        
        <Suspense fallback={null}>
          <ParticleField count={150} />
          
          <group position={[0, -2, 0]}>
            <FloatingGrid />
          </group>
          
          <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
            <ScrollDevice />
          </Float>
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
