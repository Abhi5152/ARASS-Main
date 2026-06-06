'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/store/useAppStore';

export default function ARASS3DModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { isLoading, activeSection } = useAppStore();
  const { viewport, mouse } = useThree();

  // If you have a .glb file, place it in public/arass-model.glb and uncomment this line:
  // const { scene } = useGLTF('/arass-model.glb');
  
  // Create a beautiful material for the 3D text (metallic / glass hybrid)
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x00c6ff,
      emissive: 0x007bff,
      emissiveIntensity: 0.25,
      roughness: 0.05,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.98,
      transmission: 0.7,
      thickness: 1.2,
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Target calculations
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    if (isLoading) {
      // 1. Loading Animation Phase
      targetZ = 2; // Closer to camera
      targetY = 0.5; // Slightly up to leave room for loading bar
      targetScale = viewport.width < 5 ? 0.6 : 1.2;
      targetRotationY = state.clock.elapsedTime * 2.0; // Fast rotation
    } else {
      // 2. Hero Section (Main Use)
      if (activeSection === 'hero' || scrollY < window.innerHeight / 2) {
        // Centered alignment
        targetX = 0;
        // Position it at the top area, shifted slightly up
        targetY = viewport.height * 0.15; 
        targetScale = viewport.width < 5 ? 0.6 : 1.0;
        
        // Mouse parallax
        targetRotationY = (mouse.x * 0.3) + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        targetRotationX = -(mouse.y * 0.3);
      } 
      // 3. Scroll Transition / Section Divider
      else {
        // As user scrolls, it moves, scales down, fades (faded version between sections)
        targetX = 0;
        targetY = 0; // Center behind content
        targetScale = 0.4; // Smaller
        
        // Continuous slow rotation in background
        targetRotationY = state.clock.elapsedTime * 0.2;
        targetRotationX = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      }
    }

    // Apply smooth transitions
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 3);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 3);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 3);
    
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 3)
    );

    // Only apply rotation lerp if not freely spinning
    if (isLoading) {
      groupRef.current.rotation.y = targetRotationY;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, delta * 2);
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 3);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, delta * 3);
    }
    
    // Opacity fade for background transition
    if (meshRef.current) {
      const targetOpacity = isLoading ? 1 : (activeSection === 'hero' || scrollY < window.innerHeight / 2) ? 0.95 : 0.1;
      (meshRef.current.material as THREE.MeshPhysicalMaterial).opacity = THREE.MathUtils.lerp(
        (meshRef.current.material as THREE.MeshPhysicalMaterial).opacity,
        targetOpacity,
        delta * 2
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Center>
          {/* Fallback 3D Text since .glb isn't available yet */}
          <Text3D
            ref={meshRef}
            font="https://unpkg.com/three@0.149.0/examples/fonts/helvetiker_bold.typeface.json"
            size={1}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.05}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            material={material}
          >
            ARASS
          </Text3D>
          
          {/* 
            // Once you have the .glb file in public/, replace the Text3D above with:
            // <primitive object={scene} /> 
          */}
        </Center>
      </Float>
      
      {/* Bright lights for elegant reflections */}
      <pointLight position={[0, 0, 5]} intensity={2.5} color="#ffffff" distance={15} />
      <pointLight position={[3, 2, 2]} intensity={3} color="#00c6ff" distance={10} />
      <pointLight position={[-3, -2, -2]} intensity={1.5} color="#007bff" distance={10} />
    </group>
  );
}
