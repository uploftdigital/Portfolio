'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface LaptopMeshProps {
  texturePath: string;
  position: [number, number, number];
  rotationY?: number;
}

function LaptopInner({ texturePath, position, rotationY = 0 }: LaptopMeshProps) {
  const tex = useTexture(texturePath);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    return () => { tex.dispose(); };
  }, [tex]);

  const baseW = 2.8;
  const baseD = 1.9;
  const baseH = 0.09;
  const lidW  = 2.8;
  const lidH  = 1.85;
  const lidD  = 0.08;

  /*
   * LAPTOP LID GEOMETRY — how it works:
   *
   * The hinge group sits at the BACK edge of the base:
   *   position = [0, baseH/2, -baseD/2]
   *
   * In the hinge group's LOCAL space, Y is "up along the lid".
   * rotation.x = 0  → lid is perfectly VERTICAL (standing up straight)
   * rotation.x = -20° → lid is slightly tilted back — natural open laptop
   *
   * The lid box extends from hinge upward: center at [0, lidH/2, 0].
   * Its +Z face points toward the viewer when the lid is near-vertical.
   * Screen texture goes on the +Z face: z = +lidD/2 + 0.002
   */
  const lidTiltAngle = THREE.MathUtils.degToRad(-20); // slight tilt back

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>

      {/* BASE DECK */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[baseW, baseH, baseD]} />
        <meshStandardMaterial color="#1e1e22" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* KEYBOARD AREA */}
      <mesh position={[0, baseH / 2 + 0.003, -0.08]}>
        <boxGeometry args={[baseW * 0.83, 0.005, baseD * 0.72]} />
        <meshStandardMaterial color="#161618" roughness={0.85} />
      </mesh>

      {/* TRACKPAD */}
      <mesh position={[0, baseH / 2 + 0.003, baseD * 0.3]}>
        <boxGeometry args={[0.8, 0.005, 0.52]} />
        <meshStandardMaterial color="#2c2c30" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* LID GROUP — pivots at back edge of base */}
      <group
        position={[0, baseH / 2, -baseD / 2]}
        rotation={[lidTiltAngle, 0, 0]}
      >
        {/* Lid shell */}
        <mesh position={[0, lidH / 2, 0]} castShadow>
          <boxGeometry args={[lidW, lidH, lidD]} />
          <meshStandardMaterial color="#1e1e22" metalness={0.9} roughness={0.15} />
        </mesh>

        {/*
         * SCREEN — on the +Z face (inner face facing viewer when lid is vertical).
         * Placed at z = lidD/2 + 0.003 so it sits just outside the lid box.
         * Slightly smaller than lid to show natural bezel border.
         */}
        <mesh position={[0, lidH / 2, lidD / 2 + 0.003]}>
          <planeGeometry args={[lidW * 0.88, lidH * 0.86]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>

      </group>

      {/* Subtle blue underglow */}
      <pointLight position={[0, -0.3, 0]} intensity={1.5} color="#1a6bff" distance={4} />

    </group>
  );
}

// Preload textures so they're cached before the component mounts.
// Prevents blank screens caused by CDN cold-start latency on Vercel.
useTexture.preload('/cafe.webp');
useTexture.preload('/boutique.webp');

export default function LaptopMesh(props: LaptopMeshProps) {
  return (
    <Suspense fallback={null}>
      <LaptopInner {...props} />
    </Suspense>
  );
}
