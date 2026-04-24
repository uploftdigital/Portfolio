'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from '@/components/canvas/Scene';

export default function WebGLCanvas() {
  const [key, setKey] = useState(0);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle WebGL context loss — remount the entire Canvas to recover
    const handleContextLost = () => {
      console.warn('[WebGL] Context lost — remounting canvas');
      setTimeout(() => setKey((k) => k + 1), 300);
    };

    // Also remount on visibility change (tab switch, phone sleep)
    // which is the most common cause of blank canvas on mobile/Vercel
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setKey((k) => k + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const canvas = canvasWrapRef.current?.querySelector('canvas');
    canvas?.addEventListener('webglcontextlost', handleContextLost);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      canvas?.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, [key]); // re-attach after every remount

  return (
    <div
      ref={canvasWrapRef}
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
        key={key}
        camera={{ position: [0, 0.3, 8], fov: 55, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          // Preserve drawing buffer prevents blank flash on some mobile browsers
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        shadows={false}   // disable shadows — common cause of context loss on low-end GPUs
        dpr={[1, 1.5]}
        frameloop="always"
        onCreated={({ gl }) => {
          // Explicitly handle context loss at the renderer level
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault(); // allows context to be restored
          });
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
