'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    title: 'WebGL & 3D\nExperiences',
    desc: 'Scroll-driven 3D narratives, product configurators, and immersive environments built on Three.js and React Three Fiber.',
  },
  {
    num: '02',
    title: 'Next.js\nApplications',
    desc: 'Production-grade web apps with App Router, TypeScript strict mode, ISR, and sub-second load times.',
  },
  {
    num: '03',
    title: 'Motion &\nInteraction',
    desc: 'GSAP-orchestrated animation systems, Lenis smooth scroll, and micro-interaction design at enterprise scale.',
  },
  {
    num: '04',
    title: 'Digital\nStrategy',
    desc: 'Architecture reviews, performance audits, design-system consulting, and long-term product roadmaps.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );

      // Service cards stagger
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: 'clamp(5rem, 12vh, 9rem) clamp(2rem, 10vw, 9rem)',
        position: 'relative',
        background: '#030303',
      }}
    >
      {/* Subtle top separator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 'clamp(2rem, 10vw, 9rem)',
          right: 'clamp(2rem, 10vw, 9rem)',
          height: '1px',
          background: 'rgba(255,255,255,0.05)',
        }}
      />

      {/* Heading */}
      <div ref={headingRef} style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#1a6bff',
            marginBottom: '1.2rem',
          }}
        >
          What We Do
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: '#f0f0f0',
            maxWidth: '560px',
          }}
        >
          Capabilities Built for
          <br />
          <em style={{ color: '#1a6bff', fontStyle: 'italic' }}>Enterprise Scale.</em>
        </h2>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {SERVICES.map((s) => (
          <div
            key={s.num}
            className="service-card group"
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              background: '#030303',
              cursor: 'default',
              transition: 'background 0.35s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = '#080810';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = '#030303';
            }}
          >
            {/* Hover blue glow line */}
            <div
              className="service-line"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '2px',
                height: '0%',
                background: '#1a6bff',
                transition: 'height 0.4s ease',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '3rem',
                fontWeight: 300,
                color: 'rgba(26,107,255,0.2)',
                lineHeight: 1,
                marginBottom: '1.5rem',
              }}
            >
              {s.num}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                fontWeight: 400,
                color: '#f0f0f0',
                lineHeight: 1.2,
                whiteSpace: 'pre-line',
                marginBottom: '1.2rem',
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: '0.82rem',
                lineHeight: 1.8,
                color: '#666',
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
