'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface LaptopMeshProps {
  texturePath: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}

function LaptopInner({ texturePath, position, rotation = [0, 0, 0] }: LaptopMeshProps) {
  const screenTexture = useTexture(texturePath);
  const groupRef = useRef<THREE.Group>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      screenTexture.dispose();
    };
  }, [screenTexture]);

  return (
    <group ref={groupRef} position={position} rotation={new THREE.Euler(...rotation)}>
      {/* ── Base / keyboard deck ─────────────────────── */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[3.0, 0.09, 2.0]} />
        <meshPhysicalMaterial color="#1c1c1e" metalness={0.95} roughness={0.06} />
      </mesh>

      {/* ── Trackpad ─────────────────────────────────── */}
      <mesh position={[0, 0.05, 0.38]}>
        <boxGeometry args={[0.75, 0.006, 0.48]} />
        <meshPhysicalMaterial color="#2a2a2c" metalness={0.55} roughness={0.35} />
      </mesh>

      {/* ── Apple-style logo on lid back ─────────────── */}
      <mesh position={[0, 0.05, -0.5]}>
        <circleGeometry args={[0.14, 32]} />
        <meshPhysicalMaterial color="#3a3a3c" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* ── Screen bezel (hinged at back edge, ~110° open) */}
      <group position={[0, 0.045, -1.0]} rotation={[-Math.PI * 0.58, 0, 0]}>
        {/* Outer bezel */}
        <mesh castShadow>
          <boxGeometry args={[3.0, 2.0, 0.065]} />
          <meshPhysicalMaterial color="#1c1c1e" metalness={0.95} roughness={0.06} />
        </mesh>

        {/* ── Screen display surface ────────────────── */}
        <mesh position={[0, 0, 0.036]}>
          <planeGeometry args={[2.76, 1.76]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>

        {/* Thin screen frame highlight */}
        <mesh position={[0, 0, 0.034]}>
          <ringGeometry args={[1.37, 1.51, 4]} />
          <meshBasicMaterial color="#111111" transparent opacity={0.0} />
        </mesh>
      </group>
    </group>
  );
}

export default function LaptopMesh(props: LaptopMeshProps) {
  return (
    <Suspense fallback={null}>
      <LaptopInner {...props} />
    </Suspense>
  );
}
