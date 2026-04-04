import WebGLCanvasClient from '@/components/canvas/WebGLCanvasClient';
import Hero from '@/components/sections/Hero';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import Services from '@/components/sections/Services';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      {/* Fixed full-screen WebGL canvas — client-only via wrapper */}
      <WebGLCanvasClient />

      {/* ── Page content ──────────────────────────────── */}
      <main>
        {/*
         * IMMERSIVE SCROLL SECTION — 300 vh
         * The fixed WebGL camera flies through this zone.
         * Three 100vh subsections:
         *   0–100vh   → Hero (logo floating in 3D)
         *   100–200vh → Project 1 (Cafe)
         *   200–300vh → Project 2 (Boutique)
         */}
        <div style={{ height: '300vh' }}>
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
