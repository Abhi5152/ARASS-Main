'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralNode {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  connections: number[];
}

const NODES: NeuralNode[] = [
  { id: 'ai', label: 'AI Engine', position: [0, 0, 0], color: '#00c6ff', connections: [1, 2, 3, 4, 5] },
  { id: 'web', label: 'Web Dev', position: [2.5, 1.8, 0.5], color: '#007bff', connections: [0, 2, 5] },
  { id: 'mobile', label: 'Mobile', position: [-2.2, 1.5, -0.5], color: '#7b2ff7', connections: [0, 1, 3] },
  { id: 'cloud', label: 'Cloud', position: [-1.8, -1.8, 0.8], color: '#00ff88', connections: [0, 4] },
  { id: 'data', label: 'Data', position: [2.2, -1.5, -0.3], color: '#ff2d95', connections: [0, 3, 5] },
  { id: '3d', label: '3D/XR', position: [0, 2.5, -1], color: '#00c6ff', connections: [0, 1, 4] },
];

function NeuralNodeMesh({
  node,
  onHover,
  isHovered,
}: {
  node: NeuralNode;
  onHover: (id: string | null) => void;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = node.position[1] + Math.sin(t + node.position[0]) * 0.1;

    if (glowRef.current) {
      const scale = isHovered ? 1.8 + Math.sin(t * 3) * 0.2 : 1.2;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={node.position}>
      {/* Glow */}
      <Sphere ref={glowRef} args={[0.3, 16, 16]}>
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isHovered ? 0.15 : 0.06}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Core sphere */}
      <Sphere
        ref={meshRef}
        args={[isHovered ? 0.18 : 0.12, 32, 32]}
        onPointerEnter={() => onHover(node.id)}
        onPointerLeave={() => onHover(null)}
      >
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 2 : 0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>

      {/* Label */}
      {isHovered && (
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.15}
          color={node.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceGrotesk-Bold.ttf"
          outlineWidth={0.005}
          outlineColor="#000"
        >
          {node.label}
        </Text>
      )}
    </group>
  );
}

export default function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const connections = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    NODES.forEach((node) => {
      node.connections.forEach((targetIdx) => {
        if (targetIdx > NODES.indexOf(node)) {
          lines.push({
            start: node.position,
            end: NODES[targetIdx].position,
            color: node.color,
          });
        }
      });
    });
    return lines;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05 + pointer.x * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1 + pointer.y * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.start, conn.end]}
          color={conn.color}
          lineWidth={1}
          transparent
          opacity={0.2}
        />
      ))}

      {/* Nodes */}
      {NODES.map((node) => (
        <NeuralNodeMesh
          key={node.id}
          node={node}
          onHover={setHoveredNode}
          isHovered={hoveredNode === node.id}
        />
      ))}
    </group>
  );
}
