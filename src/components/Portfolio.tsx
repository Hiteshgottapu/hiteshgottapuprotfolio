import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Brain, Cpu, Database, Cloud, Code2, Github, Linkedin, Mail, FileDown,
  ArrowRight, Sparkles, Shield, Network, Zap, Box, Layers, GitBranch,
  Terminal, ExternalLink, Calendar, Star, GitCommit, Award, FlaskConical,
  Workflow, ChevronRight,
} from "lucide-react";

/* ============================================================================
 * Atoms / Primitives
 * ========================================================================== */

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 py-32 md:px-10 ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground"
    >
      <Icon className="h-3.5 w-3.5 text-accent" />
      {children}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl text-gradient"
    >
      {children}
    </motion.h2>
  );
}

function MagneticButton({
  children, variant = "primary", href, onClick,
}: { children: React.ReactNode; variant?: "primary" | "ghost" | "accent"; href?: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  }
  function handleLeave() { x.set(0); y.set(0); }

  const base = "relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const styles = {
    primary: "text-white bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-violet)] glow-violet hover:brightness-110",
    accent: "text-[var(--background)] bg-[var(--neon-cyan)] glow-cyan hover:brightness-110",
    ghost: "glass text-foreground hover:bg-white/5",
  }[variant];

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
}

/* ============================================================================
 * Cursor glow
 * ========================================================================== */
function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  useEffect(() => {
    const handler = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
    >
      <div className="h-full w-full rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 60%)" }} />
    </motion.div>
  );
}

/* ============================================================================
 * Navigation
 * ========================================================================== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h(); window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#architecture", label: "Architecture" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#research", label: "Research" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${scrolled ? "w-[min(96%,920px)]" : "w-[min(96%,1100px)]"}`}
    >
      <div className="glass-strong flex items-center justify-between rounded-full px-4 py-2.5">
        <a href="#top" className="flex items-center gap-2 px-2">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-violet)] glow-blue" />
            <div className="absolute inset-[3px] rounded-[5px] bg-background flex items-center justify-center">
              <span className="text-[10px] font-bold text-gradient-primary">HG</span>
            </div>
          </div>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">Hitesh Gottapu</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>
        <MagneticButton href="#contact" variant="primary">
          <Sparkles className="h-3.5 w-3.5" /> Hire Me
        </MagneticButton>
      </div>
    </motion.nav>
  );
}

/* ============================================================================
 * HERO - 3D AI Core + neural network bg
 * ========================================================================== */
