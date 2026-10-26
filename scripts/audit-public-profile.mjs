import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const files = {
  data: 'src/lib/resume-data.ts',
  counter: 'src/components/motion/count-up.tsx',
  chatbot: 'src/ai/flows/positive-chatbot.ts',
  github: 'src/lib/github.ts',
  site: 'src/lib/site.ts',
  layout: 'src/app/layout.tsx',
  robots: 'src/app/robots.ts',
  hero: 'src/components/hero/hero-section.tsx',
  contact: 'src/components/sections/contact-section.tsx',
  item: 'src/app/item/[id]/page.tsx',
};

const content = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([key, relativePath]) => [
      key,
      await readFile(path.join(root, relativePath), 'utf8'),
    ])
  )
);

const combined = Object.values(content).join('\n');
const failures = [];

function requireMatch(label, text, pattern) {
  if (!pattern.test(text)) failures.push(`Missing ${label}`);
}

function forbidMatch(label, text, pattern) {
  if (pattern.test(text)) failures.push(`Stale or unsupported claim found: ${label}`);
}

requireMatch('canonical portfolio domain', content.site, /https:\/\/michaelmportfolio\.org/);
requireMatch('December 2027 graduation date', content.data, /Expected December 2027/);
requireMatch('verified B.S. graduation year', content.data, /degree: "B\.S\., Computer Science",\s*date: "2025"/);
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

forbidMatch('May 2027 graduation date', combined, /Expected May 2027|May 2027/);
forbidMatch('unverified public undergraduate GPA', content.data, /\bgpa:\s*['"]\d/);
forbidMatch('chatbot references removed GPA field', content.chatbot, /entry\.gpa/);
forbidMatch('unsupported undergraduate graduation month', content.data, /degree: "B\.S\., Computer Science",\s*date: "May 2025"/);
forbidMatch('zero-value SSR statistics', content.counter, /useState\(reduced \? value : 0\)/);
forbidMatch('unlicensed client repository as portfolio showcase', content.github, /'Pacheco-Taco'/);
forbidMatch('ongoing Mr. Cooper employment', combined, /May 2025\s*[–-]\s*Present|Currently building agentic AI at/);
forbidMatch('full-time or contract availability', combined, /full-time or contract/i);
forbidMatch('incorrect degree name', combined, /Computer Science Engineering/);
forbidMatch('obsolete GitHub Pages canonical domain', combined, /xmike04\.github\.io/);
forbidMatch('unsupported NASA tour claim', combined, /national museum tour/i);
forbidMatch('unsupported NASA setup metric', combined, /70%.*setup|setup.*70%/i);
forbidMatch('hard-coded SIMLYFE model', combined, /GPT-4o-mini/);
forbidMatch('current employer structured data', content.layout, /worksFor/);
forbidMatch('public resume phone field', content.data, /\bphone\s*:/);
forbidMatch('retired RAGOps recall claim', combined, /58%\s*(?:→|->|to)\s*81%/i);
forbidMatch('retired RAGOps irrelevant-context claim', combined, /31%\s*(?:→|->|to)\s*11%/i);
forbidMatch('retired RAGOps query-count claim', combined, /150\+?[- ]?(?:query|queries)/i);
forbidMatch('obsolete RAGOps Celery stack', content.data, /RAGOps[\s\S]{0,800}\bCelery\b/i);

if (failures.length > 0) {
  console.error('Public-profile audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Public-profile audit passed: canonical facts, evidence claims, and discovery metadata are consistent.');
