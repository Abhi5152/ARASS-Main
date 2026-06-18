import Image from 'next/image';
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';

const caseStudies = [
  {
    title: 'Azure Haven Resort',
    category: 'Hospitality',
    tech: 'Next.js • Tailwind • Sanity',
    color: '#00c6ff',
  },
  {
    title: 'Legal Nexus AI',
    category: 'SaaS',
    tech: 'React • Node.js • OpenAI',
    color: '#8b5cf6',
  },
  {
    title: 'Elevate Commerce',
    category: 'E-Commerce',
    tech: 'Shopify Plus • React • Stripe',
    color: '#10b981',
  },
];

export default function ScrollDevice() {
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const scrollTarget = useRef(0);

  useFrame((state) => {
    if (!group.current) return;
    
    // Calculate native scroll offset (0 to 1) based on the first 300vh of the page.
    // The container is 400vh tall, so scrolling down 300vh takes us to the end of the 3D scene.
    const scrollMax = typeof window !== 'undefined' ? window.innerHeight * 3 : 1;
    const currentScroll = typeof window !== 'undefined' ? window.scrollY : 0;
    
    // Smooth the scroll target for buttery animations
    scrollTarget.current = THREE.MathUtils.lerp(
      scrollTarget.current,
      Math.min(Math.max(currentScroll / scrollMax, 0), 1),
      0.05
    );
    
    const r1 = scrollTarget.current;
    
    // Animate rotation based on scroll
    // Start slightly angled, rotate to flat facing the user, then angle away
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.2 + r1 * 0.4, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.5 + r1 * 1.0, 0.1);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -0.1 + r1 * 0.2, 0.1);
    
    // Animate position slightly up and down
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(r1 * Math.PI * 2) * 0.5, 0.1);

    // Update screen content based on scroll progress
    if (screenRef.current) {
      const activeIndex = Math.min(
        Math.floor(r1 * caseStudies.length),
        caseStudies.length - 1
      );
      
      const sections = screenRef.current.children;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        if (i === activeIndex) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0) scale(1)';
        } else {
          section.style.opacity = '0';
          section.style.transform = i < activeIndex ? 'translateY(-20px) scale(0.95)' : 'translateY(20px) scale(0.95)';
        }
      }
    }
  });
  // Premium sleek silver/space-gray aluminum material
  const bodyColor = '#a1a4a8';
  const darkAccent = '#898c90';

  // Memoize geometries and materials for repeated elements to save memory and reduce draw call overhead
  const { keyGeometry, keyMaterial, holeGeometry, holeMaterial } = useMemo(() => {
    return {
      keyGeometry: new THREE.PlaneGeometry(0.2, 0.22),
      keyMaterial: new THREE.MeshStandardMaterial({
        color: '#14171f',
        roughness: 0.7,
        metalness: 0.1,
      }),
      holeGeometry: new THREE.PlaneGeometry(0.12, 0.04),
      holeMaterial: new THREE.MeshBasicMaterial({ color: '#080a10' }),
    };
  }, []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      
      {/* ══════════ LAPTOP BASE (Tapered wedge shape) ══════════ */}
      {/* Main body - front thinner, back thicker like a real MacBook */}
      <group position={[0, -1.42, 0.2]}>
        {/* Top plate */}
        <RoundedBox args={[4.2, 0.03, 2.8]} radius={0.015} smoothness={2} position={[0, 0.015, 0]}>
          <meshPhysicalMaterial 
            color={bodyColor} 
            roughness={0.25} 
            metalness={0.95} 
            clearcoat={0.3}
            clearcoatRoughness={0.2}
            envMapIntensity={2}
          />
        </RoundedBox>
        {/* Bottom plate (slightly darker) */}
        <RoundedBox args={[4.15, 0.03, 2.75]} radius={0.015} smoothness={2} position={[0, -0.015, 0]}>
          <meshPhysicalMaterial 
            color={darkAccent} 
            roughness={0.35} 
            metalness={0.9} 
            clearcoat={0.2}
            clearcoatRoughness={0.3}
            envMapIntensity={1.5}
          />
        </RoundedBox>
        {/* Rubber feet - 4 corners */}
        {[[-1.6, -0.04, -1.0], [1.6, -0.04, -1.0], [-1.6, -0.04, 1.0], [1.6, -0.04, 1.0]].map((pos, i) => (
          <mesh key={`foot-${i}`} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            <meshStandardMaterial color="#111" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* ══════════ KEYBOARD AREA ══════════ */}
      <group position={[0, -1.38, -0.1]}>
        {/* Keyboard recess */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.6, 1.6]} />
          <meshStandardMaterial color="#0a0d14" roughness={0.95} />
        </mesh>
        
        {/* Individual key rows for realism */}
        {[...Array(5)].map((_, row) => (
          <group key={`row-${row}`} position={[0, 0.005, -0.55 + row * 0.28]}>
            {[...Array(14)].map((_, col) => (
              <mesh 
                key={`key-${row}-${col}`} 
                position={[-1.6 + col * 0.235, 0, 0]} 
                rotation={[-Math.PI / 2, 0, 0]}
                geometry={keyGeometry}
                material={keyMaterial}
              />
            ))}
          </group>
        ))}
        
        {/* Space bar */}
        <mesh position={[0, 0.005, 0.85]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 0.22]} />
          <meshPhysicalMaterial color="#14171f" roughness={0.7} metalness={0.1} clearcoat={0.1} />
        </mesh>
      </group>

      {/* ══════════ TRACKPAD ══════════ */}
      <mesh position={[0, -1.385, 1.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.0]} />
        <meshPhysicalMaterial 
          color="#a1a4a8" 
          roughness={0.1} 
          metalness={0.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* ══════════ SPEAKER GRILLES (left & right of keyboard) ══════════ */}
      {[-1, 1].map((side) => (
        <group key={`speaker-${side}`} position={[side * 1.9, -1.38, 0.2]}>
          {[...Array(8)].map((_, i) => (
            <mesh 
              key={`hole-${i}`} 
              position={[0, 0, -0.8 + i * 0.23]} 
              rotation={[-Math.PI / 2, 0, 0]}
              geometry={holeGeometry}
              material={holeMaterial}
            />
          ))}
        </group>
      ))}

      {/* ══════════ HINGE ══════════ */}
      <mesh position={[0, -1.42, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 4.0, 16]} />
        <meshPhysicalMaterial 
          color="#383d4e" 
          roughness={0.2} 
          metalness={0.95}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* ══════════ SCREEN LID ══════════ */}
      <group position={[0, -1.4, -1.2]} rotation={[0.1, 0, 0]}>
        {/* Outer lid shell */}
        <RoundedBox args={[4.2, 2.85, 0.04]} radius={0.02} smoothness={2} position={[0, 1.42, 0]}>
          <meshPhysicalMaterial 
            color={bodyColor} 
            roughness={0.25} 
            metalness={0.95} 
            clearcoat={0.4}
            clearcoatRoughness={0.15}
            envMapIntensity={2.5}
          />
        </RoundedBox>
        
        {/* Screen Bezel - ultra thin like modern MacBook */}
        <mesh position={[0, 1.42, 0.021]}>
          <planeGeometry args={[4.16, 2.81]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Camera notch at top center */}
        <mesh position={[0, 2.8, 0.022]}>
          <planeGeometry args={[0.4, 0.06]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
        {/* Camera lens dot */}
        <mesh position={[0, 2.8, 0.023]}>
          <circleGeometry args={[0.015, 16]} />
          <meshBasicMaterial color="#1a1a2e" />
        </mesh>
        {/* Camera indicator light */}
        <mesh position={[0.06, 2.8, 0.023]}>
          <circleGeometry args={[0.008, 8]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>

        {/* Screen glass reflection layer */}
        <mesh position={[0, 1.42, 0.0215]}>
          <planeGeometry args={[4.14, 2.79]} />
          <meshPhysicalMaterial 
            color="#000000"
            transparent
            opacity={0.08}
            roughness={0}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={3}
          />
        </mesh>

        {/* Screen Content (Html overlay) */}
        <Html
          transform
          wrapperClass="htmlScreen"
          distanceFactor={1.5}
          position={[0, 1.42, 0.022]}
          zIndexRange={[100, 0]}
        >
          <div 
            className="w-[1024px] h-[640px] bg-[#050914] rounded-sm overflow-hidden relative"
            style={{ 
              boxShadow: 'inset 0 0 80px rgba(0,0,0,0.95)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            {/* Top Browser Bar */}
            <div className="h-10 bg-[rgba(255,255,255,0.03)] w-full flex items-center px-4 gap-2 border-b border-white/5 relative z-20">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="ml-4 flex-1 h-6 bg-[rgba(0,0,0,0.3)] rounded-md flex items-center justify-center border border-white/5">
                <span className="text-[10px] text-gray-500 font-mono tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-[10px]">lock</span> arass.tech/portfolio
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full h-[600px] relative bg-[#050914] overflow-hidden">
              <Image 
                src="/images/screen-image-v4.png" 
                alt="Screen Content" 
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
