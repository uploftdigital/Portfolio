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

  // Responsive FOV — wider on mobile so logo fits
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

    // Simple linear camera travel — correct by design:
    //   p=0.00: z= 8   (logo in frame)
    //   p=0.33: z=-2   (entering project 1, laptop 1 at z=-8 is 6 units ahead, fog fades it in)
    //   p=0.50: z=-7   (mid project 1 — camera 1 unit in front of laptop 1 at z=-8 ✓)
    //   p=0.53: z=-7.9 (camera PASSES laptop 1 — it moves behind camera, fully clipped)
    //   p=0.67: z=-12  (entering project 2 — laptop 1 is 4 units BEHIND camera, gone ✓)
    //   p=0.83: z=-17  (mid project 2 — camera 1 unit in front of laptop 2 at z=-18 ✓)
    //   p=0.87: z=-18.1(camera PASSES laptop 2)
    //   p=1.00: z=-22  (end)
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
