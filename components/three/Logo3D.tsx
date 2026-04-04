'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * UPLOFT LOGO — clean flat-extruded mark
 * ----------------------------------------
 * Built with 5 pieces, all sharing depth D=0.22:
 *
 *      /\          ← cone arrowhead (4-sided pyramid, tip up)
 *      ||          ← stem (box)
 *   |      |       ← U left and right pillars
 *   |______|       ← U bottom bar
 *
 * Pieces are placed to TOUCH with no gaps:
 *   - Pillar tops at y = +0.85
 *   - Stem bottom at y = +0.85 (exact match)
 *   - Stem top at y = +0.85 + stemH = +1.42
 *   - Cone base (bottom) at y = +1.42 (exact match)
 *   - Cone tip at y = +1.42 + coneH = +1.97
 */
export default function Logo3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.28;
    }
  });

  const D         = 0.22;   // shared depth
  const pillarH   = 1.70;   // pillar height
  const pillarW   = 0.22;   // pillar width
  const pillarX   = 0.65;   // pillar center X offset
  const pillarCY  = 0.00;   // pillar center Y
  const pillarTop = pillarCY + pillarH / 2; // = +0.85

  const stemW     = 0.22;
  const stemH     = 0.57;
  const stemCY    = pillarTop + stemH / 2;  // = 0.85 + 0.285 = 1.135
  const stemTop   = pillarTop + stemH;      // = 1.42

  const coneH     = 0.55;
  const coneR     = 0.32;   // radius (wider than stem for arrowhead look)
  const coneCY    = stemTop + coneH / 2;    // = 1.42 + 0.275 = 1.695

  // Shared materials
  const pillarMat = { color: '#6677aa', metalness: 0.6, roughness: 0.3,
    emissive: '#0e1840', emissiveIntensity: 1.2 } as const;
  const blueMat   = { color: '#1a6bff', emissive: '#1a6bff' as string,
    emissiveIntensity: 1.5, roughness: 0.05 } as const;

  return (
    <group ref={groupRef} position={[0.8, 0.0, 5.2]} scale={0.58}>

      {/* ─── LEFT PILLAR ─── */}
      <mesh position={[-pillarX, pillarCY, 0]}>
        <boxGeometry args={[pillarW, pillarH, D]} />
        <meshStandardMaterial {...pillarMat} />
      </mesh>

      {/* ─── RIGHT PILLAR ─── */}
      <mesh position={[pillarX, pillarCY, 0]}>
        <boxGeometry args={[pillarW, pillarH, D]} />
        <meshStandardMaterial {...pillarMat} />
      </mesh>

      {/* ─── BOTTOM BAR ─── */}
      <mesh position={[0, -(pillarH / 2), 0]}>
        <boxGeometry args={[pillarX * 2 + pillarW, pillarW, D]} />
        <meshStandardMaterial {...blueMat} />
      </mesh>

      {/* ─── ARROW STEM ─── (starts exactly at pillar tops) */}
      <mesh position={[0, stemCY, 0]}>
        <boxGeometry args={[stemW, stemH, D]} />
        <meshStandardMaterial {...blueMat} />
      </mesh>

      {/* ─── ARROW HEAD ─── (4-sided pyramid, base starts exactly at stem top) */}
      <mesh position={[0, coneCY, 0]}>
        {/* ConeGeometry(radius, height, radialSegments) — 4 segments = square/diamond cross-section */}
        <coneGeometry args={[coneR, coneH, 4]} />
        <meshStandardMaterial {...blueMat} />
      </mesh>

    </group>
  );
}
