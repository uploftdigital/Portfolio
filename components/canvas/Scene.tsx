'use client';

import { Suspense } from 'react';
import { Fog } from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import CameraRig from '@/components/three/CameraRig';
import Logo3D from '@/components/three/Logo3D';
import LaptopMesh from '@/components/three/LaptopMesh';
import Particles from '@/components/three/Particles';

function SceneFog() {
  const { scene } = useThree();
  useEffect(() => {
    // Fog near=4: objects within 4 units of camera are fully crisp
    // Fog far=13: objects 13+ units away are fully hidden
    //
    // This means:
    //   - Laptop 1 (z=-8) is invisible from hero (8+ units away) and fades in as camera approaches
    //   - Laptop 2 (z=-18) is invisible when camera is near laptop 1 (10 units away, fully fogged)
    //   - Each laptop is crisp only when camera is within 4 units of it ✓
    scene.fog = new Fog('#030303', 4, 13);
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}

export default function Scene() {
  return (
    <>
      <SceneFog />

      {/* Ambient fill */}
      <ambientLight intensity={0.5} />
      {/* Main front key light */}
      <directionalLight position={[0, 5, 10]} intensity={2.5} color="#ffffff" />
      {/* Blue fill for logo */}
      <pointLight position={[-3, 1, 7]} intensity={8}  color="#1a6bff" distance={12} />
      <pointLight position={[ 3, 1, 7]} intensity={5}  color="#4466ff" distance={12} />
      {/* Laptop 1 lights — centred at z=-8 */}
      <pointLight position={[ 0, 3, -6]}  intensity={20} color="#ffffff" distance={10} />
      <pointLight position={[ 2, 1, -7]}  intensity={10} color="#aaddff" distance={8}  />
      {/* Laptop 2 lights — centred at z=-18 */}
      <pointLight position={[ 0, 3, -16]} intensity={20} color="#ffffff" distance={10} />
      <pointLight position={[-2, 1, -17]} intensity={10} color="#aaddff" distance={8}  />

      <CameraRig />
      <Particles />

      <Suspense fallback={null}>
        <Logo3D />
      </Suspense>

      {/*
       * Laptop positions chosen so the linear camera lerp(8, -22, p) hits
       * each laptop at the MID-POINT of its scroll section:
       *
       *   Laptop 1  z=-8  → camera is 1 unit in front at p≈0.50 (mid section 1) ✓
       *   Laptop 2  z=-18 → camera is 1 unit in front at p≈0.83 (mid section 2) ✓
       *
       * The camera PASSES each laptop slightly after the midpoint, moving it
       * behind the camera (frustum-culled) before the next section begins.
       * Fog handles the fade-in and ensures the OTHER laptop is invisible
       * while the current one is on screen.
       */}
      <Suspense fallback={null}>
        <LaptopMesh
          texturePath="/cafe.webp"
          position={[0.4, -0.5, -8]}
          rotationY={-0.15}
        />
      </Suspense>

      <Suspense fallback={null}>
        <LaptopMesh
          texturePath="/boutique.webp"
          position={[-0.4, -0.5, -18]}
          rotationY={0.15}
        />
      </Suspense>
    </>
  );
}
