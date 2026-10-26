# Michael Marin — Applied AI & ML Portfolio

Source for [michaelmportfolio.org](https://michaelmportfolio.org), an evidence-first portfolio covering applied AI engineering, computer vision, LLM system design, AI product evaluation, and cloud engineering.

## Local development

```bash
npm install
npm run dev
```

The site is built with Next.js 15. The repository is connected to both Vercel and Firebase App Hosting; the production custom domain is served by Firebase App Hosting. Public profile facts live in `src/lib/resume-data.ts`; canonical URLs and site-level metadata live in `src/lib/site.ts`.

## Verification

Public claim sources, exact scope, review dates, and verification limits are maintained in [the evidence ledger](docs/evidence/claims.md). Headline statistics and flagship case studies link to it. Offline experiments, serving-path evidence, current CI, and historical production acceptance are separate evidence classes.

```bash
npm run audit:profile
npm run test:evidence
npm run typecheck
npm run build
```

The profile audit catches known stale claims, checks core identity and availability facts, and verifies the discovery metadata used by search engines and AI search products.

The audit flags incomplete evidence and review dates older than 90 days. Before publishing, run `npm run audit:profile -- --check-evidence-links` for source reachability. This network check is separate from deterministic CI; it cannot establish that a reachable page substantively proves a claim.
