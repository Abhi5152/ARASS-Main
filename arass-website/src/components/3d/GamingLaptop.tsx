'use client';

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
    Object_7: THREE.Mesh
    Object_8: THREE.Mesh
    Object_9: THREE.Mesh
    Object_10: THREE.Mesh
    Object_11: THREE.Mesh
    Object_13: THREE.Mesh
    Object_14: THREE.Mesh
    Object_15: THREE.Mesh
    Object_16: THREE.Mesh
    Object_17: THREE.Mesh
    Object_18: THREE.Mesh
    Object_19: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.005']: THREE.MeshStandardMaterial
    ['Material.006']: THREE.MeshStandardMaterial
    ['Material.007']: THREE.MeshStandardMaterial
    ['Material.013']: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    ['Material.009']: THREE.MeshStandardMaterial
    ['Material.010']: THREE.MeshStandardMaterial
    ['Material.008']: THREE.MeshStandardMaterial
    ['Material.011']: THREE.MeshStandardMaterial
    ['Material.012']: THREE.MeshStandardMaterial
  }
}

export default function GamingLaptop(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const scrollTarget = useRef(0);
  const { nodes, materials } = useGLTF('/models/gaming_laptop.glb') as GLTFResult;
  
  const screenTexture = useTexture('/images/screen-image-v4.webp');
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  screenTexture.flipY = false;

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
    
    // Smooth scroll animations matching the previous ScrollDevice logic
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.2 + r1 * 0.4, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.5 + r1 * 1.0, 0.1);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -0.1 + r1 * 0.2, 0.1);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -1.0 + Math.sin(r1 * Math.PI * 2) * 0.5, 0.1);
  });

  return (
    <group ref={group} {...props} dispose={null} scale={2.5}>
      <group position={[-1.199, 0.096, 0]} rotation={[0, 0, -1.38]}>
        <mesh geometry={nodes.Object_4.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Object_5.geometry} material={materials['Material.002']} />
        <mesh geometry={nodes.Object_6.geometry} material={materials['Material.003']} />
        {/* Screen Mesh (Object_7 with Material.004 originally) mapped to our website texture */}
        <mesh geometry={nodes.Object_7.geometry}>
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>
        <mesh geometry={nodes.Object_8.geometry} material={materials['Material.005']} />
        <mesh geometry={nodes.Object_9.geometry} material={materials['Material.006']} />
        <mesh geometry={nodes.Object_10.geometry} material={materials['Material.007']} />
        <mesh geometry={nodes.Object_11.geometry} material={materials['Material.013']} />
      </group>
      <mesh geometry={nodes.Object_13.geometry} material={materials.Material} />
      <mesh geometry={nodes.Object_14.geometry} material={materials['Material.009']} />
      <mesh geometry={nodes.Object_15.geometry} material={materials['Material.009']} />
      <mesh geometry={nodes.Object_16.geometry} material={materials['Material.010']} />
      <mesh geometry={nodes.Object_17.geometry} material={materials['Material.008']} />
      <mesh geometry={nodes.Object_18.geometry} material={materials['Material.011']} />
      <mesh geometry={nodes.Object_19.geometry} material={materials['Material.012']} />
    </group>
  );
}

useGLTF.preload('/models/gaming_laptop.glb');
