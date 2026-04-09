'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import WebGLCanvasClient from '@/components/canvas/WebGLCanvasClient';
import Hero from '@/components/sections/Hero';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import Services from '@/components/sections/Services';
import Footer from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const immersiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use window.innerHeight (excludes browser chrome/scrollbar) instead of
    // 100vh (which can include it) — this ensures the scroll container is
    // exactly 3x the visible viewport height at any window size.
    const setHeight = () => {
      if (immersiveRef.current) {
        immersiveRef.current.style.height = `${window.innerHeight * 3}px`;
      }
      // Re-measure all ScrollTrigger positions after resize
      ScrollTrigger.refresh();
    };

    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);

  return (
    <>
      {/* Fixed full-screen WebGL canvas — client-only via wrapper */}
      <WebGLCanvasClient />

      {/* ── Page content ──────────────────────────────── */}
      <main>
        {/*
         * IMMERSIVE SCROLL SECTION — 3 × window.innerHeight px
         * Height set in JS (not CSS vh) so it's always exactly 3 visible
         * viewports regardless of browser chrome / address bar height.
         *   0–1×   → Hero (logo floating in 3D)
         *   1×–2×  → Project 1 (Cafe)
         *   2×–3×  → Project 2 (Boutique)
         */}
        <div ref={immersiveRef}>
          <Hero />
          <ProjectShowcase />
        </div>

        {/* ── Below-the-fold DOM content ─────────────── */}
        <Services />
        <Footer />
      </main>
    </>
  );
}
