'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state via GSAP (not inline CSS) so ScrollTrigger
      // can always override it — avoids elements stuck at opacity:0
      gsap.set([headingRef.current, contentRef.current], { opacity: 0 });

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    // Refresh after a tick to ensure ScrollTrigger has correct positions
    // after Lenis and layout have fully settled
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      style={{
        padding: 'clamp(6rem, 14vh, 10rem) clamp(2rem, 10vw, 9rem) clamp(3rem, 5vh, 4rem)',
        position: 'relative',
        background: '#030303',
      }}
    >
      {/* Top border */}
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

      {/* Brand tagline */}
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#4a7aff',
          letterSpacing: '0.04em',
          marginBottom: '1.5rem',
          opacity: 0.8,
        }}
      >
        We lift businesses and keep them elevated.
      </p>

      {/* CTA headline */}
      <h2
        ref={headingRef}
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
          fontWeight: 300,
          lineHeight: 1.0,
          color: '#f0f0f0',
          maxWidth: '820px',
          marginBottom: 'clamp(3rem, 5vh, 4rem)',
        }}
      >
        Ready to build something{' '}
        <em style={{ color: '#1a6bff', fontStyle: 'italic' }}>extraordinary?</em>
      </h2>

      <div
        ref={contentRef}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '3rem',
        }}
      >
        {/* Contact CTA */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.82rem',
              color: '#666',
              lineHeight: 1.8,
              maxWidth: '340px',
              marginBottom: '2rem',
            }}
          >
            We partner with companies building the next generation of digital
            products. Let&apos;s talk about your vision.
          </p>
          <a
            href="mailto:uploftdigital@gmail.com"
            className="group inline-flex items-center gap-3 bg-blue-accent text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-blue-deep transition-all duration-300"
            style={{ fontFamily: 'var(--font-dm)' }}
          >
            uploftdigital@gmail.com
            <svg
              width="13"
              height="10"
              viewBox="0 0 13 10"
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path
                d="M1 5H12M8 1L12 5L8 9"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Bottom right: logo + links */}
        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#333',
              marginBottom: '1.2rem',
            }}
          >
            Uploft Digital
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'flex-end',
              marginBottom: '2.5rem',
            }}
          >
            <a
              href="https://www.instagram.com/uploftdigital/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#444',
                transition: 'color 0.25s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = '#1a6bff')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = '#444')
              }
            >
              Instagram
            </a>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.6rem',
              color: '#2a2a2a',
              letterSpacing: '0.1em',
            }}
          >
            © {new Date().getFullYear()} Uploft Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
