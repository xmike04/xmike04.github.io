
import type { CaseStudy } from '@/components/sections/case-study-view';
export type { CaseStudy };

export const EVIDENCE_LEDGER_URL = 'https://github.com/xmike04/xmike04.github.io/blob/main/docs/evidence/claims.md';

export interface HeroStat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub?: string;
  evidenceId: string;
}

export interface SkillCategory {
  category: string;
  technologies: string[];
}

export interface ProofArea {
  title: string;
  evidence: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface PressLink {
  title: string;
  outlet: string;
  url: string;
  description: string;
}

export interface ItemLink {
  label: string;
  url: string;
}

export interface WorkItem {
  id: string;
  type: 'work';
  title: string;
  company: string;
  location: string;
  date: string;
  /** YYYYMM of the end date (999999 = ongoing) — sorts the timeline most-recent-first. */
  sortKey: number;
  description: string[];
  detailedContent?: string;
  links?: ItemLink[];
  caseStudy?: CaseStudy;
}

export interface ProjectItem {
  id: string;
  type: 'project';
  flagship?: boolean;
  title: string;
  company: string;
  location: string;
  date: string;
  /** YYYYMM of the end date (999999 = ongoing) — sorts the timeline most-recent-first. */
  sortKey: number;
  description: string[];
  detailedContent?: string;
  links?: ItemLink[];
  caseStudy?: CaseStudy;
}

export const resumeData = {
  name: "Michael E. Marin",
  role: "Applied AI & ML Engineer",
  availability: "Seeking AI/ML and applied-AI internships and co-ops",
  contact: {
    email: "miked24977@gmail.com",
    location: "Dallas–Fort Worth, TX",
  },
  social: {
    github: "https://github.com/xmike04",
    linkedin: "https://linkedin.com/in/xmike04",
  },
  personalBio:
    "I'm Michael, an applied AI builder in Dallas–Fort Worth. I earned a B.S. in Computer Science at the University of North Texas and am now pursuing an M.S. in Artificial Intelligence with a Machine Learning concentration, expected Summer 2027. I care about the point where an ML idea leaves the notebook and becomes a system people can test, evaluate, and use.",
  summary:
    "Applied AI and machine learning engineer who builds measurable systems across retrieval, evaluation, computer vision, and AI products. Built RAGOps with reproducible SciFact benchmarking and local-provider load testing; brings complementary 2025 AI/ML product internship experience, NASA PACE computer vision leadership, and a shipped AI-assisted life simulator.",
  heroStats: [
    { value: 5183, label: "Documents benchmarked", sub: "Offline SciFact retrieval evaluation", evidenceId: "ragops-retrieval" },
    { value: 783, label: "Vitest test cases", sub: "SIMLYFE CI · checked Oct 26, 2026", evidenceId: "simlyfe-tests" },
    { value: 5, label: "Person team led", sub: "NASA PACE capstone exhibit", evidenceId: "nasa-role" },
    { value: 2027, label: "M.S. AI", sub: "expected summer — UNT, ML concentration", evidenceId: "education" },
  ] as HeroStat[],
  skills: [
    {
      category: "Programming Languages",
      technologies: ["Python", "TypeScript / JavaScript", "C++", "SQL"],
    },
    {
      category: "AI/ML & Data Science",
      technologies: ["PyTorch", "TensorFlow", "OpenCV", "NLP", "RAG Pipelines", "BM25", "RRF", "Dense Retrieval", "Cross-encoder Reranking", "Retrieval Evaluation", "LLM Evaluation", "Scikit-learn"],
    },
    {
      category: "Cloud & DevOps",
      technologies: ["AWS", "Google Cloud (Vertex AI, BigQuery)", "Docker", "Kubernetes", "GitHub Actions", "CI/CD pipelines", "Prometheus", "Grafana", "Linux"],
    },
    {
      category: "Backend",
      technologies: ["FastAPI", "Node.js", "PostgreSQL", "pgvector", "Redis", "Asynchronous Ingestion", "Flask", "Firebase", "RESTful APIs"],
    },
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "Tailwind CSS", "Data Visualization"],
    },
  ] satisfies SkillCategory[],
  proofAreas: [
    {
      title: "Retrieval engineering and evaluation",
      evidence: "RAGOps' offline benchmark used 5,183 SciFact documents and 300 held-out queries; RRF led with 0.8059 Recall@10 and 0.6816 nDCG@10.",
    },
    {
      title: "AI product evaluation",
      evidence: "2025 Product Analyst Intern on the Mr. Cooper AI/ML team: user validation, feature evaluation, and cross-functional delivery.",
    },
    {
      title: "Computer vision",
      evidence: "Lead Developer for a 5-person NASA PACE capstone team using OpenCV, CUDA, Unity, and ZED stereo cameras.",
    },
    {
      title: "LLM systems",
      evidence: "SIMLYFE separates deterministic simulation logic from authenticated, schema-validated OpenAI event generation.",
    },
    {
      title: "Cloud engineering",
      evidence: "AWS Machine Learning — Specialty and Google Cloud Professional Cloud Architect certifications.",
    },
  ] satisfies ProofArea[],
  workExperience: [
    {
      id: 'mr-cooper-internship',
      type: 'work',
      title: "Product Analyst Intern, AI/ML team",
      company: "Mr. Cooper Group",
      location: "Dallas, TX",
      date: "2025",
      sortKey: 202512,
      description: [
        "Supported agentic AI products for customer service automation across Azure DevOps and MySQL.",
        "Participated in product experimentation, user validation, and AI feature evaluation activities.",
        "Collaborated with product, engineering, and business stakeholders on AI and machine learning initiatives.",
        "Worked in a cross-functional environment translating business requirements into technical deliverables.",
      ],
      detailedContent: `
In 2025, I worked as a Product Analyst Intern on Mr. Cooper's AI/ML team, supporting agentic AI products for customer service automation.

Key Responsibilities & Learnings:
- Product Definition: Translated business requirements into user stories and technical deliverables in Azure DevOps.
- User-Centric Validation: Participated in product experimentation, user testing, and AI feature evaluation.
- Decision Support: Contributed to data-informed product prioritization and analysis discussions.
- Cross-Functional Collaboration: Worked with product, engineering, design, and business stakeholders on AI/ML initiatives.
- Technology Exposure: Used Azure DevOps, MySQL, Microsoft Copilot, and Google Cloud Storage while supporting the team's product work.
      `,
    },
  ] satisfies WorkItem[],
  projects: [
    {
      id: 'ragops',
      type: 'project',
      flagship: true,
      title: "RAGOps — Production-Style RAG Platform",
      company: "Personal Applied-AI / Retrieval Engineering Project",
      location: "",
      date: "2026",
      sortKey: 202610,
      description: [
        "Built a production-style RAG platform with FastAPI, PostgreSQL/pgvector, Redis, asynchronous ingestion, hybrid retrieval, reranking, Prometheus metrics, and a React operations console.",
        "Offline benchmarked BM25, all-MiniLM-L6-v2 dense retrieval, RRF, and a cross-encoder trained only on SciFact's disjoint training split across 5,183 documents and 300 held-out queries; RRF led with 0.8059 Recall@10 and 0.6816 nDCG@10.",
        "Built reproducible evaluation and load-testing pipelines with versioned datasets, artifact checksums, per-query traces, and CI quality gates; recorded 24.56 ms p50 and 31.75 ms p95 over 9,234 successful requests to the local-provider stack.",
      ],
      links: [
        { label: "Evidence and limitations", url: `${EVIDENCE_LEDGER_URL}#ragops-retrieval` },
        { label: "GitHub Repository", url: "https://github.com/xmike04/RAG_OPS" },
        { label: "SciFact Benchmark Report", url: "https://github.com/xmike04/RAG_OPS/blob/e63df6444a8e411c7b187027dfa230c0d99f0546/benchmarks/retrieval/results/scifact/160ce708a7858938/report.md" },
        { label: "Load-Test Summary", url: "https://github.com/xmike04/RAG_OPS/blob/e63df6444a8e411c7b187027dfa230c0d99f0546/benchmarks/load/results/summary.json" },
      ],
      caseStudy: {
        problem:
          "A RAG system is difficult to improve when ingestion, retrieval quality, latency, citations, cache behavior, and failures are hidden behind one answer endpoint. The goal was to build an operations-oriented platform where those components could be inspected, measured, and reproduced.",
        constraints: [
          "Keep ingestion asynchronous and observable without blocking the API",
          "Compare sparse, dense, fused, and reranked retrieval on the same held-out query set",
          "Prevent training leakage between SciFact's training and test splits",
          "Retain dataset, model, run, checksum, and per-query evidence for reproducibility",
          "Separate local deterministic-provider load evidence from claims about real production traffic",
        ],
        approach:
          "Built a FastAPI service backed by PostgreSQL/pgvector and a Redis worker for asynchronous ingestion. Serving retrieval combines PostgreSQL cover-density lexical ranking with pgvector through reciprocal rank fusion; the default query and document embeddings are deterministic hashes. The separate offline experiment compares canonical Okapi BM25, all-MiniLM-L6-v2 dense retrieval, RRF, and a train-only cross-encoder. Prometheus/Grafana and the React console expose API behavior and stage timings. The evaluation pipeline versions SciFact data, verifies checksums, and retains model provenance and per-query evidence. Learned serving evaluation requires correcting the worker\'s hard-coded hash embedder before re-ingestion.",
        architectureDiagram: 'ragops',
        architectureNote:
          "Serving: React → FastAPI → sequential PostgreSQL lexical + pgvector retrieval → RRF; Redis ingestion worker. Offline: Okapi BM25 + MiniLM comparison. Prometheus scrapes the API.",
        metrics: [
          { label: "Offline held-out retrieval quality", baseline: "BM25: 0.7740 Recall@10", achieved: "RRF: 0.8059 Recall@10 / 0.6816 nDCG@10" },
          { label: "Evaluation scope", baseline: "Versioned BEIR SciFact", achieved: "5,183 documents / 300 held-out queries" },
          { label: "Local-provider load test", baseline: "30 s / concurrency 8", achieved: "9,234 successes; 24.56 ms p50 / 31.75 ms p95" },
          { label: "Cross-encoder result", baseline: "Train split only; zero test overlap", achieved: "Negative result: slower and lower held-out quality than RRF" },
        ],
        productImpact:
          "RRF was the strongest tested configuration. The small train-split-only cross-encoder was much slower and reduced held-out quality, so the project retains it as a negative result instead of implying that reranking helped. The latency figures come from a 30-second, concurrency-8 local Docker Compose workload with deterministic local providers; they are reproducible engineering evidence, not a production SLO or externally served traffic.",
        techStack: [
          "Python", "FastAPI", "PostgreSQL", "pgvector", "Redis", "BM25", "all-MiniLM-L6-v2", "RRF",
          "Cross-encoder", "Prometheus", "Grafana", "React", "Docker", "GitHub Actions",
        ],
        links: [
          { label: "Evidence and limitations", url: `${EVIDENCE_LEDGER_URL}#ragops-retrieval` },
        { label: "GitHub Repository", url: "https://github.com/xmike04/RAG_OPS" },
          { label: "Retained SciFact Benchmark", url: "https://github.com/xmike04/RAG_OPS/blob/e63df6444a8e411c7b187027dfa230c0d99f0546/benchmarks/retrieval/results/scifact/160ce708a7858938/report.md" },
          { label: "Retained Load-Test Summary", url: "https://github.com/xmike04/RAG_OPS/blob/e63df6444a8e411c7b187027dfa230c0d99f0546/benchmarks/load/results/summary.json" },
          { label: "Successful CI Run", url: "https://github.com/xmike04/RAG_OPS/actions/runs/37844921829" },
        ],
        linksNote:
          "Evidence is pinned to commit e63df6444a8e411c7b187027dfa230c0d99f0546. Production-style describes the architecture and operational discipline, not an enterprise production deployment.",
      } satisfies CaseStudy,
    },
    {
        id: 'nasa-waving-project',
        type: 'project',
        flagship: true,
        title: "WAVE: From Space to Ocean (NASA PACE Capstone)",
        company: "University of North Texas · Senior capstone (NASA PACE / UMD collaboration)",
        location: "",
        date: "Fall 2024 – May 2025",
        sortKey: 202505,
        description: [
            "Led a five-person UNT senior capstone team developing real-time computer vision and interactive visualizations for NASA PACE satellite data.",
            "Developed gesture-recognition and multi-camera tracking workflows using OpenCV, CUDA, Unity, and ZED stereo cameras.",
            "Built interactive data visualizations for real-time oceanographic satellite analytics.",
            "Met regularly with NASA PACE collaborators and contributed to deployment automation and technical infrastructure for the exhibit.",
            "The WAVE installation premiered at the Kennedy Center in Washington, D.C., in March 2025.",
        ],
        detailedContent: `
WAVE was my senior-year University of North Texas capstone project (Fall 2024–May 2025), developed in collaboration with NASA PACE and the University of Maryland's Immersive Media Design program. As Lead Developer, I guided our five-person student team and met regularly with NASA project collaborators to review requirements and integration progress.

Key Contributions & Technical Details:
- Computer Vision: Developed gesture-recognition and multi-camera tracking workflows using ZED stereo cameras, OpenCV, and CUDA.
- Interactive Rendering: Used Unity, C#, React, and TypeScript to help turn oceanographic satellite data into an interactive public exhibit.
- Deployment Support: Contributed to setup, calibration, and deployment automation for exhibit operators.
- Team Leadership & Collaboration: Coordinated technical work across a five-person UNT student team and attended recurring meetings with NASA PACE collaborators.

The installation premiered at the Kennedy Center in Washington, D.C., in March 2025. NASA and UMD pages linked below independently document the exhibit and UNT's participation; the Lead Developer scope is Michael's confirmed role.
        `,
        links: [
          { label: "Individual contribution verification", url: `${EVIDENCE_LEDGER_URL}#nasa-role` },
          { label: "NASA PACE — WAVE exhibit page", url: "https://pace.oceansciences.org/wave_space_to_ocean.htm" },
          { label: "UMD coverage of the Kennedy Center premiere", url: "https://cmns.umd.edu/news-events/news/wave-exhibit-kennedy-center-pace-nasa" },
        ],
        caseStudy: {
          problem:
            "NASA's PACE mission produces complex oceanographic and atmospheric satellite data. The capstone challenge was to make that science approachable through a real-time, gesture-driven public exhibit.",
          constraints: [
            "Real-time gesture recognition from ZED stereo-camera input",
            "Reliable operation across changing exhibit lighting, spacing, and calibration",
            "Interactive rendering of scientific data for a public audience",
            "Setup and deployment that exhibit operators could repeat consistently",
          ],
          approach:
            "Designed a modular pipeline combining computer vision, real-time rendering, and gesture recognition. Built gesture interaction using ZED stereo cameras and OpenCV with CUDA acceleration for tracking and interpreting user movement. Developed a configurable ImGui-based setup wizard to automate deployment, calibration, and system validation, reducing friction for non-technical operators. Integrated the full pipeline into Unity to render interactive PACE satellite visualizations across multiple display environments.",
          architectureDiagram: 'nasa',
          architectureNote:
            "ZED stereo camera → OpenCV + CUDA gesture pipeline → Unity rendering engine → ImGui setup wizard for calibration and validation",
          metrics: [
            { label: "Leadership scope", baseline: "UNT senior capstone", achieved: "Lead Developer for a 5-person team" },
            { label: "Public exhibition", baseline: "Research-driven prototype", achieved: "Kennedy Center premiere, March 2025" },
            { label: "Interaction stack", baseline: "Stereo-camera input", achieved: "OpenCV + CUDA gesture recognition in Unity" },
          ],
          productImpact:
            "Helped deliver an interactive installation that made NASA PACE satellite science tangible for a public audience. The WAVE exhibit premiered at the Kennedy Center in Washington, D.C., in March 2025.",
          techStack: ["C#", "C++", "Python", "Unity", "OpenCV", "ZED SDK", "CUDA", "ImGui", "OpenGL", "React", "TypeScript", "GraphQL"],
          links: [
            { label: "Individual contribution verification", url: `${EVIDENCE_LEDGER_URL}#nasa-role` },
          { label: "NASA PACE — WAVE exhibit page", url: "https://pace.oceansciences.org/wave_space_to_ocean.htm" },
            { label: "UMD IMD — project feature", url: "https://imd.umd.edu/articles/wave-new-understanding-about-earths-oceans-and-atmosphere" },
            { label: "UMD CMNS — Kennedy Center premiere", url: "https://cmns.umd.edu/news-events/news/wave-exhibit-kennedy-center-pace-nasa" },
          ],
          linksNote:
            "This was an academic UNT senior capstone involving regular NASA PACE collaboration, not an employment appointment. Exhibit code belongs to the university/NASA partnership; the NASA and UMD coverage documents the project and UNT involvement rather than individual employment.",
        } satisfies CaseStudy,
    },
    {
      id: 'simlyfe',
      type: 'project',
      flagship: true,
      title: "SIMLYFE: AI-Assisted Life Simulator",
      company: "Personal Project",
      location: "",
      date: "2025 – 2026",
      sortKey: 202612,
      description: [
        "Built and shipped a mobile-first, browser-based life simulation game where players age a character year by year through careers, relationships, finances, and procedurally generated life events.",
        "Separated deterministic game systems from authenticated OpenAI narrative generation behind a Supabase Edge Function.",
        "Validated bounded requests and model output at the server boundary while keeping provider credentials out of the browser.",
        "Verified 783 Vitest test cases across 37 files in the October 26, 2026 CI run, plus desktop/mobile browser smoke with controlled service responses.",
        "Live at simlyfe.vercel.app — React 19, Vite, Firebase cloud saves, Supabase Edge Functions.",
      ],
      detailedContent: `
SIMLYFE is a shipped, browser-based life simulation game — the kind of project that only works when deterministic game systems and non-deterministic LLM output are engineered to coexist.

Key Contributions & Technical Details:
- LLM Event Engine: Generated events receive a bounded snapshot of age, career, relationships, and finances so the narrative stays tied to the simulation state.
- Server-Side Boundary: A Supabase Edge Function verifies Firebase identity and exact origins, enforces durable quotas, validates requests and responses, and owns the OpenAI provider credential.
- Deterministic Core: Economy, career progression, relationships, and annual simulation live in pure JavaScript modules that can be tested independently of model calls.
- Test Discipline: CI passed 783 Vitest test cases across 37 files on October 26, 2026; cases are counted separately from assertions, with controlled Firebase and event responses.
- Shipped Product: Cloud saves via Firebase, mobile-first dark glassmorphism UI, deployed on Vercel.
      `,
      links: [
        { label: "Live Demo", url: "https://simlyfe.vercel.app" },
        { label: "Evidence and limitations", url: `${EVIDENCE_LEDGER_URL}#simlyfe-tests` },
        { label: "GitHub Repository", url: "https://github.com/xmike04/SIMLYFE" },
      ],
      caseStudy: {
        problem:
          "LLM-generated content is compelling but unreliable: left unconstrained it breaks game-state coherence, and calling it naively from the browser leaks API keys. The challenge was building a playable, shippable game where procedural LLM narrative and deterministic simulation systems reinforce rather than corrupt each other.",
        constraints: [
          "LLM output must respect current game state (age, career, finances, relationships)",
          "API keys must never reach the client — all inference server-side",
          "Mobile-first performance: playable on mid-range phones in the browser",
          "LLM latency and cost per event had to stay low enough for a free-to-play loop",
          "Game logic had to remain testable independently of non-deterministic LLM output",
        ],
        approach:
          "Split the architecture into a deterministic JavaScript simulation core and an AI narrative layer that receives a bounded game-state projection and returns schema-validated events. A Supabase Edge Function verifies Firebase identity and request origin, applies durable quotas, owns the OpenAI prompt and model configuration, and keeps provider credentials off the client. Firebase Auth and Firestore provide identity and cloud saves.",
        architectureDiagram: 'simlyfe',
        architectureNote:
          "React 19 client → deterministic simulation core ⇄ authenticated Supabase Edge Function → OpenAI event service; Firebase Auth and Firestore provide identity and saves",
        metrics: [
          { label: "Automated test cases", baseline: "CI checked Oct 26, 2026", achieved: "783 Vitest cases across 37 files" },
          { label: "Provider credential boundary", baseline: "Direct browser calls avoided", achieved: "Authenticated proxy with server-owned OpenAI credentials" },
          { label: "Deployment", baseline: "Prototype", achieved: "Live on Vercel with cloud saves" },
        ],
        productImpact:
          "A shipped, publicly playable game demonstrating production LLM integration patterns: structured prompting against live application state, server-side key management, schema validation at the LLM boundary, and a test suite that keeps deterministic and generative layers safely separated.",
        techStack: [
          "React 19", "JavaScript", "Vite 8", "Supabase Edge Functions", "Firebase Auth", "Firestore",
          "OpenAI", "Vitest", "Vercel",
        ],
        links: [
          { label: "Live Demo", url: "https://simlyfe.vercel.app" },
          { label: "Evidence and limitations", url: `${EVIDENCE_LEDGER_URL}#simlyfe-tests` },
        { label: "GitHub Repository", url: "https://github.com/xmike04/SIMLYFE" },
        ],
      } satisfies CaseStudy,
    },
  ] satisfies ProjectItem[],
  education: [
    {
      school: "The University of North Texas (UNT)",
      degree: "M.S., Artificial Intelligence (Machine Learning concentration)",
      date: "Expected Summer 2027",
      grade: "In progress",
      coursework: [
        "Applied Artificial Intelligence — search, heuristics, problem solving",
        "Advanced Machine Learning — supervised/unsupervised learning, deep learning fundamentals",
      ],
    },
    {
      school: "The University of North Texas (UNT)",
      degree: "B.S., Computer Science",
      date: "May 2025",
      grade: "Graduated",
    },
  ],
  press: [
    {
      title: "WAVE exhibit premieres at the Kennedy Center",
      outlet: "UMD College of Computer, Mathematical & Natural Sciences",
      url: "https://cmns.umd.edu/news-events/news/wave-exhibit-kennedy-center-pace-nasa",
      description: "Coverage of the NASA PACE 'Wave: From Space to Ocean' exhibit premiere in Washington, D.C.",
    },
    {
      title: "WAVE: New understanding about Earth's oceans and atmosphere",
      outlet: "UMD Immersive Media Design",
      url: "https://imd.umd.edu/articles/wave-new-understanding-about-earths-oceans-and-atmosphere",
      description: "Feature on the interactive satellite-data exhibit built with the NASA PACE team and UNT capstone students.",
    },
    {
      title: "WAVE: From Space to Ocean",
      outlet: "NASA PACE Mission",
      url: "https://pace.oceansciences.org/wave_space_to_ocean.htm",
      description: "The official NASA PACE mission page for the WAVE exhibit.",
    },
  ] satisfies PressLink[],
  suggestedQuestions: [
    "How did Michael evaluate retrieval in RAGOps?",
    "What did Michael build for NASA?",
    "How does SIMLYFE use an LLM safely?",
    "When does Michael expect to finish his master's?",
    "What's in the interactive ML Lab?",
  ],
  certifications: [
    {
      name: "AWS Certified Machine Learning — Specialty",
      issuer: "Amazon Web Services",
      date: "Issued June 2025",
    },
    {
      name: "Google Cloud Certified Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "Issued October 2025",
    },
  ] satisfies Certification[],
};

export type ResumeData = typeof resumeData;
