'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { scrollData } from '@/lib/scrollStore';

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

/** The scroll container height for the immersive WebGL section (in vh units) */
const IMMERSIVE_SECTION_VH = 300;

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,           // 0.05 damping — slow, expensive feel
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // ── Sync GSAP ScrollTrigger with Lenis ──────────────────────────────
    lenis.on('scroll', ScrollTrigger.update);

    // Refresh ScrollTrigger after Lenis is ready so it has correct
    // scroll heights — without this, triggers fire with stale positions
    // on first load at full browser width (footer stays opacity:0 forever)
    ScrollTrigger.refresh();

    // Use GSAP's ticker to drive Lenis RAF (prevents double rAF)
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // ── Update shared scroll store ────────────────────────────────────────
    lenis.on('scroll', ({ scroll, velocity }: { scroll: number; velocity: number }) => {
      // Use innerHeight * 3 to match the JS-set immersive section height
      const sectionPx = window.innerHeight * 3;
      scrollData.progress = Math.min(Math.max(scroll / sectionPx, 0), 1);
      scrollData.velocity = velocity;
      ScrollTrigger.update();
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
