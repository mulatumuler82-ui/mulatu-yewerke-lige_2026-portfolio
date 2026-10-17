import React, { useEffect, useRef, useState } from 'react';
import profileImg from './g.jpg';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Project = {
  category: string;
  title: string;
  blurb?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  tags: string[];
  repo: string;
};

const PROJECTS: Project[] = [
  {
    category: 'Enterprise resource system',
    title: 'IU-LEMMS Lab Management System',
    problem:
      'Manual tracking of university laboratory equipment caused missing inventory records and inefficient audit cycles.',
    solution:
      'Engineered a full-stack tracking platform with structured MongoDB schemas and robust TypeScript workflows.',
    impact: 'Streamlined asset tracking and significantly reduced administrative overhead.',
    tags: ['TypeScript', 'MERN Stack', 'UML Architecture'],
    repo: 'https://github.com/mulatumuler82-ui/lab-equipment-system',
  },
  {
    category: 'Distributed network architecture',
    title: 'Distributed Banking Protocol',
    problem: 'Need for secure, concurrent remote procedure calls across distributed server nodes.',
    solution:
      'Developed a Java RMI and socket-based client-server prototype focusing on network synchronization and stub-skeleton mechanics.',
    impact: 'Ensured reliable transaction execution and thread-safe remote method invocation.',
    tags: ['Java RMI', 'JDBC', 'IntelliJ IDEA'],
    repo: 'https://github.com/mulatumuler82-ui/try-git',
  },
  {
    category: 'Fintech web application',
    title: 'Personal Cost Management App',
    blurb:
      'Web-based personal finance and expense tracking application featuring user authentication, secure database queries, and data visualization dashboards.',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    repo: 'https://github.com/mulatumuler82-ui/cost-management-system',
  },
  {
    category: 'Machine learning pipeline',
    title: 'Loan Approval Prediction Model',
    blurb:
      'Supervised machine learning classification pipeline evaluating financial risk metrics using Logistic Regression, Decision Trees, and Random Forests.',
    tags: ['Python', 'Scikit-Learn', 'Classification'],
    // NOTE: this repo name says "mern-portfolio" – double-check it's the right link for this project.
    repo: 'https://github.com/mulatumuler82-ui/mern-portfolio',
  },
];

const TECH = [
  'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Java RMI', 'JDBC',
  'PHP', 'MySQL', 'Python', 'Scikit-Learn', 'UML', 'Bootstrap',
];

const ROLES = [
  'Full-Stack Software Engineer',
  'Distributed Systems Builder',
  'Machine Learning Pipeline Developer',
];

/* small stroke icons for the navbar */
const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const NAV = [
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Case Studies',
    icon: (
      <svg {...iconProps}>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Small hooks / building blocks                                      */
/* ------------------------------------------------------------------ */

/** Adds the "in" class once the element scrolls into view. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pf-reveal ${shown ? 'in' : ''} ${className}`}
      style={{ ['--d' as string]: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/** Types and deletes a rotating list of phrases. */
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = words[index];
    let delay = deleting ? 30 : 65;
    if (!deleting && text === full) delay = 1700;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span>
      {text}
      <span className="pf-caret" aria-hidden="true" />
    </span>
  );
}

/**
 * Top-left logo: the name written around a circle that keeps rotating,
 * with a dim pulsing glow behind it and a monogram in the middle.
 * Hover pauses the rotation so the name can be read comfortably.
 */
function OrbitLogo({ small }: { small: boolean }) {
  const label = 'MULATU JALETA ABDETA  ✦  FULL-STACK ENGINEER  ✦  ';
  return (
    <a
      href="#about"
      aria-label="Mulatu Jaleta Abdeta – back to top"
      className={`pf-logo ${small ? 'small' : ''}`}
    >
      <span className="pf-logo-glow" aria-hidden="true" />
      <span className="pf-logo-ring" aria-hidden="true" />

      <svg className="pf-logo-text" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="pf-text-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb3d9" />
            <stop offset="50%" stopColor="#b8b0ff" />
            <stop offset="100%" stopColor="#7be3ff" />
          </linearGradient>
          <path id="pf-circle" d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0" />
        </defs>
        <text fill="url(#pf-text-grad)" fontSize="8.6" fontWeight="700" letterSpacing="0.6">
          <textPath href="#pf-circle" textLength="243" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>

      <span className="pf-logo-core pf-display" aria-hidden="true">
        M<span>J</span>
      </span>
    </a>
  );
}

/** Drifting network of nodes that reacts to the cursor – a nod to distributed systems. */
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 15000), 90);
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
      }

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(123,108,255,${(1 - d / 130) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 180) {
          ctx.strokeStyle = `rgba(76,201,240,${(1 - dm / 180) * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = 'rgba(190,198,255,0.75)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent)',
        maskImage: 'linear-gradient(to bottom, #000 55%, transparent)',
      }}
    />
  );
}

/** Card with a cursor-following glow and a gentle 3D tilt. */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    const rx = (0.5 - y / r.height) * 5;
    const ry = (x / r.width - 0.5) * 5;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="pf-card h-full flex flex-col">
      {children}
    </div>
  );
}

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

type Status = { type: 'idle' | 'sending' | 'success' | 'error'; text: string };

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>({ type: 'idle', text: '' });
  const [active, setActive] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* scroll progress bar + navbar "scrolled" state */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* cursor glow */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  /* active nav link */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'sending', text: 'Sending...' });

    try {
      // Live Vercel backend (api/contact.js)
      const API_URL = 'https://mulatu-yewerke-lige-2026-portfolio-ten.vercel.app/api/contact';

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', text: 'Message sent successfully to your inbox!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Network error. Please check your connection.' });
    }
  };

  const handleGitHubClick = (repoUrl: string) => {
    if (window.confirm('Do you want to see in GitHub?')) window.open(repoUrl, '_blank');
  };

  const headlineLine1 = ['Architecting', 'High-Performance', 'Web', 'Apps'];
  const headlineLine2 = ['&', 'Distributed', 'Systems'];

  return (
    <div className="pf-root min-h-screen bg-[#07090F] text-[#E8EBF5] overflow-x-hidden">
      <style>{CSS}</style>

      {/* scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none">
        <div ref={progressRef} className="pf-progress h-full origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>

      {/* cursor glow */}
      <div ref={glowRef} className="pf-glow" aria-hidden="true" />

      {/* Navbar: logo pinned top-left, floating glass pill on the right */}
      <nav className={`pf-nav fixed top-0 inset-x-0 z-50 ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <OrbitLogo small={scrolled} />

          {/* desktop pill */}
          <div className="pf-pill hidden md:flex items-center gap-1 p-1.5 rounded-full">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`pf-navlink ${active === n.id ? 'active' : ''}`}
              >
                {n.icon}
                {n.label}
              </a>
            ))}
            <a href="#contact" className="pf-btn ml-1 px-5 py-2 rounded-full text-sm font-semibold text-[#07090F]">
              Hire me
            </a>
          </div>

          {/* mobile toggle */}
          <button
            className="pf-pill md:hidden w-11 h-11 rounded-full grid place-items-center text-gray-200"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>