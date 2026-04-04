'use client';

import { Canvas } from '@react-three/fiber';
import Scene from '@/components/canvas/Scene';

export default function WebGLCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#030303',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.3, 8], fov: 55, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        shadows
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
