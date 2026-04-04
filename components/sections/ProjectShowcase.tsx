'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  index: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  align: 'left' | 'right';
}

const PROJECTS: ProjectData[] = [
  {
    index: '01',
    title: 'Chai & Chaat',
    category: 'Restaurant · Mumbai',
    description:
      "A cinematic web presence for Mumbai's finest chai café. Immersive full-screen hero, smooth Lenis scroll, and a bespoke menu experience.",
    tags: ['Next.js', 'GSAP', 'Lenis', 'WebGL'],
    url: 'https://cafe-sample-sigma.vercel.app/',
    align: 'right',
  },
  {
    index: '02',
    title: 'Uploft Boutique',
    category: 'Luxury Retail · Coimbatore',
    description:
      "Enterprise e-commerce for India's finest artisan fashion house. Handpicked luxury from Coimbatore — animated, elegant, and 60 FPS.",
    tags: ['Next.js', 'Three.js', 'Tailwind', 'TypeScript'],
    url: 'https://boutique-sample-sigma.vercel.app/',
    align: 'left',
  },
];

function ProjectOverlay({ project }: { project: ProjectData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isRight = project.align === 'right';

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, x: isRight ? 60 : -60 });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        end: 'bottom 25%',
        onEnter: () =>
          gsap.to(el, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }),
        onLeave: () =>
          gsap.to(el, { opacity: 0, x: isRight ? -30 : 30, duration: 0.5, ease: 'power2.in' }),
        onEnterBack: () =>
          gsap.to(el, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }),
        onLeaveBack: () =>
          gsap.to(el, { opacity: 0, x: isRight ? 30 : -30, duration: 0.5, ease: 'power2.in' }),
      });
    });

    return () => ctx.revert();
  }, [isRight]);

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${isRight ? 'right-[8vw]' : 'left-[8vw]'}`}
      style={{ maxWidth: 'min(380px, 30vw)' }}
    >
      <div ref={cardRef}>
        {/* Index number */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            color: '#1a6bff',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Project {project.index}
        </p>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#f0f0f0',
            marginBottom: '0.5rem',
          }}
        >
          {project.title}
        </h2>

        {/* Category */}
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#555',
            marginBottom: '1.25rem',
          }}
        >
          {project.category}
        </p>

        {/* Divider */}
        <div
          style={{
            width: '2.5rem',
            height: '1px',
            background: 'rgba(26, 107, 255, 0.5)',
            marginBottom: '1.25rem',
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.82rem',
            lineHeight: 1.8,
            color: '#777',
            marginBottom: '1.5rem',
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#888',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '0.3rem 0.7rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-blue-accent hover:text-blue-glow transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Visit Live Site
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            className="group-hover:translate-x-1 transition-transform duration-300"
          >
            <path
              d="M1 4.5H11M7.5 1L11 4.5L7.5 8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  return (
    <section id="work" style={{ position: 'relative' }}>
      {/* Section for project 1 — occupies the second 100vh of the 300vh container */}
      <div
        style={{ height: '100vh', position: 'relative' }}
        aria-label={`Project: ${PROJECTS[0].title}`}
      >
        <ProjectOverlay project={PROJECTS[0]} />
      </div>

      {/* Section for project 2 — occupies the third 100vh of the 300vh container */}
      <div
        style={{ height: '100vh', position: 'relative' }}
        aria-label={`Project: ${PROJECTS[1].title}`}
      >
        <ProjectOverlay project={PROJECTS[1]} />
      </div>
    </section>
  );
}
