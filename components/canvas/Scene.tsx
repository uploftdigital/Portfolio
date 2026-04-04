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
    // Fog starts at z=4 (just behind logo), fully opaque at z=16 away from camera
    // This hides the laptops while camera is in hero, reveals them as camera approaches
    scene.fog = new Fog('#030303', 4, 18);
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
      {/* Laptop 1 lights — tight front illumination */}
      <pointLight position={[ 0, 3, -5]}  intensity={20} color="#ffffff" distance={10} />
      <pointLight position={[ 2, 1, -6]}  intensity={10} color="#aaddff" distance={8}  />
      {/* Laptop 2 lights */}
      <pointLight position={[ 0, 3, -16]} intensity={20} color="#ffffff" distance={10} />
      <pointLight position={[-2, 1, -17]} intensity={10} color="#aaddff" distance={8}  />

      <CameraRig />
      <Particles />

      <Suspense fallback={null}>
        <Logo3D />
      </Suspense>

      {/* Laptops pushed further back so fog hides them in hero */}
      <Suspense fallback={null}>
        <LaptopMesh
          texturePath="/cafe.webp"
          position={[0.4, -0.5, -10]}
          rotationY={-0.15}
        />
      </Suspense>

      <Suspense fallback={null}>
        <LaptopMesh
          texturePath="/boutique.webp"
          position={[-0.4, -0.5, -20]}
          rotationY={0.15}
        />
      </Suspense>
    </>
  );
}
