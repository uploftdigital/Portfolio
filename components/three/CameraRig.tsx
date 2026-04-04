'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { scrollData } from '@/lib/scrollStore';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CameraRig() {
  const { camera } = useThree();
  const z = useRef(8);
  const y = useRef(0.5);

  useFrame((_, delta) => {
    const p = scrollData.progress;
    // Hero: z=8 (logo at z=5.2 is 2.8 units ahead)
    // Laptop 1: z=-10 → camera needs to reach ~z=-8
    // Laptop 2: z=-20 → camera needs to reach ~z=-18
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
