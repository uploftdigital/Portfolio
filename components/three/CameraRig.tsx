'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { scrollData } from '@/lib/scrollStore';

/** Linear interpolation */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * CameraRig reads scroll progress from the module store (updated by Lenis)
 * and applies smooth camera movement — never causes React re-renders.
 */
export default function CameraRig() {
  const { camera } = useThree();
  const currentZ = useRef(8);
  const currentY = useRef(0.3);

  useFrame((_, delta) => {
    const p = scrollData.progress; // 0 → 1

    // Target positions along the flight path
    const targetZ = lerp(8, -26, p);
    const targetY = lerp(0.3, -0.2, p);

    // Smooth damp (exponential approach)
    const speed = 1 - Math.pow(0.02, delta);
    currentZ.current = lerp(currentZ.current, targetZ, speed);
    currentY.current = lerp(currentY.current, targetY, speed);

    camera.position.set(0, currentY.current, currentZ.current);
    camera.lookAt(0, currentY.current, currentZ.current - 1);
  });

  return null;
}
