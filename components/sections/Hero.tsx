'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center"
      style={{ height: '100svh', paddingLeft: 'clamp(1.25rem, 6vw, 9rem)', paddingRight: 'clamp(1.25rem, 6vw, 9rem)' }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-6"
        style={{ zIndex: 50 }}
      >
        <div className="flex items-center gap-3">
          {/* Geometric logo mark — mirrors the 3D mark */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="4" width="5" height="18" rx="1.5" fill="#f0f0f0" />
            <rect x="21" y="4" width="5" height="18" rx="1.5" fill="#f0f0f0" />
            <rect x="2" y="19" width="24" height="3" rx="1.5" fill="#1a6bff" />
            <rect x="11.5" y="0" width="5" height="8" rx="1.5" fill="#1a6bff" />
            <path d="M8 3.5L14 0L20 3.5" stroke="#1a6bff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span
            className="text-text-primary tracking-[0.18em] uppercase text-sm font-medium"
            style={{ fontFamily: 'var(--font-dm)' }}
          >
            Uploft Digital
          </span>
        </div>

        <ul
          className="hidden md:flex items-center gap-10 text-sm text-text-muted tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-dm)' }}
        >
          {['Work', 'Services', 'About', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-text-primary transition-colors duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:block text-xs tracking-[0.2em] uppercase border border-blue-accent text-blue-accent px-5 py-2.5 rounded-none hover:bg-blue-accent hover:text-white transition-all duration-300"
          style={{ fontFamily: 'var(--font-dm)' }}
        >
          Start a Project
        </a>
      </nav>

      {/* Hero Content */}
      <div ref={badgeRef} style={{ opacity: 0, marginBottom: '2rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#4a7aff',
            letterSpacing: '0.04em',
            lineHeight: 1.4,
          }}
        >
          We lift businesses and keep them elevated.
        </p>
      </div>

      <div ref={headlineRef} style={{ opacity: 0 }}>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3.2rem, 7.5vw, 7.5rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: '#f0f0f0',
            maxWidth: '800px',
          }}
        >
          We Build the
          <br />
          <em
            style={{
              fontStyle: 'italic',
              color: '#1a6bff',
              fontWeight: 400,
            }}
          >
            Extraordinary.
          </em>
        </h1>
      </div>

      <p
        ref={subRef}
        style={{
          opacity: 0,
          fontFamily: 'var(--font-dm)',
          fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
          color: '#888',
          maxWidth: '440px',
          lineHeight: 1.8,
          marginTop: '2rem',
          letterSpacing: '0.02em',
        }}
      >
        WebGL-first digital products for enterprises that demand flawless
        performance. 60&thinsp;FPS guaranteed. Zero compromises.
      </p>

      <div
        ref={ctaRef}
        style={{ opacity: 0, display: 'flex', gap: '1.25rem', marginTop: '2.75rem', alignItems: 'center' }}
      >
        <a
          href="#work"
          className="group inline-flex items-center gap-3 bg-blue-accent text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-blue-deep transition-all duration-300"
          style={{ fontFamily: 'var(--font-dm)' }}
        >
          View Our Work
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
            <path d="M1 5H13M9 1L13 5L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a
          href="#services"
          className="text-xs tracking-[0.2em] uppercase text-text-muted hover:text-text-primary transition-colors duration-300"
          style={{ fontFamily: 'var(--font-dm)' }}
        >
          Our Services
        </a>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        style={{
          opacity: 0,
          display: 'flex',
          gap: 'clamp(2rem, 6vw, 4.5rem)',
          marginTop: '5rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          maxWidth: '520px',
        }}
      >
        {[
          { val: '60', unit: 'FPS', label: 'Guaranteed' },
          { val: '40+', unit: '', label: 'Shipped Projects' },
          { val: '100%', unit: '', label: 'TypeScript' },
        ].map(({ val, unit, label }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                fontWeight: 500,
                color: '#f0f0f0',
                lineHeight: 1,
              }}
            >
              {val}
              <span style={{ color: '#1a6bff', fontSize: '0.6em' }}>{unit}</span>
            </p>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#555',
                marginTop: '0.4rem',
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.35 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#888',
          }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
