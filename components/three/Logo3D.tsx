'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Dark metallic material for the U pillars */
function DarkMetal() {
  return (
    <meshPhysicalMaterial
      color="#0a0a0a"
      metalness={0.95}
      roughness={0.08}
      reflectivity={1}
      envMapIntensity={2}
    />
  );
}

/** Electric blue glass material for accents */
function BlueMat() {
  return (
    <meshPhysicalMaterial
      color="#1a6bff"
      metalness={0.6}
      roughness={0.05}
      transmission={0.15}
      thickness={0.5}
      envMapIntensity={3}
    />
  );
}

/**
 * Geometric "U + rising arrow" mark — the visual identity of Uploft.
 * Slow continuous Y-axis rotation via useFrame.
 */
export default function Logo3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── Left pillar of the "U" ─────────────────────── */}
      <mesh position={[-1.05, 0, 0]} castShadow>
        <boxGeometry args={[0.32, 2.4, 0.32]} />
        <DarkMetal />
      </mesh>

      {/* ── Right pillar of the "U" ────────────────────── */}
      <mesh position={[1.05, 0, 0]} castShadow>
        <boxGeometry args={[0.32, 2.4, 0.32]} />
        <DarkMetal />
      </mesh>

      {/* ── Bottom connector (blue accent glass) ──────── */}
      <mesh position={[0, -1.04, 0]} castShadow>
        <boxGeometry args={[2.42, 0.32, 0.32]} />
        <BlueMat />
      </mesh>

      {/* ── Arrow stem ────────────────────────────────── */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <BlueMat />
      </mesh>

      {/* ── Arrow head left diagonal ─────────────────── */}
      <mesh position={[-0.32, 1.88, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.18, 0.52, 0.18]} />
        <BlueMat />
      </mesh>

      {/* ── Arrow head right diagonal ────────────────── */}
      <mesh position={[0.32, 1.88, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.18, 0.52, 0.18]} />
        <BlueMat />
      </mesh>
    </group>
  );
}
