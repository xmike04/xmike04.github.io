import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { auditEvidence } from './audit-evidence.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const files = {
  data: 'src/lib/resume-data.ts',
  socialCard: 'src/app/opengraph-image.tsx',
  terminal: 'src/components/sections/about-terminal.tsx',
  counter: 'src/components/motion/count-up.tsx',
  chatbot: 'src/ai/flows/positive-chatbot.ts',
  github: 'src/lib/github.ts',
  site: 'src/lib/site.ts',
  layout: 'src/app/layout.tsx',
  robots: 'src/app/robots.ts',
  hero: 'src/components/hero/hero-section.tsx',
  contact: 'src/components/sections/contact-section.tsx',
  item: 'src/app/item/[id]/page.tsx',
  flagship: 'src/components/sections/flagship-projects.tsx',
};

const content = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([key, relativePath]) => [
      key,
      await readFile(path.join(root, relativePath), 'utf8'),
    ])
  )
);

// Inspect every public source surface, including social images and project panels.
// A fixed allowlist missed independent hardcoded claims in those two surfaces.
async function readPublicSource(directory) {
  const parts = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) parts.push(...await readPublicSource(absolutePath));
    else if (/\.tsx?$/.test(entry.name)) parts.push(await readFile(absolutePath, 'utf8'));
  }
  return parts;
}
const combined = (await readPublicSource(path.join(root, 'src'))).join('\n');
const failures = [];

function requireMatch(label, text, pattern) {
  if (!pattern.test(text)) failures.push(`Missing ${label}`);
}

function forbidMatch(label, text, pattern) {
  if (pattern.test(text)) failures.push(`Stale or unsupported claim found: ${label}`);
}

requireMatch('canonical portfolio domain', content.site, /https:\/\/michaelmportfolio\.org/);
requireMatch('Summer 2027 graduation estimate', content.data, /Expected Summer 2027/);
requireMatch('Summer 2027 social card', content.socialCard, /Summer 2027/);
requireMatch('Summer 2027 terminal', content.terminal, /Summer 2027/);
requireMatch('documented academic NASA capstone', content.data, /date: "Fall 2024 – May 2025"/);
requireMatch('accurate NASA project attribution', content.data, /University of North Texas · Senior capstone \(NASA PACE \/ UMD collaboration\)/);
requireMatch('user-confirmed B.S. graduation date', content.data, /degree: "B\.S\., Computer Science",\s*date: "May 2025"/);
requireMatch('static counter defaults to substantive value', content.counter, /useState\(value\)/);
requireMatch('GitHub showcase editorial allowlist', content.github, /FEATURED_REPOS = \['RAG_OPS', 'SIMLYFE', 'xmike04\.github\.io'\]/);
requireMatch('internship and co-op availability', content.data, /internships and co-ops/);
requireMatch('AWS ML Specialty credential', content.data, /AWS Certified Machine Learning — Specialty/);
requireMatch('Google Cloud PCA credential', content.data, /Professional Cloud Architect/);
requireMatch('ProfilePage structured data', content.layout, /['"]ProfilePage['"]/);
requireMatch('Person structured data', content.layout, /['"]Person['"]/);
requireMatch('OpenAI search crawler access', content.robots, /OAI-SearchBot/);
requireMatch('RAGOps flagship project', content.data, /id: ['"]ragops['"]/);
requireMatch('RAGOps repository link', content.data, /https:\/\/github\.com\/xmike04\/RAG_OPS/);
requireMatch('RAGOps SciFact scope', content.data, /5,183 documents.*300 held-out queries/s);
requireMatch('RAGOps RRF result', content.data, /0\.8059 Recall@10.*0\.6816 nDCG@10/s);
requireMatch('RAGOps local-provider limitation', content.data, /local-provider stack/);
requireMatch('RAGOps cross-encoder negative result', content.data, /negative result/i);
requireMatch('RAGOps SoftwareSourceCode structured data', content.item, /item\.id === ['"]ragops['"][\s\S]*SoftwareSourceCode[\s\S]*github\.com\/xmike04\/RAG_OPS/);

forbidMatch('stale M.S. graduation estimates', combined, /December 2027|Dec 2027|Expected May 2027|May 2027/);
forbidMatch('obsolete NASA capstone start', content.data, /Jan 2024 – May 2025/);
forbidMatch('unverified public undergraduate GPA', content.data, /\bgpa:\s*['"]\d/);
forbidMatch('chatbot references removed GPA field', content.chatbot, /entry\.gpa/);
forbidMatch('zero-value SSR statistics', content.counter, /useState\(reduced \? value : 0\)/);
forbidMatch('unlicensed client repository as portfolio showcase', content.github, /'Pacheco-Taco'/);
forbidMatch('ongoing Mr. Cooper employment', combined, /May 2025\s*[–-]\s*Present|Currently building agentic AI at/);
forbidMatch('full-time or contract availability', combined, /full-time or contract/i);
forbidMatch('incorrect degree name', combined, /Computer Science Engineering/);
forbidMatch('obsolete GitHub Pages canonical URL', combined, /https?:\/\/xmike04\.github\.io/);
forbidMatch('unsupported NASA tour claim', combined, /national museum tour/i);
forbidMatch('unsupported NASA setup metric', combined, /70%.*setup|setup.*70%/i);
forbidMatch('hard-coded SIMLYFE model', combined, /GPT-4o-mini/);
forbidMatch('current employer structured data', content.layout, /worksFor/);
forbidMatch('public resume phone field', content.data, /\bphone\s*:/);
forbidMatch('retired RAGOps recall claim', combined, /58%\s*(?:→|->|to)\s*81%/i);
forbidMatch('retired RAGOps irrelevant-context claim', combined, /31%\s*(?:→|->|to)\s*11%/i);
forbidMatch('retired RAGOps query-count claim', combined, /150\+?[- ]?(?:query|queries)/i);
forbidMatch('obsolete RAGOps Celery stack', content.data, /RAGOps[\s\S]{0,800}\bCelery\b/i);


const evidence = await readFile(path.join(root, 'docs/evidence/claims.md'), 'utf8');
const checkLinks = process.argv.includes('--check-evidence-links');
failures.push(...await auditEvidence(evidence, {
  requiredIds: ['ragops-retrieval', 'ragops-serving', 'ragops-load', 'ragops-mixed-load', 'simlyfe-tests', 'simlyfe-production',
    'nasa-role', 'nasa-exhibit', 'mr-cooper', 'aws-certification', 'gcp-certification', 'education'],
  probeLink: checkLinks ? async url => {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'public-profile-evidence-audit', Range: 'bytes=0-16383' } });
    await response.body?.cancel();
    return { ok: response.ok, status: response.status };
  } : undefined,
}));
requireMatch('commit-specific SIMLYFE test-case count', content.data, /795.*test cases|test cases.*795/is);
forbidMatch('ambiguous SIMLYFE assertion count on a public surface', combined, /350\+|Automated test assertions/);
forbidMatch('historical single-query load used as the flagship headline', content.flagship, /24\.56|31\.75|9,234/);
requireMatch('offline RAGOps quality boundary', content.data, /offline.*SciFact|SciFact.*offline/is);

if (failures.length > 0) {
  console.error('Public-profile audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Public-profile audit passed: canonical facts, evidence claims, and discovery metadata are consistent.');

