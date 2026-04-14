'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * UPLOFT LOGO — premium 3D mark
 * ─────────────────────────────
 *  ▲  arrowhead (4-sided pyramid)
 *  ║  arrow stem  — glowing blue fresnel shader
 *  U  two pillars + bottom bar — dark steel with chamfered tops
 *
 * Improvements:
 *  • Fresnel/rim-glow ShaderMaterial on arrow (blue core → white rim glow)
 *  • Chamfered pillar tops: thin wide cap gives machined-part bevel illusion
 *  • Wider U (pillarX 0.80) for traditional share-icon proportions
 *  • Arrow group bobs upward via Math.sin — reinforces "uploft" concept
 */

// ── Fresnel glow material — arrow (bright blue core, light-blue rim) ────────
const fresnelArrowMat = new THREE.ShaderMaterial({
  uniforms: {
    uCoreColor: { value: new THREE.Color('#1a6bff') },
    uRimColor:  { value: new THREE.Color('#b0d4ff') },
    uRimPower:  { value: 2.6 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vNormal  = normalize(normalMatrix * normal);
      vViewDir = normalize(cameraPosition - worldPos.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3  uCoreColor;
    uniform vec3  uRimColor;
    uniform float uRimPower;
    varying vec3  vNormal;
    varying vec3  vViewDir;
    void main() {
      float rim     = 1.0 - max(dot(vNormal, vViewDir), 0.0);
      float fresnel = pow(rim, uRimPower);
      vec3  color   = mix(uCoreColor, uRimColor, fresnel);
      gl_FragColor  = vec4(color, 1.0);
    }
  `,
});

// ── Dark steel material — U frame (deep navy core, steel-blue rim) ──────────
const steelMat = new THREE.ShaderMaterial({
  uniforms: {
    uBaseColor: { value: new THREE.Color('#151d55') },
    uRimColor:  { value: new THREE.Color('#3d5faa') },
    uRimPower:  { value: 3.5 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vNormal  = normalize(normalMatrix * normal);
      vViewDir = normalize(cameraPosition - worldPos.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3  uBaseColor;
    uniform vec3  uRimColor;
    uniform float uRimPower;
    varying vec3  vNormal;
    varying vec3  vViewDir;
    void main() {
      float rim     = 1.0 - max(dot(vNormal, vViewDir), 0.0);
      float fresnel = pow(rim, uRimPower);
      vec3  color   = mix(uBaseColor, uRimColor, fresnel * 0.75);
      gl_FragColor  = vec4(color, 1.0);
    }
  `,
});

export default function Logo3D() {
  const groupRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Group>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.28;
    }
    if (arrowRef.current) {
      // Gentle upward bob — reinforces the "uploft" concept
      arrowRef.current.position.y = Math.sin(clock.elapsedTime * 1.6) * 0.055;
    }
  });

  // ── Geometry constants ────────────────────────────────────────────────────
  const D         = 0.22;
  const pillarH   = 1.50;
  const pillarW   = 0.22;
  const pillarX   = 0.80;   // wider U — matches share-icon proportions
  const pillarCY  = 0.00;
  const pillarTop = pillarCY + pillarH / 2;   // +0.75
  const pillarBot = pillarCY - pillarH / 2;   // -0.75
  const barCY     = pillarBot;

  // Chamfer caps: thin slab slightly wider than pillar → subtle bevel illusion
  const chamferH = 0.04;
  const chamferW = pillarW + 0.07;

  // Arrow stem — runs from bottom bar flush, up through the U opening
  const stemW      = 0.28;
  const stemBottom = barCY;
  const stemAbove  = 0.22;
  const stemTop    = pillarTop + stemAbove;
  const stemH      = stemTop - stemBottom;
  const stemCY     = stemBottom + stemH / 2;

  // Arrowhead
  const coneH  = 0.42;
  const coneR  = 0.28;
  const coneCY = stemTop + coneH / 2;

  return (
    <group ref={groupRef} position={isMobile ? [0, -0.3, 5.2] : [0.8, 0.0, 5.2]} scale={isMobile ? 0.44 : 0.58}>

      {/* ── U FRAME ────────────────────────────────────────────────────── */}

      {/* Left pillar */}
      <mesh position={[-pillarX, pillarCY, 0]}>
        <boxGeometry args={[pillarW, pillarH, D]} />
        <primitive object={steelMat} attach="material" />
      </mesh>
      {/* Left pillar chamfer cap */}
      <mesh position={[-pillarX, pillarTop + chamferH / 2, 0]}>
        <boxGeometry args={[chamferW, chamferH, D + 0.02]} />
        <primitive object={steelMat} attach="material" />
      </mesh>

      {/* Right pillar */}
      <mesh position={[pillarX, pillarCY, 0]}>
        <boxGeometry args={[pillarW, pillarH, D]} />
        <primitive object={steelMat} attach="material" />
      </mesh>
      {/* Right pillar chamfer cap */}
      <mesh position={[pillarX, pillarTop + chamferH / 2, 0]}>
        <boxGeometry args={[chamferW, chamferH, D + 0.02]} />
        <primitive object={steelMat} attach="material" />
      </mesh>

      {/* Bottom bar */}
      <mesh position={[0, barCY, 0]}>
        <boxGeometry args={[pillarX * 2 + pillarW, pillarW, D]} />
        <primitive object={steelMat} attach="material" />
      </mesh>

      {/* ── ARROW — bobs independently via arrowRef ────────────────────── */}
      <group ref={arrowRef}>

        {/* Stem */}
        <mesh position={[0, stemCY, 0]}>
          <boxGeometry args={[stemW, stemH, D]} />
          <primitive object={fresnelArrowMat} attach="material" />
        </mesh>

        {/* Arrowhead (4-sided pyramid) */}
        <mesh position={[0, coneCY, 0]}>
          <coneGeometry args={[coneR, coneH, 4]} />
          <primitive object={fresnelArrowMat} attach="material" />
        </mesh>

      </group>

    </group>
  );
}
