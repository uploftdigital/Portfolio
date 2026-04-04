/**
 * Simple module-level store for sharing scroll progress
 * between Lenis (DOM) and Three.js (WebGL canvas).
 * Avoids React re-renders entirely — R3F reads it in useFrame.
 */
export const scrollData = {
  /** Normalized progress 0–1 through the 300 vh immersive section */
  progress: 0,
  /** Raw lenis scroll velocity */
  velocity: 0,
};
