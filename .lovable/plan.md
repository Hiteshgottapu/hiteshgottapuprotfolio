# Plan — Premium AI Engineer Portfolio (real content pass)

The current preview already has the design system, hero AI core, neural background, magnetic buttons, glass cards, animated architecture flow, tech matrix, terminal contact, and footer. This plan keeps all of that visual scaffolding and rewrites the **content + a few section structures** to match your real profile and remove anything that implies "years of experience" or invents numbers.

## What changes

### Hero
- Subtitle → "AI Engineer building production AI systems, enterprise data platforms, backend infrastructure, and Large Language Model applications."
- Status pill → "Hyderabad, India · Available for AI Engineering roles"
- CTAs → View Projects · Download Resume · GitHub · LinkedIn · Hire Me (magnetic, primary CTA is View Projects; GitHub/LinkedIn rendered as icon-ghost buttons so the row doesn't feel crowded)
- Floating metrics (replaces current 5-tile row): **4** Production AI Systems · **5×** Hackathon Winner · **1** Research Publication · **Enterprise** AI Engineering. No "years experience" anywhere.

### About
- Rewrite copy around production thinking, system design, backend, applied AI, reliability.
- Timeline reframed as **engineering milestones**, not a career-length story:
  - ICAML 2025 — Published Research
  - 5× Hackathon Winner — Applied AI under constraints
  - NeuzenAI — Production AI pipelines, LLM eval
  - Megaminds IT Services — ML, NER, Fraud Detection
  - B.Tech in AI & Data Science
- Removes fabricated dates like "2022 — Founding Engineer".

### Featured Projects
Keep the 3D tilt holographic cards, rewrite to your stacks:
- **FluxAI** — Enterprise Marketing Intelligence Platform · OAuth 2.0, FastAPI, AWS, Snowflake, Medallion, multi-tenant AI pipelines
- **Brahmo** — Legal AI Safety Engine · RAG, Citation Verification, AI Safety, FastAPI, PostgreSQL, pgvector, deterministic validation
- **MedScript** — Healthcare AI Platform · OCR, Computer Vision, Clinical Entity Extraction, Gemini, FastAPI
- **QLoRA Fine-Tuning** — LLM Engineering · Qwen2.5, QLoRA, PEFT, BitsAndBytes, Transformers, eval

"Challenge / Result" tiles rewritten to describe engineering decisions instead of invented accuracy numbers (e.g. "Result: Deterministic citation verification loop with grounded refusals" rather than "98.4% accuracy").

### Architecture Showcase
Keep the animated flow. Add a second flow tab so it represents the *kinds* of systems you build, not just the MedScript path:
- Flow A: OCR → CV → Clinical NER → Embeddings → pgvector → RAG → Gemini → Response
- Flow B: Source APIs → Ingestion → Bronze → Silver → Gold → Semantic Layer → LLM Insight

### Skills (Technology Matrix)
Rename + restructure categories to the ones you specified:
- AI Engineering · LLM Engineering · Backend · Cloud · Data Engineering · Computer Vision · Infrastructure
- Chips keep hover lift; remove the "Xy" experience labels so nothing implies years.

### Experience
Replace fabricated roles with the two real ones, presented professionally:
- **NeuzenAI** — Production AI pipelines, LLM evaluation, schema validation, FastAPI, inference optimization
- **Megaminds IT Services** — ML, NER, FastAPI, Fraud Detection, Python, SQL
No invented impact numbers; bullets describe the engineering surface.

### Research
- ICAML **2025** badge.
- Replace the made-up "98.4% accuracy / 42 citations / 12pp Δ" stat tiles with neutral metadata tiles: Venue · Year · Track. Keep Download PDF + arXiv buttons (hrefs left as `#` until you provide them).

### GitHub Analytics
Keep the dashboard look but mark it as a live embed slot:
- Heatmap + language bar stay as visual.
- Stat tiles (Stars/Commits/Repos) become placeholders bound to a `githubStats` object at the top of the file so you can drop in real numbers in one place (or wire to the GitHub API later).

### Contact (Terminal)
Add the three commands you listed to the typing sequence: `initialize_contact`, `connect`, `deploy`. Endpoint cards: Email, GitHub, LinkedIn, Resume, Portfolio (replaces Calendly).

### Footer
Update copyright line to "Hitesh Gottapu · Hyderabad, India".

## What stays exactly as-is
- Color tokens, glass/glow utilities, gradient text, grid background, cursor glow, magnetic buttons, nav, hero AI core + neural net, scroll/parallax behavior, framer-motion timings.

## What I will NOT add
- Three.js / R3F / Spline / GSAP / Lenis as new dependencies. The current build already reads as cinematic with Framer Motion + SVG + CSS, and adding them would be a heavy net-new direction rather than a content pass. If you want me to swap the hero core for a real R3F scene as a follow-up, that's a separate task — call it out and I'll do it next.
- Any number, percentage, or duration that isn't in your brief.

## Files touched
- `src/components/Portfolio.tsx` — content + small structural edits (metrics row, experience grid, research tiles, GitHub stat source, contact endpoints, skills categories, architecture second flow).
- No new files, no dependency changes.

## Acceptance check
- No string in the page implies years of experience.
- Hero metrics read exactly: 4 / 5× / 1 / Enterprise.
- Experience section shows only NeuzenAI and Megaminds.
- Research badge says ICAML 2025.
- Skill categories match the 7 you listed.
- Project stacks match the chips you listed (incl. pgvector, BitsAndBytes, Qwen2.5).
