'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function ScrollDevice() {
  const group = useRef<THREE.Group>(null);
  const scrollTarget = useRef(0);
  const screenTexture = useTexture('/images/screen-image-v4.webp');
  screenTexture.colorSpace = THREE.SRGBColorSpace;

  // Memoize ALL shared geometries and materials once
  const shared = useMemo(() => {
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#a1a4a8', roughness: 0.3, metalness: 0.7 });
    const darkMat = new THREE.MeshStandardMaterial({ color: '#898c90', roughness: 0.4, metalness: 0.6 });
    const keyboardMat = new THREE.MeshBasicMaterial({ color: '#0a0d14' });
    const keyMat = new THREE.MeshBasicMaterial({ color: '#14171f' });
    const keyGeo = new THREE.PlaneGeometry(0.2, 0.22);
    const holeMat = new THREE.MeshBasicMaterial({ color: '#080a10' });
    const holeGeo = new THREE.PlaneGeometry(0.12, 0.04);
    const footGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.02, 8);
    const footMat = new THREE.MeshBasicMaterial({ color: '#111111' });
    const hingeMat = new THREE.MeshStandardMaterial({ color: '#383d4e', roughness: 0.3, metalness: 0.7 });
    const trackpadMat = new THREE.MeshStandardMaterial({ color: '#a1a4a8', roughness: 0.2, metalness: 0.5 });
    const spacebarMat = keyMat;
    return { bodyMat, darkMat, keyboardMat, keyMat, keyGeo, holeMat, holeGeo, footGeo, footMat, hingeMat, trackpadMat, spacebarMat };
  }, []);

  useFrame(() => {
    if (!group.current) return;
    
    const scrollMax = typeof window !== 'undefined' ? window.innerHeight * 3 : 1;
    const currentScroll = typeof window !== 'undefined' ? window.scrollY : 0;
    
    scrollTarget.current = THREE.MathUtils.lerp(
      scrollTarget.current,
      Math.min(Math.max(currentScroll / scrollMax, 0), 1),
      0.05
    );
    
    const r1 = scrollTarget.current;
    
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.2 + r1 * 0.4, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.5 + r1 * 1.0, 0.1);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -0.1 + r1 * 0.2, 0.1);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(r1 * Math.PI * 2) * 0.5, 0.1);
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      
      {/* ══════════ LAPTOP BASE ══════════ */}
      <group position={[0, -1.42, 0.2]}>
        {/* Top plate */}
        <RoundedBox args={[4.2, 0.03, 2.8]} radius={0.015} smoothness={2} position={[0, 0.015, 0]} material={shared.bodyMat} />
        {/* Bottom plate */}
        <RoundedBox args={[4.15, 0.03, 2.75]} radius={0.015} smoothness={2} position={[0, -0.015, 0]} material={shared.darkMat} />
        {/* Rubber feet - 4 corners */}
        {[[-1.6, -0.04, -1.0], [1.6, -0.04, -1.0], [-1.6, -0.04, 1.0], [1.6, -0.04, 1.0]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} geometry={shared.footGeo} material={shared.footMat} />
        ))}
      </group>

      {/* ══════════ KEYBOARD AREA ══════════ */}
      <group position={[0, -1.38, -0.1]}>
        {/* Keyboard recess */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.6, 1.6]} />
          <meshBasicMaterial color="#0a0d14" />
        </mesh>
        
        {/* Individual key rows - using shared geometry and material */}
        {[...Array(5)].map((_, row) => (
          <group key={row} position={[0, 0.005, -0.55 + row * 0.28]}>
            {[...Array(14)].map((_, col) => (
              <mesh 
                key={col} 
                position={[-1.6 + col * 0.235, 0, 0]} 
                rotation={[-Math.PI / 2, 0, 0]}
                geometry={shared.keyGeo}
                material={shared.keyMat}
              />
            ))}
          </group>
        ))}
        
        {/* Space bar */}
        <mesh position={[0, 0.005, 0.85]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 0.22]} />
          <meshBasicMaterial color="#14171f" />
        </mesh>
      </group>

      {/* ══════════ TRACKPAD ══════════ */}
      <mesh position={[0, -1.385, 1.1]} rotation={[-Math.PI / 2, 0, 0]} material={shared.trackpadMat}>
        <planeGeometry args={[1.6, 1.0]} />
      </mesh>

      {/* ══════════ SPEAKER GRILLES ══════════ */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.9, -1.38, 0.2]}>
          {[...Array(8)].map((_, i) => (
            <mesh 
              key={i} 
              position={[0, 0, -0.8 + i * 0.23]} 
              rotation={[-Math.PI / 2, 0, 0]}
              geometry={shared.holeGeo}
              material={shared.holeMat}
            />
          ))}
        </group>
      ))}

      {/* ══════════ HINGE ══════════ */}
      <mesh position={[0, -1.42, -1.2]} rotation={[0, 0, Math.PI / 2]} material={shared.hingeMat}>
        <cylinderGeometry args={[0.04, 0.04, 4.0, 12]} />
      </mesh>

      {/* ══════════ SCREEN LID ══════════ */}
      <group position={[0, -1.4, -1.2]} rotation={[0.1, 0, 0]}>
        {/* Outer lid shell */}
        <RoundedBox args={[4.2, 2.85, 0.04]} radius={0.02} smoothness={2} position={[0, 1.42, 0]} material={shared.bodyMat} />
        
        {/* Screen Bezel */}
        <mesh position={[0, 1.42, 0.021]}>
          <planeGeometry args={[4.16, 2.81]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Camera notch */}
        <mesh position={[0, 2.8, 0.022]}>
          <planeGeometry args={[0.4, 0.06]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
        {/* Camera lens dot */}
        <mesh position={[0, 2.8, 0.023]}>
          <circleGeometry args={[0.015, 8]} />
          <meshBasicMaterial color="#1a1a2e" />
        </mesh>
        {/* Camera indicator light */}
        <mesh position={[0.06, 2.8, 0.023]}>
          <circleGeometry args={[0.008, 6]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>

        {/* Screen Content (WebGL Texture - includes browser chrome in the image) */}
        <mesh position={[0, 1.42, 0.0211]}>
          <planeGeometry args={[4.14, 2.79]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>

        {/* Glass reflection overlay for premium look */}
        <mesh position={[0, 1.42, 0.0215]}>
          <planeGeometry args={[4.14, 2.79]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
        </mesh>
      </group>
    </group>
  );
}
