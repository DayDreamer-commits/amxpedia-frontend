import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Edges } from '@react-three/drei';
import * as THREE from 'three';

export const ScrewModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Optional: slow auto-rotation for presentation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.PI / 4; // Tilt it so it's isometric
    }
  });

  // Stainless Steel Material
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: '#8c92ac',
    metalness: 0.8,
    roughness: 0.3,
  });

  const threadMaterial = new THREE.MeshStandardMaterial({
    color: '#7a8099',
    metalness: 0.8,
    roughness: 0.4,
  });

  // Dimensions for M8 x 20mm Socket Head Cap Screw
  const shaftRadius = 0.4;
  const shaftLength = 2.0;
  const headRadius = 0.65;
  const headHeight = 0.8;

  // Generate procedural threads (simple rings to simulate threads without a normal map)
  const threadRings = [];
  const numThreads = 15;
  const threadSpacing = shaftLength / numThreads;
  
  for (let i = 0; i < numThreads; i++) {
    threadRings.push(
      <Cylinder 
        key={i} 
        args={[shaftRadius + 0.05, shaftRadius, 0.05, 32]} 
        position={[0, -headHeight/2 - (i * threadSpacing) - 0.1, 0]}
        material={threadMaterial}
      />
    );
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
      
      {/* Screw Head */}
      <Cylinder args={[headRadius, headRadius, headHeight, 32]} position={[0, 0, 0]} material={steelMaterial}>
        {/* Subtle edges for definition */}
        <Edges scale={1} threshold={15} color="#475569" />
      </Cylinder>

      {/* Hex Socket (Faked with a dark hexagon on top) */}
      <Cylinder args={[0.3, 0.3, 0.4, 6]} position={[0, headHeight/2 - 0.19, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshBasicMaterial color="#1e293b" />
      </Cylinder>

      {/* Shaft (Unthreaded top part) */}
      <Cylinder args={[shaftRadius, shaftRadius, shaftLength, 32]} position={[0, -headHeight/2 - shaftLength/2, 0]} material={steelMaterial} />

      {/* Simulated Threads */}
      <group position={[0, 0, 0]}>
        {threadRings}
      </group>

      {/* Pointy tip at the end of the shaft */}
      <Cylinder args={[shaftRadius, 0.3, 0.2, 32]} position={[0, -headHeight/2 - shaftLength - 0.1, 0]} material={steelMaterial} />

    </group>
  );
};
