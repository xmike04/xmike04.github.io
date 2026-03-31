'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ResumePage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Print controls — hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <span className="text-sm text-gray-500">Michael E. Marin — Resume</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.print()}
          aria-label="Print or save as PDF"
        >
          <Printer className="w-4 h-4 mr-2" aria-hidden="true" />
          Print / Save as PDF
        </Button>
      </div>

      {/* Resume content */}
      <main
        className="max-w-[780px] mx-auto px-8 py-10 print:px-0 print:py-0 print:max-w-none text-black"
        aria-label="Resume"
      >

        {/* ── Header ── */}
        <header className="mb-5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-black">Michael E. Marin</h1>
          <p className="text-sm text-gray-700 mt-1">
            Dallas, TX&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="mailto:miked24977@gmail.com" className="text-black underline">miked24977@gmail.com</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="https://linkedin.com/in/xmike04" className="text-black underline">linkedin.com/in/xmike04</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="https://github.com/xmike04" className="text-black underline">github.com/xmike04</a>
          </p>
        </header>

        <hr className="border-black mb-4" />

        {/* ── Summary ── */}
        <section aria-labelledby="summary-heading" className="mb-5">
          <h2 id="summary-heading" className="text-sm font-bold uppercase tracking-widest mb-2 text-black">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-800">
            ML Engineer with production experience building end-to-end AI pipelines, real-time data systems, and LLM infrastructure.
            Collaborated with NASA on satellite data visualization for the PACE mission. Experienced in agentic AI product development,
            hybrid retrieval system design, and evaluation-driven ML iteration. Pursuing M.S. in Artificial Intelligence at the
            University of North Texas.
          </p>
        </section>

        <hr className="border-gray-300 mb-4" />

        {/* ── Experience ── */}
        <section aria-labelledby="experience-heading" className="mb-5">
          <h2 id="experience-heading" className="text-sm font-bold uppercase tracking-widest mb-3 text-black">
            Experience
          </h2>

          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-bold text-black">Product Analyst Intern, AI/ML Team</h3>
              <span className="text-sm text-gray-600 shrink-0 ml-4">May 2025 – Present</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">Mr. Cooper Group — Dallas, TX</p>
            <ul className="space-y-1.5 text-sm text-gray-800">
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Contributed to development of enterprise agentic AI products automating customer service workflows for one of the largest mortgage servicers in the U.S., supporting millions of customer interactions annually.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Authored user stories and feature specifications in Azure DevOps for ML-powered automation systems, translating business requirements into development-ready tasks aligned with sprint cycles.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Executed model evaluation cycles measuring accuracy, reliability, and production performance of AI outputs against defined benchmarks; flagged regressions and coordinated fixes with engineering.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Facilitated user testing sessions with internal stakeholders, synthesizing feedback into prioritized backlog items that improved feature adoption and reduced UX friction.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Coordinated cross-functional delivery across engineering, design, and operations teams using GCP, MySQL, Microsoft Copilot, and LucidChart to support digital transformation initiatives.</span>
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-gray-300 mb-4" />

        {/* ── Projects ── */}
        <section aria-labelledby="projects-heading" className="mb-5">
          <h2 id="projects-heading" className="text-sm font-bold uppercase tracking-widest mb-3 text-black">
            Projects
          </h2>

          {/* RAGOps */}
          <div className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-bold text-black">RAGOps — Production-Grade RAG Platform</h3>
              <span className="text-sm text-gray-600 shrink-0 ml-4">2024 – 2025</span>
            </div>
            <ul className="mt-1.5 space-y-1.5 text-sm text-gray-800">
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Improved Recall@10 from 58% to 81% by replacing dense-only retrieval with a hybrid pipeline combining pgvector ANN search and BM25 lexical matching, followed by cross-encoder reranking.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Reduced irrelevant context rate from 31% to 11% through semantic chunking and reranking, increasing answer precision by 35% on a 150-query human-labeled benchmark.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Designed asynchronous document ingestion pipeline (PDF, Markdown, HTML) using FastAPI, PostgreSQL with pgvector, Redis, and Celery; supports knowledge bases of 1,000+ documents.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Implemented per-query observability layer capturing retrieval latency, token usage, and cost per request; surfaced via admin dashboard, enabling targeted optimization without re-running experiments.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Built evaluation framework with 150+ benchmark queries measuring Recall@k, MRR, and answer correctness; used to quantify impact of every pipeline change before deployment.</span>
              </li>
            </ul>
          </div>

          {/* NASA PACE */}
          <div className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-bold text-black">Waving: From Space to Ocean — NASA PACE Project</h3>
              <span className="text-sm text-gray-600 shrink-0 ml-4">Jan 2024 – May 2025</span>
            </div>
            <p className="text-sm text-gray-700 mb-1.5">
              In collaboration with NASA Goddard, University of Maryland, and UNT
            </p>
            <ul className="space-y-1.5 text-sm text-gray-800">
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Led team of 5 engineers to build a real-time interactive data visualization platform for NASA's PACE satellite mission, enabling researchers to explore live oceanographic and atmospheric data streams.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Architected full-stack cloud data pipeline in React and TypeScript, processing large-scale multi-channel satellite datasets with sub-second render latency for scientific analysis.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Designed Setup Wizard using ImGui and OpenCV, automating researcher environment configuration and eliminating a multi-step manual process prone to errors.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Built GraphQL API layer integrating multi-source NASA scientific datasets across platforms, enabling consistent data access for downstream analysis tools.</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>Selected for public exhibition at Kennedy Space Center Museum, Washington D.C.; project scheduled for national museum tour to bring PACE mission science to general audiences.</span>
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-gray-300 mb-4" />

        {/* ── Education ── */}
        <section aria-labelledby="education-heading" className="mb-5">
          <h2 id="education-heading" className="text-sm font-bold uppercase tracking-widest mb-3 text-black">
            Education
          </h2>
          <p className="text-sm font-bold text-black">University of North Texas (UNT) — Denton, TX</p>
          <div className="mt-1 space-y-1 text-sm text-gray-800">
            <div className="flex justify-between">
              <span>M.S., Artificial Intelligence (Machine Learning Focus)</span>
              <span className="text-gray-600 shrink-0 ml-4">Expected May 2027</span>
            </div>
            <div className="flex justify-between">
              <span>B.S., Computer Science Engineering — GPA: 3.25 / 4.0</span>
              <span className="text-gray-600 shrink-0 ml-4">May 2025</span>
            </div>
          </div>
        </section>

        <hr className="border-gray-300 mb-4" />

        {/* ── Skills ── */}
        <section aria-labelledby="skills-heading" className="mb-2">
          <h2 id="skills-heading" className="text-sm font-bold uppercase tracking-widest mb-3 text-black">
            Skills
          </h2>
          <dl className="space-y-1.5 text-sm text-gray-800">
            <div className="flex gap-2">
              <dt className="font-semibold text-black shrink-0 w-36">Languages</dt>
              <dd>Python, JavaScript, TypeScript, C++, SQL</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-black shrink-0 w-36">AI / ML</dt>
              <dd>PyTorch, TensorFlow, Scikit-learn, OpenCV, RAG Pipelines, BM25, Cross-encoder Reranking, NLP, LLM Evaluation</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-black shrink-0 w-36">Cloud & DevOps</dt>
              <dd>GCP (Vertex AI, BigQuery), AWS, Docker, Kubernetes, GitHub Actions, CI/CD, Linux</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-black shrink-0 w-36">Backend</dt>
              <dd>FastAPI, Flask, Node.js, PostgreSQL, pgvector, Redis, GraphQL, RESTful APIs</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-black shrink-0 w-36">Frontend</dt>
              <dd>React, Next.js, TypeScript</dd>
            </div>
          </dl>
        </section>

      </main>
    </div>
  );
}
