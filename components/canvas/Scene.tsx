'use client';

import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import CameraRig from '@/components/three/CameraRig';
import Logo3D from '@/components/three/Logo3D';
import LaptopMesh from '@/components/three/LaptopMesh';
import Particles from '@/components/three/Particles';

export default function Scene() {
  return (
    <>
      {/* ── Lighting ───────────────────────────────────── */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 2, 2]} intensity={2} color="#1a6bff" distance={12} />
      <pointLight position={[4, -2, -5]} intensity={1.5} color="#0040cc" distance={15} />

      {/* ── Environment (city HDRI for reflections) ────── */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {/* ── Scroll-driven camera ───────────────────────── */}
      <CameraRig />

      {/* ── Floating particles ────────────────────────── */}
      <Particles />

      {/* ── Hero 3D logo ──────────────────────────────── */}
      <Suspense fallback={null}>
        <Logo3D />
      </Suspense>

      {/* ── Laptop showcase 1 — Cafe project ──────────── */}
      {/* Positioned along flight path at z ≈ -7  */}
      <Suspense fallback={null}>
        <LaptopMesh
          texturePath="/cafe.webp"
          position={[0.6, -0.4, -8]}
          rotation={[0, -0.25, 0]}
        />
      </Suspense>

      {/* ── Laptop showcase 2 — Boutique project ─────── */}
      {/* Positioned along flight path at z ≈ -17 */}
      <Suspense fallback={null}>
        <LaptopMesh
          texturePath="/boutique.webp"
          position={[-0.6, 0.3, -18]}
          rotation={[0, 0.25, 0]}
        />
      </Suspense>

      {/* ── Ground plane (subtle reflection) ─────────── */}
      <mesh position={[0, -3.5, -10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 60]} />
        <meshPhysicalMaterial
          color="#050505"
          metalness={0.8}
          roughness={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
}
