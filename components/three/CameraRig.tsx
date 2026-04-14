'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { scrollData } from '@/lib/scrollStore';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CameraRig() {
  const { camera, gl } = useThree();
  const z = useRef(8);
  const y = useRef(0.5);

  // Adjust FOV responsively so the logo fits on narrow screens
  useEffect(() => {
    const updateFov = () => {
      const isMobile = gl.domElement.clientWidth < 768;
      (camera as any).fov = isMobile ? 72 : 55;
      (camera as any).updateProjectionMatrix();
    };
    updateFov();
    window.addEventListener('resize', updateFov);
    return () => window.removeEventListener('resize', updateFov);
  }, [camera, gl]);

  useFrame((_, delta) => {
    const p = scrollData.progress;
    const tz = lerp(8, -22, p);
    const ty = lerp(0.5, -0.2, p);

    const s = 1 - Math.pow(0.015, delta);
    z.current = lerp(z.current, tz, s);
    y.current = lerp(y.current, ty, s);

    camera.position.set(0, y.current, z.current);
    camera.lookAt(0, y.current - 0.15, z.current - 1);
  });

  return null;
}