function NeuralBackground() {
  // Pre-computed deterministic nodes/edges
  const nodes = Array.from({ length: 28 }, (_, i) => ({
    cx: ((i * 137) % 1200),
    cy: ((i * 211) % 700),
    r: 1.5 + ((i * 13) % 3),
  }));
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <svg viewBox="0 0 1200 700" className="absolute inset-0 h-full w-full opacity-60">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {nodes.map((n, i) =>
          nodes.slice(i + 1, i + 3).map((m, j) => (
            <line key={`${i}-${j}`} x1={n.cx} y1={n.cy} x2={m.cx} y2={m.cy}
              stroke="url(#edgeGrad)" strokeWidth="0.6" className="animate-dash" />
          ))
        )}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r * 4} fill="url(#nodeGlow)" opacity="0.5" />
            <circle cx={n.cx} cy={n.cy} r={n.r} fill="#22D3EE">
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
      {/* floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/60"
          initial={{ x: `${(i * 53) % 100}%`, y: `${(i * 79) % 100}%`, opacity: 0 }}
          animate={{ y: ["100%", "-10%"], opacity: [0, 1, 0] }}
          transition={{ duration: 10 + (i % 6), repeat: Infinity, delay: i * 0.4, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function AICore() {
  return (
    <div className="relative mx-auto h-[420px] w-[420px] max-w-full">
      {/* outer ring */}
      <div className="absolute inset-0 animate-spin-slower rounded-full border border-white/10" />
      <div className="absolute inset-6 animate-spin-slow rounded-full border border-white/10" />
      <div className="absolute inset-12 animate-spin-slower rounded-full border border-dashed border-[var(--neon-cyan)]/30" />

      {/* orbiting dots */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: i % 2 ? "#22D3EE" : "#8B5CF6",
            boxShadow: `0 0 20px ${i % 2 ? "#22D3EE" : "#8B5CF6"}`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear" }}
          // orbit using transform-origin via offset
        >
          <div style={{ transform: `translateX(${140 + i * 18}px)` }} className="h-3 w-3" />
        </motion.div>
      ))}

      {/* core */}
      <div className="absolute inset-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-3xl glass-strong glow-violet animate-float-slow">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--neon-blue)]/30 via-transparent to-[var(--neon-violet)]/30" />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-2">
          <Cpu className="h-10 w-10 text-[var(--neon-cyan)]" />
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">AI Systems</div>
          <div className="text-xs font-mono text-[var(--neon-cyan)]">production</div>
        </div>
        {/* corner pins */}
        {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(p => (
          <div key={p} className={`absolute ${p} h-2 w-2 m-1 rounded-full bg-[var(--neon-cyan)] glow-cyan`} />
        ))}
      </div>

      {/* floating status indicators */}
      <motion.div
        animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-10 rounded-xl glass px-3 py-2 text-[11px] font-mono"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)] glow-cyan mr-2" />
        <span className="text-foreground">Production Ready</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-12 w-44 rounded-xl glass p-3 text-[11px] font-mono space-y-1.5"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)]" />
          <span className="text-muted-foreground">FastAPI Services</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-violet)]" />
          <span className="text-muted-foreground">LLM Pipelines</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-blue)]" />
          <span className="text-muted-foreground">Research Published</span>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-8 top-4 rounded-xl glass px-3 py-2 text-[10px] font-mono text-[var(--neon-violet)]"
      >
        ● Systems Online
      </motion.div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const metrics = [
    { label: "Production AI Systems", value: "4" },
    { label: "Hackathon Winner", value: "5×" },
    { label: "Published Research", value: "ICAML 2025" },
    { label: "AI & Data Science", value: "Internships" },
  ];

  return (
    <div id="top" ref={ref} className="relative min-h-screen pt-32">
      <NeuralBackground />
      <motion.div style={{ y, opacity }} className="relative mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-cyan)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon-cyan)]" />
            </span>
            Hyderabad, India · Available for AI Engineering roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]"
          >
            <span className="text-gradient">Hitesh</span>{" "}
            <span className="text-gradient-primary">Gottapu</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-3 text-xl font-medium text-foreground/90 md:text-2xl"
          >
            AI Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Production AI systems · Backend engineering · Enterprise data engineering · LLM applications · AI infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#" variant="ghost">
              <FileDown className="h-4 w-4" /> Resume
            </MagneticButton>
            <MagneticButton href="https://github.com/hiteshgottapu" variant="ghost">
              <Github className="h-4 w-4" /> GitHub
            </MagneticButton>
            <MagneticButton href="https://linkedin.com/in/hiteshgottapu" variant="ghost">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </MagneticButton>
            <MagneticButton href="#contact" variant="accent">
              Hire Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {metrics.map(m => (
              <div key={m.label} className="rounded-2xl glass p-4">
                <div className="text-2xl font-semibold text-gradient-primary">{m.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <AICore />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground"
      >
        scroll ↓
      </motion.div>
    </div>
  );
}

/* ============================================================================
 * ABOUT - timeline
 * ========================================================================== */
function About() {
  const items = [
    { year: "ICAML 2025", title: "Published Research", subtitle: "Peer-reviewed paper on applied AI systems.", icon: FlaskConical },
    { year: "5×", title: "Hackathon Winner", subtitle: "Applied AI under tight constraints and shipping pressure.", icon: Award },
    { year: "Now", title: "NeuzenAI — AI / Data Science Engineer Intern", subtitle: "Production AI pipelines, LLM evaluation, schema validation, FastAPI services, inference optimization.", icon: Brain },
    { year: "Past", title: "Megaminds IT Services — Data Science Developer Intern", subtitle: "ML, NER, FastAPI, fraud detection workflows, Python, SQL.", icon: Database },
    { year: "Edu", title: "B.Tech — AI & Data Science", subtitle: "Foundations across ML, systems, and data engineering.", icon: Code2 },
  ];
  return (
    <Section id="about">
      <SectionLabel icon={Brain}>About</SectionLabel>
      <SectionHeading>
        Engineering AI systems that<br />ship to production.
      </SectionHeading>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        I design and ship production AI systems — backend services, enterprise data platforms,
        and LLM applications wired for reliability and scale. I focus on system design,
        evaluation, and the engineering decisions that make AI actually work in production.
      </p>

      <div className="relative mt-20">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--neon-violet)]/60 to-transparent md:left-1/2" />
        <div className="space-y-10">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`relative pl-12 md:pl-0 ${i % 2 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                <div className="absolute left-2 top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-violet)] glow-violet md:left-1/2" />
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--neon-cyan)]">
                    <it.icon className="h-4 w-4" />
                    {it.year}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">{it.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{it.subtitle}</p>
                </div>
              </div>
              <div />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
 * PROJECTS - holographic tilt cards
 * ========================================================================== */
type Project = {
  name: string; tagline: string; icon: any;
  stack: string[]; description: string;
  challenges: string; results: string;
  accent: string;
};

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 120, damping: 12 });
  const ry = useSpring(0, { stiffness: 120, damping: 12 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10); rx.set(-py * 10);
  }
  function handleLeave() { rx.set(0); ry.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${p.accent}, transparent)` }} />
      <div className="relative h-full overflow-hidden rounded-3xl glass-strong p-8 transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(139,92,246,0.4)]">
        {/* corner glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
          style={{ background: p.accent }} />

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass">
            <p.icon className="h-7 w-7" style={{ color: p.accent }} />
          </div>
          <div className="flex gap-2 opacity-60 transition-opacity group-hover:opacity-100">
            <a href="#" className="rounded-full glass p-2"><Github className="h-4 w-4" /></a>
            <a href="#" className="rounded-full glass p-2"><ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight">{p.name}</h3>
        <p className="mt-1 text-sm text-[var(--neon-cyan)] font-mono">{p.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

        {/* mini architecture flow */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5">
          {p.stack.slice(0, 6).map((s, idx) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-mono text-muted-foreground border border-white/5">{s}</span>
              {idx < Math.min(p.stack.length, 6) - 1 && <ChevronRight className="h-3 w-3 text-white/20" />}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Challenge</div>
            <div className="mt-1 text-xs leading-relaxed">{p.challenges}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Result</div>
            <div className="mt-1 text-xs leading-relaxed">{p.results}</div>
          </div>
        </div>

        <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--neon-cyan)] hover:gap-2.5 transition-all">
          Open case study <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

function Projects() {
  const projects: Project[] = [
    {
      name: "FluxAI", tagline: "Enterprise Marketing Intelligence Platform", icon: Workflow,
      stack: ["OAuth 2.0", "FastAPI", "AWS", "Snowflake", "Medallion", "Multi-tenant"],
      description: "Multi-tenant data engineering platform unifying paid, organic, and CRM sources into AI-ready datasets on a medallion architecture, with OAuth 2.0 secured ingestion and FastAPI services.",
      challenges: "Multi-tenant ingestion with strict isolation, schema drift handling, and a clean bronze → silver → gold lineage.",
      results: "Backend + data engineering platform exposing governed, AI-ready datasets through FastAPI APIs.",
      accent: "#3B82F6",
    },
    {
      name: "Brahmo", tagline: "Legal AI Safety Engine", icon: Shield,
      stack: ["FastAPI", "pgvector", "RAG", "Citation Verification", "AI Safety", "Dual-loop"],
      description: "Dual-loop architecture pairing retrieval with a deterministic verifier that grounds every legal claim before it leaves the model.",
      challenges: "Designing a non-LLM verification loop that catches unsupported citations without sacrificing response quality.",
      results: "Designed to minimize hallucinations through deterministic validation, with grounded refusals when sources do not support the claim.",
      accent: "#8B5CF6",
    },
    {
      name: "MedScript", tagline: "Healthcare AI Platform", icon: FlaskConical,
      stack: ["OCR", "Clinical NER", "Vector Search", "Gemini", "FastAPI", "Patient UX"],
      description: "Prescription image → OCR → clinical entity extraction → structured medical records → vector search → LLM → patient-friendly response. A full production pipeline, not a single model call.",
      challenges: "Robust OCR on noisy clinical scans, drug-name disambiguation, structured record extraction, and safe routing of model outputs.",
      results: "End-to-end clinical workflow from image upload to structured, patient-friendly guidance.",
      accent: "#22D3EE",
    },
    {
      name: "QLoRA Fine-Tuning", tagline: "LLM Engineering", icon: Zap,
      stack: ["Qwen2.5", "QLoRA", "PEFT", "4-bit NF4", "CodeAlpaca", "Eval Pipeline"],
      description: "Parameter-efficient fine-tuning of Qwen2.5 on CodeAlpaca with 4-bit NF4 quantization, PEFT adapters, and a structured evaluation pipeline.",
      challenges: "Memory-efficient training on commodity GPUs and disciplined evaluation across capability and regression axes.",
      results: "0.28% trainable parameters · 4-bit NF4 quantization · reproducible PEFT pipeline with eval harness.",
      accent: "#3B82F6",
    },
  ];

  return (
    <Section id="projects">
      <SectionLabel icon={Sparkles}>Featured Projects</SectionLabel>
      <div className="flex items-end justify-between gap-8 flex-wrap">
        <SectionHeading>Production systems,<br />not demos.</SectionHeading>
        <p className="max-w-md text-sm text-muted-foreground">
          A selection of AI systems I've architected and shipped. Each ships with evals, observability, and an opinion.
        </p>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
      </div>
    </Section>
  );
}

/* ============================================================================
 * ENGINEERING PRINCIPLES
 * ========================================================================== */
function Principles() {
  const cards = [
    {
      title: "Reliability", icon: Shield, accent: "#22D3EE",
      desc: "Systems built with input validation, schema enforcement, graceful failure handling, and deterministic checks before model output reaches users.",
    },
    {
      title: "Scalability", icon: Network, accent: "#3B82F6",
      desc: "Async APIs, modular service boundaries, cloud-native deployment, and reusable components designed to grow with usage.",
    },
    {
      title: "Observability", icon: FlaskConical, accent: "#8B5CF6",
      desc: "Evaluation pipelines, structured logging, monitoring hooks, and reproducible runs so system behavior stays measurable over time.",
    },
  ];
  return (
    <Section id="principles">
      <SectionLabel icon={Sparkles}>Engineering Principles</SectionLabel>
      <SectionHeading>How I build for<br />production.</SectionHeading>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl glass-strong p-7"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
              style={{ background: c.accent }} />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl glass">
              <c.icon className="h-6 w-6" style={{ color: c.accent }} />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================================
 * ARCHITECTURE showcase
 * ========================================================================== */
function Architecture() {
  const nodes = [
    { id: "ocr", label: "OCR", x: 60, y: 80 },
    { id: "ner", label: "NER", x: 220, y: 80 },
    { id: "emb", label: "Embeddings", x: 380, y: 80 },
    { id: "vec", label: "Vector DB", x: 540, y: 80 },
    { id: "rag", label: "RAG", x: 700, y: 80 },
    { id: "llm", label: "Gemini", x: 860, y: 80 },
    { id: "out", label: "Response", x: 1020, y: 80 },
  ];
  return (
    <Section id="architecture">
      <SectionLabel icon={Network}>Architecture</SectionLabel>
      <SectionHeading>Systems thinking,<br />wired end-to-end.</SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9 }}
        className="mt-16 overflow-x-auto rounded-3xl glass-strong p-10"
      >
        <svg viewBox="0 0 1100 220" className="min-w-[900px] w-full">
          <defs>
            <linearGradient id="flowGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {/* edges */}
          {nodes.slice(0, -1).map((n, i) => {
            const m = nodes[i + 1];
            return (
              <g key={n.id}>
                <line x1={n.x + 50} y1={n.y + 20} x2={m.x - 10} y2={m.y + 20}
                  stroke="url(#flowGrad)" strokeWidth="1.5" className="animate-dash" opacity="0.7" />
                {/* moving dot */}
                <circle r="3" fill="#22D3EE">
                  <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"
                    path={`M${n.x + 50},${n.y + 20} L${m.x - 10},${m.y + 20}`} />
                </circle>
              </g>
            );
          })}
          {nodes.map((n, i) => (
            <g key={n.id}>
              <rect x={n.x - 10} y={n.y} width="80" height="40" rx="10"
                fill="rgba(11,17,32,0.8)" stroke="rgba(255,255,255,0.1)" />
              <text x={n.x + 30} y={n.y + 25} textAnchor="middle" fontSize="12" fill="#fff"
                fontFamily="JetBrains Mono">{n.label}</text>
              <circle cx={n.x + 30} cy={n.y - 8} r="3" fill={i % 2 ? "#8B5CF6" : "#22D3EE"}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </circle>
            </g>
          ))}
        </svg>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: "Ingestion", desc: "Streaming + batch, multi-tenant isolation, lineage tracking." },
            { title: "Retrieval", desc: "Hybrid BM25 + dense, query rewriting, recursive context expansion." },
            { title: "Safety", desc: "Citation verification, refusal policies, PII redaction." },
          ].map(c => (
            <div key={c.title} className="rounded-2xl bg-white/[0.02] p-5 border border-white/5">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--neon-cyan)]">{c.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ============================================================================
 * SKILLS - tech matrix
 * ========================================================================== */
function Skills() {
  const categories: { name: string; icon: any; items: string[] }[] = [
    { name: "AI Engineering", icon: Brain, items: [
      "PyTorch", "Transformers", "scikit-learn", "Model Evaluation", "Schema Validation", "Inference Optimization",
    ]},
    { name: "LLM Engineering", icon: Sparkles, items: [
      "OpenAI", "Anthropic", "Gemini", "Qwen2.5", "QLoRA", "PEFT", "BitsAndBytes", "RAG", "Citation Verification",
    ]},
    { name: "Backend", icon: Code2, items: [
      "FastAPI", "Python", "Node.js", "PostgreSQL", "pgvector", "REST", "OAuth 2.0",
    ]},
    { name: "Cloud", icon: Cloud, items: [
      "AWS", "S3", "EC2", "Lambda", "IAM",
    ]},
    { name: "Data Engineering", icon: Database, items: [
      "Snowflake", "Medallion Architecture", "ETL", "SQL", "Multi-tenant Pipelines",
    ]},
    { name: "Computer Vision", icon: Layers, items: [
      "OCR", "Clinical NER", "Image Preprocessing", "Document Understanding",
    ]},
    { name: "Infrastructure", icon: GitBranch, items: [
      "Docker", "GitHub Actions", "Linux", "Observability", "Reliability",
    ]},
  ];
  return (
    <Section id="skills">
      <SectionLabel icon={Box}>Technology Matrix</SectionLabel>
      <SectionHeading>The full stack,<br />from kernels to UI.</SectionHeading>

      <div className="mt-16 space-y-6">
        {categories.map((c, idx) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            className="grid items-center gap-6 rounded-2xl glass p-6 md:grid-cols-[220px_1fr]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--neon-blue)]/20 to-[var(--neon-violet)]/20 border border-white/10">
                <c.icon className="h-5 w-5 text-[var(--neon-cyan)]" />
              </div>
              <div>
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.items.length} tools</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {c.items.map(it => (
                <motion.div
                  key={it}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="group relative cursor-default rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs transition-colors hover:border-[var(--neon-cyan)]/40 hover:bg-[var(--neon-cyan)]/10"
                >
                  {it}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================================
 * EXPERIENCE timeline
 * ========================================================================== */
function Experience() {
  const roles = [
    {
      co: "NeuzenAI",
      role: "AI / Data Science Engineer Intern",
      date: "Internship",
      impact: "Production AI pipelines, LLM evaluation, schema validation, FastAPI services, and inference optimization for shipping AI features.",
      tech: ["FastAPI", "LLM Evaluation", "Schema Validation", "Inference Optimization", "Python"],
    },
    {
      co: "Megaminds IT Services",
      role: "Data Science Developer Intern",
      date: "Internship",
      impact: "ML components for fraud detection, NER pipelines, and data workflows served behind FastAPI endpoints.",
      tech: ["Machine Learning", "NER", "Fraud Detection", "FastAPI", "Python", "SQL"],
    },
  ];
  return (
    <Section id="experience">
      <SectionLabel icon={Calendar}>Experience</SectionLabel>
      <SectionHeading>Where I've shipped.</SectionHeading>
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {roles.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl glass-strong p-6 transition-transform hover:-translate-y-1"
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--neon-violet)]/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--neon-cyan)]">{r.date}</div>
                <h3 className="mt-1 text-xl font-semibold">{r.role}</h3>
                <div className="text-sm text-muted-foreground">{r.co}</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl glass">
                <Cpu className="h-4 w-4 text-[var(--neon-cyan)]" />
              </div>
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">Key Contributions</div>
            <p className="mt-1 text-sm leading-relaxed">{r.impact}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {r.tech.map(t => (
                <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================================
 * RESEARCH + GITHUB
 * ========================================================================== */
function Research() {
  return (
    <Section id="research">
      <SectionLabel icon={FlaskConical}>Research</SectionLabel>
      <SectionHeading>Published, peer-reviewed.</SectionHeading>

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-3xl glass-strong p-8"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[var(--neon-violet)]/15 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[var(--neon-violet)]">ICAML 2025</span>
            <span className="text-xs text-muted-foreground">Conference paper</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold leading-tight">
            Published research on applied AI systems
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Peer-reviewed work presented at ICAML 2025, exploring practical architectures for production-grade AI systems.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/5">
              <div className="text-lg font-semibold text-gradient-primary">ICAML</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Venue</div>
            </div>
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/5">
              <div className="text-lg font-semibold text-gradient-primary">2025</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Year</div>
            </div>
            <div className="rounded-xl bg-white/[0.03] p-4 border border-white/5">
              <div className="text-lg font-semibold text-gradient-primary">Applied AI</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Track</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <MagneticButton href="#" variant="primary">
              <FileDown className="h-4 w-4" /> Download PDF
            </MagneticButton>
            <MagneticButton href="#" variant="ghost">
              <ExternalLink className="h-4 w-4" /> View on arXiv
            </MagneticButton>
          </div>
        </motion.div>

        {/* GitHub mini dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-3xl glass-strong p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              <span className="font-semibold">GitHub Analytics</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">@hiteshgottapu</span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { v: "—", l: "Stars", i: Star },
              { v: "—", l: "Commits", i: GitCommit },
              { v: "—", l: "Repos", i: GitBranch },
            ].map(s => (
              <div key={s.l} className="rounded-xl bg-white/[0.03] p-4 border border-white/5">
                <s.i className="mx-auto h-4 w-4 text-[var(--neon-cyan)]" />
                <div className="mt-2 text-xl font-semibold">{s.v}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          {/* contribution heatmap */}
          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Contributions</div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {Array.from({ length: 7 * 24 }).map((_, i) => {
                const intensity = ((i * 53) % 5) / 4;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.003 }}
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{
                      background: intensity < 0.1
                        ? "rgba(255,255,255,0.04)"
                        : `color-mix(in oklab, var(--neon-cyan) ${intensity * 80}%, rgba(11,17,32,0.6))`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* language bar */}
          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Languages</div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div style={{ width: "48%", background: "#3B82F6" }} />
              <div style={{ width: "26%", background: "#22D3EE" }} />
              <div style={{ width: "16%", background: "#8B5CF6" }} />
              <div style={{ width: "10%", background: "#64748b" }} />
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-[10px] font-mono text-muted-foreground">
              <span><span className="inline-block h-2 w-2 rounded-full mr-1.5" style={{ background: "#3B82F6" }} />Python 48%</span>
              <span><span className="inline-block h-2 w-2 rounded-full mr-1.5" style={{ background: "#22D3EE" }} />TypeScript 26%</span>
              <span><span className="inline-block h-2 w-2 rounded-full mr-1.5" style={{ background: "#8B5CF6" }} />Rust 16%</span>
              <span><span className="inline-block h-2 w-2 rounded-full mr-1.5" style={{ background: "#64748b" }} />Other 10%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ============================================================================
 * CONTACT - terminal
 * ========================================================================== */
function Contact() {
  const lines = [
    { p: "$", t: "initialize_contact --user=hitesh" },
    { p: ">", t: "establishing secure channel..." },
    { p: ">", t: "channel ready ✓" },
    { p: "$", t: "connect --target=hitesh.gottapu" },
    { p: ">", t: "handshake complete" },
    { p: "$", t: "deploy --intent=collaborate" },
  ];
  const endpoints = [
    { k: "email", v: "hitesh@gottapu.ai", icon: Mail, href: "mailto:hitesh@gottapu.ai" },
    { k: "github", v: "github.com/hiteshgottapu", icon: Github, href: "https://github.com/hiteshgottapu" },
    { k: "linkedin", v: "linkedin.com/in/hiteshgottapu", icon: Linkedin, href: "https://linkedin.com/in/hiteshgottapu" },
    { k: "resume", v: "resume.pdf", icon: FileDown, href: "#" },
    { k: "portfolio", v: "hiteshgottapu.dev", icon: ExternalLink, href: "#" },
  ];
  return (
    <Section id="contact">
      <SectionLabel icon={Terminal}>Contact</SectionLabel>
      <SectionHeading>Let's build something<br />that actually ships.</SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }}
        className="mt-16 overflow-hidden rounded-3xl glass-strong"
      >
        <div className="flex items-center gap-2 border-b border-white/5 bg-black/30 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs font-mono text-muted-foreground">hitesh@aicore — bash</span>
        </div>
        <div className="p-8 font-mono text-sm">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.4, duration: 0.4 }}
              className="flex gap-3"
            >
              <span className="text-[var(--neon-violet)]">{l.p}</span>
              <span className={l.p === "$" ? "text-foreground" : "text-muted-foreground"}>{l.t}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: lines.length * 0.4 + 0.2 }}
            className="mt-6 grid gap-3 md:grid-cols-2"
          >
            {endpoints.map(e => (
              <a key={e.k} href={e.href}
                className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-[var(--neon-cyan)]/40 hover:bg-[var(--neon-cyan)]/5">
                <div className="flex items-center gap-3">
                  <e.icon className="h-4 w-4 text-[var(--neon-cyan)]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{e.k}</div>
                    <div className="text-xs text-foreground">{e.v}</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-[var(--neon-cyan)]" />
              </a>
            ))}
          </motion.div>
          <div className="mt-6 flex gap-2">
            <span className="text-[var(--neon-violet)]">$</span>
            <span className="text-foreground">_</span>
            <span className="ml-[-4px] inline-block h-4 w-2 bg-[var(--neon-cyan)] animate-blink" />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ============================================================================
 * FOOTER
 * ========================================================================== */
function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-violet)] animate-pulse-glow glow-violet" />
            <div className="absolute inset-[3px] rounded-[5px] bg-background flex items-center justify-center">
              <Cpu className="h-3.5 w-3.5 text-[var(--neon-cyan)]" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Hitesh Gottapu · Hyderabad, India
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[Github, Linkedin, Mail].map((I, i) => (
            <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full glass transition-colors hover:bg-white/10">
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ============================================================================
 * ROOT EXPORT
 * ========================================================================== */
export default function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <CursorGlow />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Architecture />
      <Skills />
      <Experience />
      <Research />
      <Contact />
      <Footer />
    </main>
  );
}
