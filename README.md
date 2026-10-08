# Michael Marin — Applied AI & ML Portfolio

Source for [michaelmportfolio.org](https://michaelmportfolio.org), an evidence-first portfolio covering applied AI engineering, computer vision, LLM system design, AI product evaluation, and cloud engineering.

## Local development

```bash
npm install
npm run dev
```

The site is built with Next.js 15. The repository is connected to both Vercel and Firebase App Hosting; the production custom domain is served by Firebase App Hosting. Public profile facts live in `src/lib/resume-data.ts`; canonical URLs and site-level metadata live in `src/lib/site.ts`.

## Verification

```bash
npm run audit:profile
npm run typecheck
npm run build
```

The profile audit catches known stale claims, checks core identity and availability facts, and verifies the discovery metadata used by search engines and AI search products.
