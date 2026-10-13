import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Brain,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Copy,
  Database,
  FileDown,
  GitBranch,
  Github,
  Layers,
  MapPin,
  Menu,
  ScanLine,
  ShieldCheck,
  X,
} from "lucide-react";
import ministerImg from "@/assets/minister-pemmasani.jpg";
import boardroomImg from "@/assets/miracle-boardroom.jpg";

const links = {
  email: "hiteshgottapu@gmail.com",
  github: "https://github.com/Hiteshgottapu",
  linkedin: "https://www.linkedin.com/in/hitesh-gottapu/",
  resume: "https://drive.google.com/file/d/1MkXXSoB_9CBG_1rlrRhZ_HNc79EQJxEa/view?usp=sharing",
  whatsapp: "https://wa.me/918143506309",
};

const navigation = [
  ["#projects", "Work"],
  ["#about", "About"],
  ["#experience", "Experience"],
  ["#research", "Research"],
] as const;

function ExternalLink({
  href,
  children,
  className,
  label,
  analyticsId,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
  analyticsId?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
      data-analytics={analyticsId}
    >
      {children}
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !mobileNav.current?.contains(event.target))
        setOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);
  return (
    <header className="site-header">
      <nav className="page-width nav-inner" aria-label="Main navigation">
        <a href="#top" className="wordmark" aria-label="Hitesh Gottapu, back to top">
          <span className="monogram">
            h<span>.</span>
          </span>
          <span>
            Hitesh Gottapu<span className="wordmark-sub">AI Systems Engineer</span>
          </span>
        </a>
        <div className="desktop-nav">
          {navigation.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav-contact">
          Let’s talk
          <ArrowUpRight size={16} />
        </a>
        <div className="mobile-nav" ref={mobileNav}>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div id="mobile-navigation" className="mobile-menu" hidden={!open}>
            {navigation.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
            <a href="#skills" onClick={() => setOpen(false)}>
              Toolkit
              <ArrowUpRight size={16} />
            </a>
            <a href="#contact" onClick={() => setOpen(false)}>
              Let’s talk
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

const orbitPaths = Array.from({ length: 32 }, (_, ring) => {
  const angle = (ring / 32) * Math.PI * 2;
  return Array.from({ length: 81 }, (_, step) => {
    const turn = (step / 80) * Math.PI * 2;
    const radius = 128 + 52 * Math.cos(turn);
    const x = radius * Math.cos(angle),
      y = radius * Math.sin(angle),
      z = 52 * Math.sin(turn);
    return `${(250 + x * 0.88 + y * 0.37).toFixed(2)},${(244 + y * 0.42 - x * 0.19 + z * 1.35).toFixed(2)}`;
  }).join(" ");
});

function SystemSculpture() {
  return (
    <div className="system-sculpture" aria-hidden="true">
      <div className="sculpture-cross cross-one">+</div>
      <div className="sculpture-cross cross-two">+</div>
      <div className="sculpture-label sculpture-label-top">
        <span />
        SYSTEMS THINKING
      </div>
      <svg viewBox="0 0 500 480" className="orbit-art" fill="none">
        <defs>
          <linearGradient
            id="orbit-gradient"
            x1="60"
            y1="100"
            x2="420"
            y2="370"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ddfba0" />
            <stop offset=".45" stopColor="#a8c579" />
            <stop offset="1" stopColor="#37442c" />
          </linearGradient>
          <radialGradient id="orbit-halo">
            <stop stopColor="#c5f278" stopOpacity=".08" />
            <stop offset="1" stopColor="#c5f278" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="244" r="230" fill="url(#orbit-halo)" />
        <ellipse cx="250" cy="244" rx="219" ry="198" stroke="#34382e" strokeDasharray="2 8" />
        <path d="M30 244H470M250 28V459" stroke="#292d25" strokeDasharray="3 7" />
        <g className="orbit-mesh">
          {orbitPaths.map((points, index) => (
            <polyline
              key={index}
              points={points}
              stroke="url(#orbit-gradient)"
              strokeWidth=".8"
              opacity=".85"
            />
          ))}
          {Array.from({ length: 16 }, (_, index) => {
            const turn = (index / 16) * Math.PI * 2,
              radius = 128 + 52 * Math.cos(turn);
            return (
              <ellipse
                key={index}
                cx="250"
                cy={244 + 52 * Math.sin(turn) * 1.35}
                rx={radius * 0.955}
                ry={radius * 0.461}
                transform={`rotate(-8 250 ${244 + 52 * Math.sin(turn) * 1.35})`}
                stroke="url(#orbit-gradient)"
                strokeWidth=".65"
                opacity=".6"
              />
            );
          })}
        </g>
        <circle cx="250" cy="47" r="4" fill="#c5f278" />
        <circle cx="460" cy="304" r="3" fill="#c5f278" />
        <circle cx="46" cy="166" r="3" fill="#c5f278" />
        <path d="M250 229v30M235 244h30" stroke="#c5f278" />
      </svg>
      <div className="sculpture-label sculpture-label-bottom">
        <span className="tiny-square" />
        FROM COMPLEXITY TO CLARITY
      </div>
      <span className="sculpture-coordinate">01 / COMPUTATIONAL FORM</span>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero page-width" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="accent-line" />
            AI ENGINEER · HYDERABAD, INDIA
          </p>
          <h1 id="hero-title">
            Intelligence.
            <br />
            <span>Engineered.</span>
          </h1>
          <p className="hero-description">
            I’m Hitesh. I turn ambitious AI ideas into reliable systems — from the first data
            pipeline to the last production endpoint.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              Explore my work
              <ArrowDown size={17} />
            </a>
            <ExternalLink href={links.resume} className="button button-secondary">
              View résumé
              <ArrowUpRight size={17} />
            </ExternalLink>
          </div>
          <div className="hero-availability">
            <span className="status-dot" />
            Open to AI engineering opportunities
          </div>
        </div>
        <SystemSculpture />
      </div>
      <div className="hero-bottom">
        <span className="mono">BUILT WITH INTENTION. SHIPPED WITH PRECISION.</span>
        <a href="#projects">
          SCROLL TO EXPLORE
          <ArrowDown size={14} />
        </a>
      </div>
      <div className="metrics">
        <div>
          <strong>04</strong>
          <span>Production AI systems</span>
        </div>
        <div>
          <strong>
            05<span>×</span>
          </strong>
          <span>Hackathon winner</span>
        </div>
        <div>
          <strong>01</strong>
          <span>Research publication</span>
        </div>
        <div>
          <strong className="metric-text">
            End-to-end
            <ArrowUpRight size={22} />
          </strong>
          <span>From architecture to deployment</span>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">
          <span className="section-number">{number}</span>
          {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}

type Project = {
  id: string;
  name: string;
  category: "Data engineering" | "LLM engineering";
  tagline: string;
  description: string;
  stack: string[];
  challenge: string;
  outcome: string;
  github: string;
  docs: string;
  docsLabel: string;
  analyticsId: string;
};

const projects: Project[] = [
  {
    id: "flux",
    name: "FluxAI",
    category: "Data engineering",
    tagline: "Enterprise marketing intelligence",
    description:
      "Turning fragmented marketing data into governed, AI-ready datasets. A multi-tenant platform built at NeuzenAI.",
    stack: ["FastAPI", "Snowflake", "AWS", "OAuth 2.0", "Medallion", "Multi-tenant"],
    challenge:
      "Multi-tenant ingestion with strict isolation, schema drift handling, and a clean bronze → silver → gold lineage.",
    outcome:
      "Backend and data engineering platform exposing governed, AI-ready datasets through FastAPI APIs.",
    github: "https://github.com/Hiteshgottapu/FluxAI",
    docs: "https://www.notion.so/FluxAI-System-Architecture-My-Contributions-2f9cd2cd103c804f9da6f71c339803cc",
    docsLabel: "View architecture",
    analyticsId: "fluxai",
  },
  {
    id: "medscript",
    name: "MedScript",
    category: "LLM engineering",
    tagline: "Healthcare, made understandable",
    description:
      "From handwritten prescriptions to structured medical records and patient-friendly guidance. One connected AI pipeline.",
    stack: ["OCR", "Clinical NER", "Vector Search", "Gemini", "FastAPI", "Patient UX"],
    challenge:
      "Robust OCR on noisy clinical scans, drug-name disambiguation, structured record extraction, and safe routing of model outputs.",
    outcome:
      "An end-to-end clinical workflow from image upload to structured, patient-friendly guidance.",
    github: "https://github.com/Hiteshgottapu/Medscript",
    docs: "https://www.notion.so/MedScript-AI-Powered-Prescription-Intelligence-Platform-2fecd2cd103c80149534df7851f45c4a",
    docsLabel: "Technical documentation",
    analyticsId: "medscript",
  },
  {
    id: "brahmo",
    name: "Brahmo",
    category: "LLM engineering",
    tagline: "Trust is an engineering problem",
    description:
      "A legal AI safety engine that pairs retrieval with a deterministic verifier. Every citation has to earn its place.",
    stack: ["FastAPI", "pgvector", "RAG", "Citation Verification", "AI Safety", "Dual-loop"],
    challenge:
      "Designing a non-LLM verification loop that catches unsupported citations without sacrificing response quality.",
    outcome:
      "Designed to minimize hallucinations through deterministic validation, with grounded refusals when sources do not support the claim.",
    github: "https://github.com/Hiteshgottapu/brahmo-citation-safety",
    docs: "https://app.notion.com/p/BRAHMO-PLATFORM-ENTERPRISE-ARCHITECTURE-093c16e3e87d4052b8fe851395e2bcf2",
    docsLabel: "Enterprise architecture",
    analyticsId: "brahmo",
  },
  {
    id: "qlora",
    name: "QLoRA Fine-Tuning",
    category: "LLM engineering",
    tagline: "Small footprint. Focused intelligence.",
    description:
      "Adapting Qwen2.5-1.5B for coding Q&A with parameter-efficient fine-tuning, 4-bit quantization, and disciplined evaluation.",
    stack: ["Qwen2.5", "QLoRA", "PEFT", "4-bit NF4", "CodeAlpaca", "Eval Pipeline"],
    challenge:
      "Memory-efficient training on commodity GPUs and disciplined evaluation across capability and regression axes.",
    outcome:
      "0.28% trainable parameters, 4-bit NF4 quantization, and a reproducible PEFT pipeline with an evaluation harness.",
    github:
      "https://github.com/Hiteshgottapu/Domain-Adapting-Qwen2.5-1.5B-for-Coding-Q-A-Using-QLoRA",
    docs: "https://github.com/Hiteshgottapu/Domain-Adapting-Qwen2.5-1.5B-for-Coding-Q-A-Using-QLoRA",
    docsLabel: "Technical documentation",
    analyticsId: "qlora",
  },
];

function ProjectVisual({ id }: { id: string }) {
  return (
    <div className={`project-visual visual-${id}`} aria-hidden="true">
      <div className="visual-heading">
        <span>
          <span className="tiny-square" />
          {id === "flux"
            ? "DATA ORCHESTRATION"
            : id === "medscript"
              ? "DOCUMENT INTELLIGENCE"
              : id === "brahmo"
                ? "CITATION SAFETY"
                : "PARAMETER-EFFICIENT TRAINING"}
        </span>
        <span>SCHEMATIC ↗</span>
      </div>
      {id === "flux" && (
        <div className="pipeline-visual">
          <div className="data-sources">
            <span>
              <Database size={13} />
              PAID ADS
            </span>
            <span>
              <AudioLines size={13} />
              ORGANIC
            </span>
            <span>
              <Layers size={13} />
              CRM DATA
            </span>
          </div>
          <div className="pipeline-connector">
            <i />
            <i />
            <i />
          </div>
          <div className="pipeline-core">
            <GitBranch size={22} />
            <span>
              FluxAI<small>INGEST · VALIDATE · TRANSFORM</small>
            </span>
          </div>
          <div className="medallion-layers">
            <span>BRONZE</span>
            <ArrowRight size={12} />
            <span>SILVER</span>
            <ArrowRight size={12} />
            <span>GOLD</span>
          </div>
        </div>
      )}
      {id === "medscript" && (
        <div className="document-visual">
          <div className="prescription">
            <span className="rx">Rx</span>
            <span className="document-line long" />
            <span className="document-line" />
            <span className="document-line medium" />
            <span className="document-line long" />
            <span className="scan-band" />
            <span className="document-footer">PRESCRIPTION INPUT</span>
          </div>
          <div className="document-arrow">
            <ScanLine size={24} />
            <ArrowRight size={18} />
          </div>
          <div className="record-output">
            <span className="record-title">
              <Check size={13} />
              STRUCTURED RECORD
            </span>
            <code>
              {"{"}
              <br />
              &nbsp; "entities": [...],
              <br />
              &nbsp; "records": [...],
              <br />
              &nbsp; "context": "retrieved"
              <br />
              {"}"}
            </code>
            <span className="record-caption">OCR → NER → RAG</span>
          </div>
        </div>
      )}
      {id === "brahmo" && (
        <div className="verification-visual">
          <div className="verification-shield">
            <ShieldCheck size={42} strokeWidth={1} />
          </div>
          <div className="verification-flow">
            <span>GENERATE</span>
            <span className="verification-bridge">↔</span>
            <span>VERIFY</span>
          </div>
          <div className="verification-checks">
            <span>
              <Check size={13} />
              Source retrieval
            </span>
            <span>
              <Check size={13} />
              Citation validation
            </span>
            <span>
              <Check size={13} />
              Grounded output
            </span>
          </div>
        </div>
      )}
      {id === "qlora" && (
        <div className="qlora-visual">
          <div className="parameter-grid">
            {Array.from({ length: 96 }, (_, i) => (
              <i key={i} className={i === 29 || i === 54 || i === 78 ? "parameter-active" : ""} />
            ))}
          </div>
          <div className="parameter-stat">
            <strong>
              0.28<span>%</span>
            </strong>
            <span>TRAINABLE PARAMETERS</span>
            <small>
              <span />
              4-BIT NF4 · QWEN2.5-1.5B
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <section id="projects" className="section page-width" aria-labelledby="work-title">
      <SectionHeader
        number="01"
        label="SELECTED WORK"
        title={
          <span id="work-title">
            Not just models.
            <br />
            <span className="muted-heading">Complete systems.</span>
          </span>
        }
      >
        A selection of things I’ve built — where machine intelligence meets real-world engineering.
      </SectionHeader>
      <div className="work-toolbar">
        <div className="project-filters" role="group" aria-label="Filter projects">
          {["All work", "LLM engineering", "Data engineering"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={filter === category ? "filter-active" : ""}
            >
              {category}
              <span>
                {category === "All work"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length}
              </span>
            </button>
          ))}
        </div>
        <span className="mono work-count" aria-live="polite">
          {String(visible.length).padStart(2, "0")} PROJECTS
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article key={project.id} className="project-card">
            <ProjectVisual id={project.id} />
            <div className="project-content">
              <div className="project-category">
                <span>{project.category}</span>
                <span>0{projects.indexOf(project) + 1}</span>
              </div>
              <h3>
                {project.name}
                <ArrowUpRight size={24} />
              </h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-description">{project.description}</p>
              <div className="tags">
                {project.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <details className="engineering-notes">
                <summary>
                  Engineering notes
                  <ChevronDown size={14} />
                </summary>
                <div>
                  <h4>The challenge</h4>
                  <p>{project.challenge}</p>
                  <h4>The outcome</h4>
                  <p>{project.outcome}</p>
                </div>
              </details>
              <div className="project-links">
                <ExternalLink
                  href={project.docs}
                  analyticsId={`project_${project.analyticsId}_${project.id === "medscript" || project.id === "qlora" ? "docs" : "architecture"}`}
                >
                  {project.docsLabel}
                  <ArrowUpRight size={15} />
                </ExternalLink>
                <ExternalLink
                  href={project.github}
                  label={`${project.name} GitHub repository`}
                  analyticsId={`project_${project.analyticsId}_github`}
                >
                  <Github size={16} />
                  Source code
                </ExternalLink>
              </div>
            </div>
          </article>
        ))}
      </div>
      <ExternalLink href={links.github} className="more-work">
        There’s more in the repository.
        <span>
          Explore GitHub
          <ArrowUpRight size={17} />
        </span>
      </ExternalLink>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="page-width">
        <SectionHeader
          number="02"
          label="A LITTLE ABOUT ME"
          title={
            <span id="about-title">
              Curiosity is the input.
              <br />
              <span className="muted-heading">Impact is the output.</span>
            </span>
          }
        />
        <div className="about-grid">
          <div className="about-statement">
            <span className="about-spark">✳</span>
            <p>
              I care about the space between
              <br />
              <em>“it works”</em> and
              <br />
              <em>“it works in production.”</em>
            </p>
            <span className="mono">
              <MapPin size={13} />
              BASED IN HYDERABAD, INDIA
            </span>
          </div>
          <div className="about-copy">
            <p>
              I’m an AI engineer working across backend services, enterprise data platforms, and LLM
              applications. I build the infrastructure that turns a promising model into a
              dependable product.
            </p>
            <p>
              My approach is hands-on and end-to-end: understand the problem, design the system,
              evaluate the trade-offs, and ship something that holds up in the real world.
            </p>
            <div className="about-facts">
              <div>
                <span className="mono">FOUNDATIONS</span>
                <strong>B.Tech in AI & Data Science</strong>
                <span>Seshadri Rao Gudlavalleru Engineering College</span>
              </div>
              <div>
                <span className="mono">BEYOND THE CODE</span>
                <strong>5× hackathon winner · GDG lead team</strong>
                <span>Building, collaborating, and learning in public.</span>
              </div>
            </div>
          </div>
        </div>
        <div id="principles" className="principles">
          {[
            {
              icon: ShieldCheck,
              title: "Reliability first",
              description:
                "Input validation, schema enforcement, and deterministic checks. Graceful failure is a feature, not an afterthought.",
            },
            {
              icon: Layers,
              title: "Designed to scale",
              description:
                "Async APIs, modular service boundaries, and cloud-native deployment. Build a foundation, not a workaround.",
            },
            {
              icon: ScanLine,
              title: "Make it observable",
              description:
                "Structured logs, evaluation pipelines, and reproducible runs. If you can’t measure it, you can’t improve it.",
            },
          ].map(({ icon: Icon, title, description }, index) => (
            <div key={title}>
              <div className="principle-top">
                <Icon size={23} strokeWidth={1.4} />
                <span className="mono">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <div id="architecture" className="architecture-strip">
          <span className="mono">THE SYSTEMS VIEW</span>
          <div>
            {["Ingest", "Transform", "Retrieve", "Generate", "Verify", "Serve"].map(
              (stage, index) => (
                <span key={stage}>
                  {index > 0 && <ArrowRight size={13} />}
                  <span>{stage}</span>
                </span>
              ),
            )}
          </div>
          <p>Isolated ingestion. Grounded retrieval. Verified output.</p>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const roles = [
    {
      company: "NeuzenAI",
      initials: "N",
      role: "AI / Data Science Engineer Intern",
      description:
        "Built and shipped FluxAI: multi-tenant marketing data pipelines, OAuth-secured ingestion, medallion architecture, and FastAPI services serving AI-ready datasets.",
      stack: ["Python", "FastAPI", "Snowflake", "AWS", "OAuth 2.0", "Medallion Architecture"],
    },
    {
      company: "Megaminds IT Services",
      initials: "M",
      role: "Data Science Developer Intern",
      description:
        "Developed machine learning components for fraud detection, entity extraction, and production data workflows served behind FastAPI endpoints.",
      stack: ["Machine Learning", "NER", "Fraud Detection", "FastAPI", "Python", "SQL"],
    },
  ];
  return (
    <section id="experience" className="section page-width" aria-labelledby="experience-title">
      <SectionHeader
        number="03"
        label="EXPERIENCE"
        title={
          <span id="experience-title">
            Learning by building.
            <br />
            <span className="muted-heading">Building for impact.</span>
          </span>
        }
      >
        Real teams. Real constraints. Engineering that moves beyond the notebook.
      </SectionHeader>
      <div className="experience-list">
        {roles.map((role) => (
          <article key={role.company} className="experience-row">
            <div className="company">
              <span className="company-icon">
                {role.initials}
                <span>↗</span>
              </span>
              <div>
                <h3>{role.company}</h3>
                <span className="mono">INTERNSHIP</span>
              </div>
            </div>
            <div className="role-content">
              <h4>{role.role}</h4>
              <p>{role.description}</p>
              <div className="tags">
                {role.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="resume-row">
        <p>The full story, on one page.</p>
        <ExternalLink href={links.resume}>
          View my résumé
          <FileDown size={17} />
        </ExternalLink>
      </div>
    </section>
  );
}

const skillGroups = [
  {
    icon: Brain,
    name: "AI engineering",
    items: [
      "PyTorch",
      "Transformers",
      "scikit-learn",
      "Model Evaluation",
      "Schema Validation",
      "Inference Optimization",
    ],
  },
  {
    icon: Code2,
    name: "LLM engineering",
    items: [
      "OpenAI",
      "Anthropic",
      "Gemini",
      "Qwen2.5",
      "QLoRA",
      "PEFT",
      "BitsAndBytes",
      "RAG",
      "Citation Verification",
    ],
  },
  {
    icon: GitBranch,
    name: "Backend systems",
    items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "pgvector", "REST", "OAuth 2.0"],
  },
  {
    icon: Database,
    name: "Data engineering",
    items: ["Snowflake", "Medallion Architecture", "ETL", "SQL", "Multi-tenant Pipelines"],
  },
  { icon: Cloud, name: "Cloud & deployment", items: ["AWS", "S3", "EC2", "Lambda", "IAM"] },
  {
    icon: ScanLine,
    name: "Computer vision",
    items: ["OCR", "Clinical NER", "Image Preprocessing", "Document Understanding"],
  },
  {
    icon: Layers,
    name: "Infrastructure",
    items: ["Docker", "GitHub Actions", "Linux", "Observability", "Reliability"],
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="section page-width skills-section"
      aria-labelledby="skills-title"
    >
      <SectionHeader
        number="04"
        label="THE TOOLKIT"
        title={
          <span id="skills-title">
            The right tools.
            <br />
            <span className="muted-heading">The whole picture.</span>
          </span>
        }
      >
        Across the stack, from raw data to reliable inference.
      </SectionHeader>
      <div className="skills-grid">
        {skillGroups.map(({ icon: Icon, name, items }) => (
          <div className="skill-group" key={name}>
            <h3>
              <Icon size={19} strokeWidth={1.5} />
              {name}
            </h3>
            <p>{items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecognitionImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    // Image errors can occur before hydration attaches the error handler.
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, []);

  return failed ? (
    <div className="recognition-fallback">
      <ShieldCheck size={28} />
      <span>{alt}</span>
    </div>
  ) : (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      loading="lazy"
      width="800"
      height="450"
      onError={() => setFailed(true)}
    />
  );
}

function Research() {
  return (
    <section id="research" className="section page-width" aria-labelledby="research-title">
      <SectionHeader
        number="05"
        label="RESEARCH & RECOGNITION"
        title={
          <span id="research-title">
            Beyond the build.
            <br />
            <span className="muted-heading">Into the conversation.</span>
          </span>
        }
      />
      <article className="research-card">
        <div className="paper-art" aria-hidden="true">
          <div className="paper-cover">
            <div className="paper-top">
              ICAML<span>2025</span>
            </div>
            <div className="paper-mark">✳</div>
            <strong>
              Making code
              <br />
              quality
              <br />
              explainable.
            </strong>
            <span className="paper-foot">MACHINE LEARNING × SOFTWARE ENGINEERING</span>
          </div>
        </div>
        <div className="research-content">
          <span className="research-badge">
            <span className="status-dot" />
            PEER-REVIEWED · ICAML 2025
          </span>
          <h3>
            Real-Time Code Quality Prediction with Explainable AI and Interactive Visualizations
          </h3>
          <p>
            A Streamlit framework combining machine learning with SHAP and LIME for software fault
            prediction — with interactive defect heatmaps and actionable recommendations.
          </p>
          <p className="research-authors">
            Gottapu Hitesh, Kodamala Bhanu, Banki Sambasiva, Dodda Rahul, Balla Manoj Venkata Sai
            <br />
            <span>Seshadri Rao Gudlavalleru Engineering College</span>
          </p>
          <ExternalLink
            href="https://psou.ac.in/asset/docs/files/202505161524319c90724728.pdf"
            className="text-link"
          >
            Read the proceedings
            <ArrowUpRight size={17} />
          </ExternalLink>
        </div>
      </article>
      <div className="recognition-grid">
        <figure>
          <div className="recognition-photo">
            <RecognitionImage
              src={ministerImg}
              alt="Hitesh presenting MedScript to Hon. Minister Dr. Chandra Sekhar Pemmasani"
            />
          </div>
          <figcaption>
            <span className="mono">MINISTERIAL RECOGNITION</span>
            <h3>AI with real-world healthcare impact.</h3>
            <p>
              MedScript demonstrated to Hon. Minister Dr. Chandra Sekhar Pemmasani at the GDG
              Solutions Challenge.
            </p>
          </figcaption>
        </figure>
        <figure>
          <div className="recognition-photo">
            <RecognitionImage
              src={boardroomImg}
              alt="Hitesh with executive leadership in the Miracle Software Systems boardroom"
            />
          </div>
          <figcaption>
            <span className="mono">FROM THE DEMO TO THE BOARDROOM</span>
            <h3>A seat at the enterprise table.</h3>
            <p>
              Presented MedScript to C-suite leadership at Miracle Software Systems for an
              enterprise healthcare AI review.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(links.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    timer.current = setTimeout(() => setCopyState("idle"), 3500);
  }
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="page-width">
        <div className="contact-top">
          <p className="eyebrow">
            <span className="section-number">06</span>WHAT’S NEXT?
          </p>
          <span className="contact-status">
            <span className="status-dot" />
            OPEN TO OPPORTUNITIES
          </span>
        </div>
        <h2 id="contact-title">
          Let’s build
          <br />
          something <span>that matters.</span>
          <ArrowUpRight className="contact-arrow" strokeWidth={1} />
        </h2>
        <div className="contact-bottom">
          <div>
            <p>
              Have a problem worth solving? A team worth joining?
              <br />
              I’d love to hear about it.
            </p>
            <div className="email-row">
              <a href={`mailto:${links.email}`}>
                {links.email}
                <ArrowUpRight size={21} />
              </a>
              <button onClick={copyEmail} aria-label="Copy email address" className="copy-button">
                {copyState === "copied" ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <span className="copy-status" role="status">
              {copyState === "copied"
                ? "Email copied."
                : copyState === "error"
                  ? "Couldn’t copy — select the email or use the link to get in touch."
                  : ""}
            </span>
          </div>
          <div className="contact-socials">
            <ExternalLink href={links.linkedin}>
              LinkedIn
              <ArrowUpRight size={17} />
            </ExternalLink>
            <ExternalLink href={links.github}>
              GitHub
              <ArrowUpRight size={17} />
            </ExternalLink>
            <ExternalLink href={links.whatsapp}>
              WhatsApp
              <ArrowUpRight size={17} />
            </ExternalLink>
            <ExternalLink href={links.resume}>
              Résumé
              <FileDown size={17} />
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="page-width footer">
      <a href="#top" className="footer-name">
        Hitesh Gottapu<span>© {new Date().getFullYear()}</span>
      </a>
      <span className="mono">THOUGHTFULLY ENGINEERED.</span>
      <a href="#top">
        Back to top
        <ArrowUpRight size={15} />
      </a>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Research />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
