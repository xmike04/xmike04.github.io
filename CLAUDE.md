# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start dev server on port 9002 (Turbopack)
npm run build         # Production build
npm run lint          # ESLint
npm run typecheck     # TypeScript check (tsc --noEmit)
```

No test runner is configured (no Jest/Vitest; `@playwright/test` is installed but has no config or specs yet).

## Architecture

**Next.js 15 App Router** personal portfolio with an integrated AI chatbot that calls the OpenAI API directly (`gpt-4o-mini` by default). Deployed on Vercel. There is no Genkit/Firebase/Gemini code — those dependencies were removed.

### Single Source of Truth

`src/lib/resume-data.ts` is the central data file. It exports `resumeData` — a structured object (plus its item/case-study types) driving the homepage sections, the `/item/[id]` detail pages, the print-friendly `/resume` page, and the chatbot's grounding context.

When adding work experience, projects, skills, education, or press, this is the only file to update for data changes.

### Data Flow

1. **Homepage** (`src/app/page.tsx`) renders sections (Hero, Stats, About, Skills, Experience, Flagship Projects, ML Lab, GitHub Showcase, Press, Education, Contact) from `resumeData`
2. **Detail pages** (`src/app/item/[id]/page.tsx`) use dynamic routing — `[id]` must match entry IDs defined in `resume-data.ts` (`mr-cooper-internship`, `nasa-waving-project`, `ragops-platform`, `simlyfe`)
3. **Resume page** (`src/app/resume/page.tsx`) renders an ATS-friendly printable resume entirely from `resumeData`
4. **Chatbot**: Client UI (`src/components/sections/chat-bot.tsx`) → `POST /api/chat` (`src/app/api/chat/route.ts`) → `positiveChatbotStream` / `positiveChatbot` (`src/ai/flows/positive-chatbot.ts`) → OpenAI API. The route streams plain-text deltas and falls back to a non-streaming JSON response on error.

### AI Layer

- `src/ai/flows/positive-chatbot.ts` — Zod-validated input/output, builds a resume-context prompt from `resumeData`, calls OpenAI's Responses API via `fetch`. Exports a streaming variant (`positiveChatbotStream`, returns a `ReadableStream` of text deltas) and a non-streaming fallback (`positiveChatbot`)
- Requires `OPENAI_API_KEY` (server-side only); `OPENAI_MODEL` optionally overrides the default `gpt-4o-mini` (see `.env.example`)
- When the key is missing or OpenAI fails, `/api/chat` returns a friendly JSON message — never a raw 500

### Component Structure

- `src/components/sections/` — homepage sections (hero stats strip, about terminal, skills, experience timeline, flagship projects, case-study view, GitHub showcase, press, education, contact, chat-bot, nav, footer)
- `src/components/hero/` — hero visuals
- `src/components/lab/` — interactive ML Lab demos
- `src/components/diagrams/` — architecture diagrams for case studies (`ragops`, `nasa`, `simlyfe`)
- `src/components/charts/` — metric charts (Recharts)
- `src/components/motion/` — animation primitives (Reveal, RevealGroup, CountUp, ScrollProgress, MagneticButton, SpotlightCard, TextScramble) built on `motion@12` (`motion/react`)
- `src/components/theme/` — next-themes provider and toggle (class strategy, dark default)
- `src/components/ui/` — Shadcn/Radix UI primitives (don't modify these directly)
- Path alias `@/*` maps to `src/*`

### Component Patterns

- Server Components for layout and static content
- `'use client'` for interactive features: chatbot dialog, ML Lab, resume print page, animated sections
- A global `MotionConfig reducedMotion="user"` degrades `motion/react` animations automatically; hand-rolled canvas/rAF/CSS animations must check `useReducedMotion()` or `prefers-reduced-motion` themselves

### Content Rules (do not violate)

- No fabricated metrics, links, or claims — content comes from `resumeData`
- NASA exhibit venue is "Kennedy Center, Washington, D.C." (never "Kennedy Space Center")
- RAGOps has no public repo — never link one (its `linksNote` explains a reference implementation is being prepared)
- The name is "Michael E. Marin"; the legacy title "Marin Insights" must not appear

### Key Config Notes

- `next.config.ts` ignores TypeScript and ESLint build errors — use `npm run typecheck` and `npm run lint` manually
- Environment variables are documented in `.env.example` (`OPENAI_API_KEY`, `OPENAI_MODEL`, `NEXT_PUBLIC_SITE_URL`, `GITHUB_TOKEN`)
- Dark mode toggled via CSS class (`next-themes`); design tokens and utility classes (`.glass`, `.glow-primary`, `.gradient-text`, `.mesh-bg`, …) live in `src/app/globals.css`
