import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nativeRequire = createRequire(import.meta.url);
// Use the dependency's actual ESM build; its CJS .js entry is incompatible with Node's module mode.
const lucide = await import('lucide-react');

// Execute the real TS/TSX modules. Replace only GitHub HTTP and the server-only
// framework sentinel; projection, local profile data and React rendering are real.
function loadShowcase(fetchFixture) {
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const code = ts.transpileModule(readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText;
    function requireSource(id) {
      if (id === 'server-only') return {};
      if (id === 'lucide-react') return lucide;
      if (id.startsWith('@/') || id.startsWith('.')) {
        const base = id.startsWith('@/') ? path.join(root, 'src', id.slice(2)) : path.resolve(path.dirname(filename), id);
        return load([base, `${base}.ts`, `${base}.tsx`].find(existsSync));
      }
      return nativeRequire(id);
    }
    new Function('require', 'module', 'exports', 'fetch', 'process', code)(requireSource, module, module.exports, fetchFixture, { env: {} });
    return module.exports;
  }
  return load(path.join(root, 'src/components/sections/github-showcase.tsx')).default;
}

test('showcase renders local verified descriptions when GitHub About is stale', async () => {
  const responses = [
    { id: 1, name: 'SIMLYFE', html_url: 'https://github.com/xmike04/SIMLYFE', description: 'UPSTREAM_ONLY_UNTRUSTED: 350+ Vitest assertions', language: 'JavaScript', stargazers_count: 7, pushed_at: '2026-10-27T12:00:00Z', fork: false },
    { id: 2, name: 'RAG_OPS', html_url: 'https://github.com/xmike04/RAG_OPS', description: 'UPSTREAM_ONLY_UNTRUSTED: obsolete retrieval metrics', language: 'Python', stargazers_count: 0, pushed_at: '2026-10-27T12:00:00Z', fork: false },
    { id: 3, name: 'xmike04.github.io', html_url: 'https://github.com/xmike04/xmike04.github.io', description: 'UPSTREAM_ONLY_UNTRUSTED: old portfolio facts', language: 'TypeScript', stargazers_count: 0, pushed_at: '2026-10-27T12:00:00Z', fork: false },
  ];
  const Showcase = loadShowcase(async url => {
    assert.equal(url, 'https://api.github.com/users/xmike04/repos?sort=pushed&per_page=100');
    return { ok: true, status: 200, json: async () => responses };
  });
  const html = renderToStaticMarkup(await Showcase());
  assert.doesNotMatch(html, /350\+|UPSTREAM_ONLY_UNTRUSTED/);
  assert.match(html, /browser-based life simulation game/);
  assert.match(html, /FastAPI/);
  assert.match(html, /href="https:\/\/github.com\/xmike04\/SIMLYFE"/);
  assert.match(html, /aria-label="7 stars"/);
  assert.match(html, /updated Oct 2026/);
});
