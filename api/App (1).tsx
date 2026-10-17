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
      const res = await fetch('https://mulatu-yewerke-lige-portfolio.vercel.app/api/contact', {
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
      setStatus({ type: 'error', text: 'Error connecting to server.' });
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
          </button>
        </div>

        {/* mobile dropdown */}
        <div className={`md:hidden pf-menu ${menuOpen ? 'open' : ''}`}>
          <div>
            <div className="pf-pill mx-4 mt-2 rounded-3xl p-3 flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`pf-navlink ${active === n.id ? 'active' : ''}`}
                >
                  {n.icon}
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="pf-btn mt-1 px-5 py-3 rounded-2xl text-sm font-semibold text-[#07090F]"
              >
                Hire me
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="about" className="relative">
        <div className="pf-aurora" aria-hidden="true" />
        <NetworkCanvas />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-14 items-center">
          {/* Text */}
          <div className="md:col-span-7 text-center md:text-left">
            <div
              className="pf-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 text-emerald-300 text-sm font-medium mb-8 border border-emerald-400/20"
              style={{ ['--d' as string]: '0.05s' }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              Available for remote contract &amp; freelance projects
            </div>

            <h1 className="pf-display text-[2.6rem] sm:text-6xl lg:text-[4.4rem] font-extrabold leading-[1.02] mb-7 text-white">
              <span className="block">
                {headlineLine1.map((w, i) => (
                  <span key={w} className="pf-word">
                    <span style={{ ['--d' as string]: `${0.15 + i * 0.09}s` }}>{w}&nbsp;</span>
                  </span>
                ))}
              </span>
              <span className="block pf-gradient-text">
                {headlineLine2.map((w, i) => (
                  <span key={w} className="pf-word">
                    <span style={{ ['--d' as string]: `${0.55 + i * 0.09}s` }}>{w}&nbsp;</span>
                  </span>
                ))}
              </span>
            </h1>

            <p
              className="pf-rise pf-mono text-sm sm:text-base text-[#4CC9F0] mb-5 h-6"
              style={{ ['--d' as string]: '0.9s' }}
            >
              <span className="text-[#8B93AD]">&gt; </span>
              <Typewriter words={ROLES} />
            </p>

            <p
              className="pf-rise text-[#8B93AD] text-lg max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0"
              style={{ ['--d' as string]: '1s' }}
            >
              Hi, I'm <strong className="text-white">Mulatu</strong> — Full-Stack Software Engineer specialized in
              TypeScript, the MERN stack, Java distributed architectures (RMI/JDBC), and machine learning pipelines. I
              turn complex requirements into production-ready software for global clients.
            </p>

            <div
              className="pf-rise flex flex-wrap justify-center md:justify-start gap-4"
              style={{ ['--d' as string]: '1.1s' }}
            >
              <a href="#projects" className="pf-btn px-7 py-3.5 rounded-full font-semibold text-[#07090F]">
                Explore Case Studies
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full font-medium text-gray-200 border border-[#2a3358] hover:border-[#7B6CFF] hover:bg-[#7B6CFF]/10 transition"
              >
                Let's Build Together
              </a>
            </div>
          </div>

          {/* Photo – full colour, vivid, with a multi-colour glow and ring */}
          <div className="md:col-span-5 flex justify-center pf-rise" style={{ ['--d' as string]: '0.4s' }}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 pf-float">
              <div className="pf-photo-glow" aria-hidden="true" />
              <div className="pf-ring relative w-full h-full rounded-[2rem]">
                <div className="pf-photo relative w-full h-full rounded-[calc(2rem-3px)] overflow-hidden bg-[#0E1220]">
                  <img
                    src={profileImg}
                    alt="Mulatu Jaleta Abdeta"
                    className="pf-photo-img w-full h-full object-cover object-center"
                  />
                  {/* soft colour wash + light sweep */}
                  <span className="pf-photo-tint" aria-hidden="true" />
                  <span className="pf-photo-shine" aria-hidden="true" />
                </div>
              </div>

              <span className="pf-chip chip-a absolute -left-5 top-10" style={{ animationDelay: '0s' }}>TypeScript</span>
              <span className="pf-chip chip-b absolute -right-5 bottom-20" style={{ animationDelay: '-1.5s' }}>Java RMI</span>
              <span className="pf-chip chip-c absolute left-6 -bottom-4" style={{ animationDelay: '-3s' }}>Scikit-Learn</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tech marquee */}
      <div className="pf-marquee border-y border-[#1C2340] py-5" aria-label="Technologies I work with">
        <div className="pf-track">
          {[...TECH, ...TECH].map((t, i) => (
            <span key={`${t}-${i}`} className="pf-mono text-sm text-[#8B93AD] px-7 flex items-center gap-14 whitespace-nowrap">
              {t}
              <span className="w-1 h-1 rounded-full bg-[#7B6CFF]" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      {/* Case studies */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <h2 className="pf-display text-4xl md:text-5xl font-bold text-white mb-4">Engineering case studies</h2>
            <p className="text-[#8B93AD] text-lg">
              Real-world systems engineered with robust architecture, clean code, and scalable logic.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.12} className="h-full">
              <TiltCard>
                <div className="p-7 flex-1 flex flex-col">
                  <p className="text-sm text-[#7B6CFF] font-medium mb-2">{p.category}</p>
                  <h3 className="pf-display text-2xl font-bold text-white mb-5">{p.title}</h3>

                  {p.problem ? (
                    <dl className="space-y-4 text-sm text-[#B4BBD3] mb-7 border-l border-[#2a3358] pl-5">
                      <div>
                        <dt className="text-white font-semibold mb-0.5">The problem</dt>
                        <dd className="leading-relaxed">{p.problem}</dd>
                      </div>
                      <div>
                        <dt className="text-white font-semibold mb-0.5">The solution</dt>
                        <dd className="leading-relaxed">{p.solution}</dd>
                      </div>
                      <div>
                        <dt className="text-white font-semibold mb-0.5">Impact</dt>
                        <dd className="leading-relaxed">{p.impact}</dd>
                      </div>
                    </dl>
                  ) : (
                    <p className="text-[#B4BBD3] text-sm leading-relaxed mb-7">{p.blurb}</p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-auto mb-6">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="pf-mono text-xs text-[#9fb0ff] bg-[#7B6CFF]/10 border border-[#7B6CFF]/20 px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleGitHubClick(p.repo)}
                    className="pf-gh group inline-flex items-center justify-center gap-2.5 text-sm font-medium text-white border border-[#2a3358] hover:border-[#7B6CFF] py-3 px-4 rounded-xl transition"
                  >
                    <GithubIcon />
                    View on GitHub
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative">
        <div className="pf-aurora pf-aurora-bottom" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-start">
          <Reveal>
            <h2 className="pf-display text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-6">
              Let's work together.
            </h2>
            <p className="text-[#8B93AD] text-lg max-w-md leading-relaxed">
              Send a direct message for contract work, collaborations, or job opportunities. Your note goes straight to
              my inbox.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="space-y-7 bg-[#0E1220]/70 backdrop-blur border border-[#1C2340] rounded-3xl p-8 shadow-2xl shadow-black/40"
            >
              {(
                [
                  { key: 'name', label: 'Your name', type: 'text' },
                  { key: 'email', label: 'Your email', type: 'email' },
                ] as const
              ).map((f) => (
                <div key={f.key} className="relative">
                  <input
                    id={f.key}
                    type={f.type}
                    required
                    placeholder=" "
                    value={formData[f.key]}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="peer w-full bg-transparent border-b border-[#2a3358] pt-6 pb-2 text-white outline-none focus:border-[#7B6CFF] transition"
                  />
                  <label
                    htmlFor={f.key}
                    className="pointer-events-none absolute left-0 top-1 text-xs text-[#8B93AD] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#7B6CFF]"
                  >
                    {f.label}
                  </label>
                </div>
              ))}

              <div className="relative">
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder=" "
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="peer w-full bg-transparent border-b border-[#2a3358] pt-6 pb-2 text-white outline-none focus:border-[#7B6CFF] transition resize-none"
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute left-0 top-1 text-xs text-[#8B93AD] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#7B6CFF]"
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={status.type === 'sending'}
                className="pf-btn w-full py-3.5 rounded-full font-semibold text-[#07090F] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.type === 'sending' ? 'Sending...' : 'Send message'}
              </button>

              <p
                aria-live="polite"
                className={`text-sm text-center min-h-[1.25rem] transition ${
                  status.type === 'success'
                    ? 'text-emerald-400'
                    : status.type === 'error'
                    ? 'text-rose-400'
                    : 'text-[#8B93AD]'
                }`}
              >
                {status.type !== 'sending' && status.text}
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1C2340] py-8 text-center text-sm text-[#6b7392] pf-mono px-6">
        © 2026 Mulatu Jaleta Abdeta. Built with TypeScript &amp; MERN for Global Impact.
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles (kept inside the component so you only need this one file)  */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root { --a:#7B6CFF; --b:#4CC9F0; --c:#ff6fb5; --d2:#ffb86b; --line:#1C2340; }
html { scroll-behavior: smooth; }
section[id], header[id] { scroll-margin-top: 5rem; }

.pf-root    { font-family: 'DM Sans', system-ui, sans-serif; }
.pf-display { font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif; letter-spacing: -0.03em; }
.pf-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }

.pf-gradient-text {
  background: linear-gradient(100deg, var(--a) 10%, var(--b) 90%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

/* progress + cursor glow */
.pf-progress { background: linear-gradient(90deg, var(--c), var(--a), var(--b)); }
.pf-glow {
  position: fixed; top: 0; left: 0; width: 520px; height: 520px; margin: -260px 0 0 -260px;
  background: radial-gradient(circle, rgba(123,108,255,.13), transparent 62%);
  pointer-events: none; z-index: 1; will-change: transform;
}

/* aurora backdrop */
.pf-aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.pf-aurora::before, .pf-aurora::after {
  content: ''; position: absolute; width: 46rem; height: 46rem; border-radius: 50%; filter: blur(110px); opacity: .32;
  animation: pf-drift 18s ease-in-out infinite alternate;
}
.pf-aurora::before { background: var(--a); top: -22rem; left: -12rem; }
.pf-aurora::after  { background: var(--b); top: -14rem; right: -18rem; animation-delay: -9s; opacity: .2; }
.pf-aurora-bottom::before { top: auto; bottom: -26rem; }
.pf-aurora-bottom::after  { top: auto; bottom: -22rem; }
@keyframes pf-drift { to { transform: translate3d(5rem, 3rem, 0) scale(1.12); } }

/* ---------------- navbar ---------------- */
.pf-nav { padding-top: .75rem; padding-bottom: .5rem; transition: padding .3s ease, background .3s ease, backdrop-filter .3s ease; pointer-events: none; }
.pf-nav > * { pointer-events: auto; }
.pf-nav.scrolled {
  padding-top: .35rem; padding-bottom: .35rem;
  background: linear-gradient(180deg, rgba(7,9,15,.88), rgba(7,9,15,.55) 70%, transparent);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.pf-pill {
  position: relative;
  background: rgba(14,18,32,.62);
  border: 1px solid rgba(123,108,255,.28);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 10px 40px -12px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.06), 0 0 28px -10px rgba(123,108,255,.45);
}
.pf-navlink {
  position: relative; display: inline-flex; align-items: center; gap: .5rem;
  padding: .55rem 1rem; border-radius: 999px; font-size: .9rem; font-weight: 500;
  color: #9aa3c0; transition: color .2s, background .25s, box-shadow .25s;
}
.pf-navlink svg { opacity: .75; transition: transform .25s, opacity .25s; }
.pf-navlink:hover { color: #fff; background: rgba(255,255,255,.05); }
.pf-navlink:hover svg { transform: translateY(-1px) scale(1.1); opacity: 1; }
.pf-navlink.active {
  color: #fff;
  background: linear-gradient(100deg, rgba(123,108,255,.38), rgba(76,201,240,.28));
  box-shadow: inset 0 0 0 1px rgba(160,150,255,.35), 0 0 18px -4px rgba(123,108,255,.55);
}
.pf-navlink.active svg { opacity: 1; color: #bfe9ff; }
.pf-menu { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.pf-menu > div { overflow: hidden; }
.pf-menu.open { grid-template-rows: 1fr; }

/* ---------------- orbit logo (name rotating in a circle) ---------------- */
.pf-logo {
  --size: 84px;
  position: relative; display: grid; place-items: center; flex: none;
  width: var(--size); height: var(--size); border-radius: 50%;
  transition: width .3s ease, height .3s ease;
}
.pf-logo.small { --size: 62px; }
.pf-logo-glow {
  position: absolute; inset: -14px; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle, rgba(123,108,255,.38) 0%, rgba(255,111,181,.14) 45%, transparent 70%);
  filter: blur(8px);
  animation: pf-dim 4.5s ease-in-out infinite;
}
@keyframes pf-dim { 0%, 100% { opacity: .45; transform: scale(.94); } 50% { opacity: .95; transform: scale(1.06); } }
.pf-logo-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, rgba(14,18,32,.92) 58%, rgba(14,18,32,.55) 100%);
  border: 1px solid rgba(160,150,255,.3);
  box-shadow: 0 0 22px -4px rgba(123,108,255,.55), inset 0 0 18px -6px rgba(76,201,240,.4);
}
.pf-logo-ring::before {
  content: ''; position: absolute; inset: -2px; border-radius: 50%; padding: 2px;
  background: conic-gradient(from 0deg, transparent 0 60%, var(--c), var(--a), var(--b), transparent 98%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: pf-spin 7s linear infinite;
}
.pf-logo-text {
  position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible;
  animation: pf-spin 18s linear infinite;
  filter: drop-shadow(0 0 3px rgba(150,140,255,.65));
}
.pf-logo:hover .pf-logo-text, .pf-logo:hover .pf-logo-ring::before { animation-play-state: paused; }
.pf-logo-core {
  position: relative; font-weight: 800; font-size: calc(var(--size) * .27); line-height: 1; color: #fff;
  letter-spacing: -.06em; text-shadow: 0 0 12px rgba(123,108,255,.9);
  transition: font-size .3s ease;
}
.pf-logo-core span {
  background: linear-gradient(120deg, var(--c), var(--b));
  -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: none;
}

/* hero load sequence */
.pf-rise { opacity: 0; transform: translateY(22px); animation: pf-rise .9s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: var(--d, 0s); }
@keyframes pf-rise { to { opacity: 1; transform: none; } }
.pf-word { display: inline-block; overflow: hidden; vertical-align: bottom; padding-bottom: .12em; margin-bottom: -.12em; }
.pf-word > span { display: inline-block; transform: translateY(115%); animation: pf-word .85s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: var(--d, 0s); }
@keyframes pf-word { to { transform: none; } }

/* typewriter caret */
.pf-caret { display: inline-block; width: 8px; height: 1.05em; margin-left: 3px; vertical-align: -0.15em; background: var(--b); animation: pf-blink 1s steps(1) infinite; }
@keyframes pf-blink { 50% { opacity: 0; } }

/* ---------------- colourful profile photo ---------------- */
.pf-photo-glow {
  position: absolute; inset: -1.6rem; border-radius: 50%; filter: blur(46px); opacity: .55; pointer-events: none;
  background:
    radial-gradient(circle at 20% 25%, var(--c), transparent 55%),
    radial-gradient(circle at 80% 30%, var(--b), transparent 55%),
    radial-gradient(circle at 50% 85%, var(--a), transparent 55%),
    radial-gradient(circle at 85% 80%, var(--d2), transparent 50%);
  animation: pf-dim 6s ease-in-out infinite;
}
.pf-ring { padding: 3px; overflow: hidden; }
.pf-ring::before {
  content: ''; position: absolute; inset: -60%;
  background: conic-gradient(from 0deg, var(--c), var(--d2), #34d399, var(--b), var(--a), var(--c));
  animation: pf-spin 6s linear infinite;
}
@keyframes pf-spin { to { transform: rotate(360deg); } }
.pf-photo { box-shadow: 0 20px 50px -20px rgba(0,0,0,.8); }
.pf-photo-img {
  filter: saturate(1.35) contrast(1.08) brightness(1.05);
  transition: transform .7s ease, filter .7s ease;
}
.pf-photo:hover .pf-photo-img { transform: scale(1.06); filter: saturate(1.5) contrast(1.1) brightness(1.08); }
.pf-photo-tint {
  position: absolute; inset: 0; pointer-events: none; mix-blend-mode: soft-light; opacity: .55;
  background: linear-gradient(135deg, rgba(255,111,181,.65) 0%, transparent 45%, rgba(76,201,240,.65) 100%);
}
.pf-photo-shine {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,.22) 48%, transparent 60%);
  transform: translateX(-120%); animation: pf-shine 6s ease-in-out infinite;
}
@keyframes pf-shine { 0%, 55% { transform: translateX(-120%); } 85%, 100% { transform: translateX(120%); } }

.pf-float { animation: pf-float 7s ease-in-out infinite; }
@keyframes pf-float { 50% { transform: translateY(-14px); } }
.pf-chip {
  pointer-events: none; font-family: 'JetBrains Mono', monospace; font-size: .72rem; color: #fff;
  padding: .4rem .75rem; border-radius: 999px; background: rgba(14,18,32,.75); backdrop-filter: blur(8px);
  border: 1px solid rgba(123,108,255,.35); box-shadow: 0 8px 24px rgba(0,0,0,.35);
  animation: pf-bob 5s ease-in-out infinite;
}
.pf-chip.chip-a { border-color: rgba(255,111,181,.6); box-shadow: 0 8px 24px rgba(0,0,0,.35), 0 0 16px -4px rgba(255,111,181,.6); }
.pf-chip.chip-b { border-color: rgba(76,201,240,.6);  box-shadow: 0 8px 24px rgba(0,0,0,.35), 0 0 16px -4px rgba(76,201,240,.6); }
.pf-chip.chip-c { border-color: rgba(255,184,107,.6); box-shadow: 0 8px 24px rgba(0,0,0,.35), 0 0 16px -4px rgba(255,184,107,.6); }
@keyframes pf-bob { 50% { transform: translateY(-9px); } }

/* buttons */
.pf-btn {
  position: relative; display: inline-block; text-align: center; overflow: hidden; cursor: pointer;
  background: linear-gradient(100deg, #a99fff, var(--b));
  box-shadow: 0 10px 30px -8px rgba(123,108,255,.7); transition: transform .2s, box-shadow .2s;
}
.pf-btn::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 40%; left: -60%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.55), transparent); transform: skewX(-20deg);
}
.pf-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 34px -8px rgba(76,201,240,.7); }
.pf-btn:hover::after { left: 120%; transition: left .7s; }

/* marquee */
.pf-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
.pf-track { display: flex; width: max-content; animation: pf-marquee 38s linear infinite; }
.pf-marquee:hover .pf-track { animation-play-state: paused; }
@keyframes pf-marquee { to { transform: translateX(-50%); } }

/* scroll reveal */
.pf-reveal { opacity: 0; transform: translateY(32px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); transition-delay: var(--d, 0s); }
.pf-reveal.in { opacity: 1; transform: none; }

/* project card */
.pf-card {
  position: relative; overflow: hidden; border-radius: 1.5rem; border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.01));
  transition: transform .25s ease, border-color .3s, box-shadow .3s; will-change: transform;
}
.pf-card::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .3s;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(123,108,255,.2), transparent 60%);
}
.pf-card:hover { border-color: rgba(123,108,255,.5); box-shadow: 0 30px 60px -30px rgba(123,108,255,.45); }
.pf-card:hover::before { opacity: 1; }
.pf-card > * { position: relative; }

:focus-visible { outline: 2px solid var(--b); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
  .pf-word > span, .pf-rise, .pf-reveal { opacity: 1; transform: none; }
}
`;
