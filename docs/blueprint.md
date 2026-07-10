# Michael E. Marin — Portfolio Blueprint

Personal AI/ML engineering portfolio built with Next.js 15 (App Router), React 18, Tailwind CSS 3.4, and shadcn/ui. Deployed on Vercel. Every section renders from a single data source: `src/lib/resume-data.ts`.

## Core Features

- **Hero + stats strip**: Animated introduction with count-up hero stats (Recall@10 gains, benchmark queries, test assertions, team leadership) sourced from `resumeData.heroStats`.
- **About terminal**: Terminal-styled about section with typing effects.
- **Skills**: Categorized skill groups plus a self-assessed proficiency radar chart (`resumeData.skillsRadar`).
- **Experience timeline**: Work history rendered from `resumeData.workExperience`.
- **Flagship project case studies**: NASA PACE "Wave: From Space to Ocean" exhibit (premiered at the Kennedy Center in Washington, D.C.), RAGOps hybrid-retrieval platform, and SIMLYFE LLM-driven life simulator — each with problem/constraints/approach narrative, architecture diagrams, and baseline-vs-achieved metric charts.
- **ML Lab**: Interactive in-browser ML demos (`src/components/lab/`).
- **GitHub showcase**: Live repository data from the GitHub REST API (optional `GITHUB_TOKEN` raises the rate limit).
- **Press section**: Third-party coverage links (NASA PACE, UMD) from `resumeData.press`.
- **AI chatbot**: Floating assistant grounded in the resume data. The client (`src/components/sections/chat-bot.tsx`) POSTs to `/api/chat`, which calls the OpenAI API directly (`gpt-4o-mini` by default, overridable via `OPENAI_MODEL`) and streams text deltas back, with a non-streaming JSON fallback. The API key stays server-side. Suggestion chips come from `resumeData.suggestedQuestions`.
- **Print-friendly resume**: `/resume` renders an ATS-friendly, single-column, white-background resume entirely from `resumeData`, with a Print / Save as PDF button.
- **Detail pages**: `/item/[id]` dynamic routes for work and project deep dives.
- **Responsive + accessible**: Mobile-first layout, aria labels, focus-visible styles, and reduced-motion support throughout.

## Style Guidelines

- **Dark-first theme** (next-themes, class strategy, dark default with a light-mode toggle). Tokens live in `src/app/globals.css`: background `228 32% 5%`, card `228 28% 8%`, primary electric cyan `189 95% 55%`, accent violet `265 89% 66%`.
- **Utility classes**: `.glass` (frosted card), `.glow-primary` / `.glow-accent` (layered glows), `.gradient-text` (cyan → violet), `.noise` (film grain), `.mesh-bg` (radial gradient mesh), `.grid-bg` (blueprint grid), `.spotlight` (pointer-tracked highlight).
- **Typography**: Space Grotesk (`font-headline`), Inter (`font-body`), JetBrains Mono (`font-mono`).
- **Motion**: `motion@12` (`motion/react`) with shared primitives in `src/components/motion/` (Reveal, RevealGroup, CountUp, ScrollProgress, MagneticButton, SpotlightCard, TextScramble). A global `MotionConfig reducedMotion="user"` degrades animations automatically; hand-rolled canvas/rAF/CSS animations check `useReducedMotion()` or `prefers-reduced-motion` themselves.

## Content Rules (non-negotiable)

- No fabricated metrics, links, or claims — everything traces back to `resumeData`.
- The NASA exhibit venue is the **Kennedy Center, Washington, D.C.** (never "Kennedy Space Center").
- RAGOps has **no public repository** — never link one; a reference implementation is being prepared (see its `linksNote`).
- SIMLYFE links: https://simlyfe.vercel.app and https://github.com/xmike04/SIMLYFE.
- The site is titled with the owner's name, "Michael E. Marin" — the legacy working title "Marin Insights" must not appear anywhere.
