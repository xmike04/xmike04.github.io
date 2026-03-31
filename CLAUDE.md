# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start dev server on port 9002 (Turbopack)
npm run build         # Production build
npm run lint          # ESLint
npm run typecheck     # TypeScript check (tsc --noEmit)

npm run genkit:dev    # Start Genkit AI flows dev server
npm run genkit:watch  # Watch mode for Genkit flows
```

No test runner is configured (no Jest/Vitest).

## Architecture

**Next.js 15 App Router** personal portfolio with integrated AI chatbot powered by Google Genkit + Gemini 2.0 Flash.

### Single Source of Truth

`src/lib/resume-data.ts` is the central data file (~10k LOC). It exports:
- `resumeData` — structured object driving all homepage sections and dynamic `/item/[id]` detail pages
- `resumeText` — raw string passed as context to the AI chatbot

When adding work experience, projects, or skills, this is the only file to update for data changes.

### Data Flow

1. **Homepage** (`src/app/page.tsx`) renders sections (Hero, About, Skills, Experience, AI Playground, Education, Contact) from `resumeData`
2. **Detail pages** (`src/app/item/[id]/page.tsx`) use dynamic routing — `[id]` must match entry IDs defined in `resume-data.ts`
3. **Chatbot**: Client UI → `positiveChatbotAction` server action (`src/lib/actions.ts`) → Genkit flow (`src/ai/flows/positive-chatbot.ts`) → Google Gemini API

### AI Layer

- `src/ai/genkit.ts` — Genkit instance configured with Google AI plugin
- `src/ai/flows/positive-chatbot.ts` — Flow definition with Zod input/output schemas; uses `resumeText` as context
- `src/lib/actions.ts` — Server action that wraps the Genkit flow for client consumption
- Requires `GEMINI_API_KEY` environment variable (see `.env`)

### Component Patterns

- Server Components for layout and static content
- `'use client'` for interactive features: chatbot dialog, AI playground games, carousel
- `src/components/ui/` — Shadcn/Radix UI primitives (don't modify these directly)
- Path alias `@/*` maps to `src/*`

### Key Config Notes

- `next.config.ts` ignores TypeScript and ESLint build errors — use `npm run typecheck` and `npm run lint` manually
- Allowed remote image domains: `placehold.co`, `picsum.photos`
- Dark mode toggled via CSS class
