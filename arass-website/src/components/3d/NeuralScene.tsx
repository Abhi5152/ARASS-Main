'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import NeuralNetwork from './NeuralNetwork';

export default function NeuralScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#007bff" />
          <pointLight position={[-5, -5, 5]} intensity={0.3} color="#00c6ff" />
          <NeuralNetwork />
        </Suspense>
      </Canvas>
    </div>
  );
}
