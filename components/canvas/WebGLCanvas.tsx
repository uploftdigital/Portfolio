'use client';

import { Canvas } from '@react-three/fiber';
import Scene from '@/components/canvas/Scene';

/**
 * Fixed full-viewport WebGL canvas that persists across all page sections.
 * Rendered behind all DOM content via z-index: -1.
 * Dynamically imported with ssr: false from page.tsx.
 */
export default function WebGLCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.3, 8], fov: 55, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: 4, // THREE.ACESFilmicToneMapping
          toneMappingExposure: 1.0,
        }}
        shadows
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: '#030303' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
