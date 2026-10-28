
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
    { value: 795, label: "Vitest test cases", sub: "SIMLYFE CI · checked Oct 27, 2026", evidenceId: "simlyfe-tests" },
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
        "Built reproducible serving evaluation and a 30-query mixed load study of the local-provider stack: 300 requests each at concurrency 1, 4, and 8, with 54.73 / 137.22 / 252.24 ms p95 and no failed measured requests; generation was excluded.",
      ],
      links: [
        { label: "Evidence and limitations", url: `${EVIDENCE_LEDGER_URL}#ragops-retrieval` },
        { label: "Mixed-query load matrix", url: "https://github.com/xmike04/RAG_OPS/blob/5549d6792a6f5f4c6126c41deb9f1e16ec5e9264/benchmarks/service/results/load/2026-10-26-local-40389341425/README.md" },
        { label: "Serving-path baseline", url: "https://github.com/xmike04/RAG_OPS/blob/df271a5bf9adc8c610fa8ba19f18cedea6c7ee5e/benchmarks/service/results/scifact/2026-10-26-local-40380993127/README.md" },
        { label: "GitHub Repository", url: "https://github.com/xmike04/RAG_OPS" },
        { label: "SciFact Benchmark Report", url: "https://github.com/xmike04/RAG_OPS/blob/e63df6444a8e411c7b187027dfa230c0d99f0546/benchmarks/retrieval/results/scifact/160ce708a7858938/report.md" },
        { label: "Historical Single-Query Load Summary", url: "https://github.com/xmike04/RAG_OPS/blob/e63df6444a8e411c7b187027dfa230c0d99f0546/benchmarks/load/results/summary.json" },
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
          { label: "Serving-path retrieval quality", baseline: "Local hash + PostgreSQL; 300 test queries", achieved: "0.4097 Recall@10 / 0.3134 nDCG@10" },
          { label: "Evaluation scope", baseline: "Versioned BEIR SciFact", achieved: "5,183 documents / 300 held-out queries" },
          { label: "Mixed-query load, local providers", baseline: "30 queries; concurrency 1 / 4 / 8", achieved: "300 requests each; p95 54.73 / 137.22 / 252.24 ms" },
          { label: "Cross-encoder result", baseline: "Train split only; zero test overlap", achieved: "Negative result: slower and lower held-out quality than RRF" },
        ],
        productImpact:
          "Offline RRF was the strongest tested configuration; the train-only cross-encoder was slower and reduced held-out quality, so it remains a negative result. The separately measured hash/PostgreSQL serving path achieved lower quality. A mixed-query closed-loop study completed 900 measured requests without failures, with higher throughput and latency at higher concurrency. API/worker CPU and RSS endpoints are retained; these deterministic-provider observations exclude generation, peak memory, billing, and production capacity claims.",
        techStack: [
          "Python", "FastAPI", "PostgreSQL", "pgvector", "Redis", "BM25", "all-MiniLM-L6-v2", "RRF",
          "Cross-encoder", "Prometheus", "Grafana", "React", "Docker", "GitHub Actions",
        ],
        links: [
          { label: "Evidence and limitations", url: `${EVIDENCE_LEDGER_URL}#ragops-retrieval` },
        { label: "Mixed-query load matrix", url: "https://github.com/xmike04/RAG_OPS/blob/5549d6792a6f5f4c6126c41deb9f1e16ec5e9264/benchmarks/service/results/load/2026-10-26-local-40389341425/README.md" },
        { label: "Serving-path baseline", url: "https://github.com/xmike04/RAG_OPS/blob/df271a5bf9adc8c610fa8ba19f18cedea6c7ee5e/benchmarks/service/results/scifact/2026-10-26-local-40380993127/README.md" },
        { label: "GitHub Repository", url: "https://github.com/xmike04/RAG_OPS" },
          { label: "Retained SciFact Benchmark", url: "https://github.com/xmike04/RAG_OPS/blob/e63df6444a8e411c7b187027dfa230c0d99f0546/benchmarks/retrieval/results/scifact/160ce708a7858938/report.md" },
          { label: "Historical Single-Query Load Summary", url: "https://github.com/xmike04/RAG_OPS/blob/e63df6444a8e411c7b187027dfa230c0d99f0546/benchmarks/load/results/summary.json" },
          { label: "Load Artifact Validation CI", url: "https://github.com/xmike04/RAG_OPS/actions/runs/40390183060" },
        ],
        linksNote:
          "Each report link pins its own source or artifact commit. Offline quality, serving quality, and load conditions are separate evidence. Production-style describes the architecture and operational discipline, not an enterprise production deployment.",
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
            "Co-designed the exhibit’s fuzzy-logic gestures and built the ImGui hardware-setup interface for prerequisite checks and camera configuration.",
            "Connected and oversaw integration between the gesture-processing system and Unity visualization.",
            "Met regularly with NASA PACE collaborators; deployment was handled by other team members.",
            "The WAVE installation premiered at the Kennedy Center in Washington, D.C., in March 2025.",
        ],
        detailedContent: `
WAVE was my senior-year University of North Texas capstone project (Fall 2024–May 2025), developed in collaboration with NASA PACE and the University of Maryland's Immersive Media Design program. As Lead Developer, I guided our five-person student team and met regularly with NASA project collaborators to review requirements and integration progress.

Mission & Team System:
The team made PACE ocean science interactive through ZED camera tracking, gesture processing, an OSC data bridge, and Unity visualization.

My Contributions:
- Gesture Design: Co-designed the exhibit’s gesture vocabulary and rule-based fuzzy-logic scoring; this is shared design credit, not sole authorship of every gesture-processing module.
- Hardware Setup: Built the ImGui setup interface for checking prerequisites, accessing required software, launching ZED360, and editing camera configuration.
- Unity Integration: Connected the gesture-processing and Unity sides and oversaw their integration; this does not claim authorship of every rendering or transport component.
- Leadership: Coordinated the five-person UNT capstone team and recurring NASA PACE collaboration.
- Scope: I did not handle deployment components.

Technical Boundaries:
The inspected implementation combines graded pose and motion scores and sends tracking/gesture data to Unity through OSC. The setup interface handles hardware/software readiness and camera configuration. No recognition-accuracy, latency, or setup-time improvement is claimed.

The installation premiered at the Kennedy Center in Washington, D.C., in March 2025. NASA and UMD pages linked below independently document the exhibit and UNT's participation; the Lead Developer scope is Michael's confirmed role.
        `,
        links: [
          { label: "Contribution scope and verification limits", url: `${EVIDENCE_LEDGER_URL}#nasa-role` },
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
            "Make hardware prerequisites and camera configuration visible to exhibit operators",
          ],
          approach:
            "As Lead Developer for the five-person UNT capstone, I co-designed fuzzy-logic gestures, built the ImGui hardware-setup interface, and connected and oversaw Unity integration. The team system uses tracked pose/motion features, fuzzy gesture scores, and an OSC bridge into Unity. The setup wizard checks prerequisites and edits camera configuration. Deployment was handled by other team members.",
          architectureDiagram: 'nasa',
          architectureNote:
            "Team runtime: ZED tracking → fuzzy pose/motion gesture scores → OSC → Unity → exhibit. My scope: gesture co-design, ImGui setup tooling, and Unity integration oversight. ImGui supports prerequisite/camera configuration outside the live rendering path; deployment was outside my role.",
          metrics: [
            { label: "Leadership scope", baseline: "UNT senior capstone", achieved: "Lead Developer for a 5-person team" },
            { label: "Public exhibition", baseline: "Research-driven prototype", achieved: "Kennedy Center premiere, March 2025" },
            { label: "Personal contribution", baseline: "Owner-confirmed scope", achieved: "Fuzzy gesture co-design, ImGui setup, Unity integration oversight" },
          ],
          productImpact:
            "Contributed gesture interaction design, hardware setup tooling, and Unity integration oversight to the team’s public science exhibit. WAVE premiered at the Kennedy Center in March 2025; I did not handle deployment.",
          techStack: ["C#", "Unity", "OpenCV", "ZED SDK", "CUDA", "Fuzzy Logic", "OSC", "ImGui", "OpenGL"],
          links: [
            { label: "Contribution scope and verification limits", url: `${EVIDENCE_LEDGER_URL}#nasa-role` },
          { label: "NASA PACE — WAVE exhibit page", url: "https://pace.oceansciences.org/wave_space_to_ocean.htm" },
            { label: "UMD IMD — project feature", url: "https://imd.umd.edu/articles/wave-new-understanding-about-earths-oceans-and-atmosphere" },
            { label: "UMD CMNS — Kennedy Center premiere", url: "https://cmns.umd.edu/news-events/news/wave-exhibit-kennedy-center-pace-nasa" },
          ],
          linksNote:
            "This was an academic UNT senior capstone with regular NASA PACE collaboration. Personal responsibilities are owner-confirmed; private code inspection corroborates the components, not individual authorship. The diagram is an original high-level illustration. No protected project code or third-party asset is republished; NASA/UMD coverage independently documents the exhibit and UNT collaboration.",
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
        "Verified 795 Vitest test cases across 39 files in the October 27, 2026 CI run, plus desktop/mobile browser smoke with controlled service responses.",
        "Public frontend at simlyfe.vercel.app; repaired a demonstrated Nano response-truncation failure, then verified five events through age 10 and same-browser reload.",
      ],
      detailedContent: `
SIMLYFE is a shipped, browser-based life simulation game — the kind of project that only works when deterministic game systems and non-deterministic LLM output are engineered to coexist.

Key Contributions & Technical Details:
- LLM Event Engine: Generated events receive a bounded snapshot of age, career, relationships, and finances so the narrative stays tied to the simulation state.
- Server-Side Boundary: A Supabase Edge Function verifies Firebase identity and exact origins, enforces durable quotas, validates requests and responses, and owns the OpenAI provider credential.
- Deterministic Core: Economy, career progression, relationships, and annual simulation live in pure JavaScript modules that can be tested independently of model calls.
- Test Discipline: CI passed 795 Vitest test cases across 39 files on October 27, 2026; cases are counted separately from assertions, with controlled Firebase and event responses.
- Deployment: Public frontend hosted on Vercel. A diagnosed completion-budget repair gave Nano bounded reasoning/output headroom. The same Guest generated and resolved five consecutive events at ages 6–10, then restored age 10, history and stats after reload. A subsequent v20 canary on the verified current frontend generated and resolved one event and restored age 1/history/stats after reload. The ledger retains earlier failures and explicit verification limits.
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
          { label: "Automated test cases", baseline: "CI checked Oct 27, 2026", achieved: "795 Vitest cases across 39 files" },
          { label: "Provider credential boundary", baseline: "Direct browser calls avoided", achieved: "Authenticated proxy with server-owned OpenAI credentials" },
          { label: "Live acceptance", baseline: "Historical v19 repair check retained", achieved: "Current v20 event resolved; same-browser reload passed" },
        ],
        productImpact:
          "A publicly hosted game demonstrating tested LLM integration boundaries: bounded game-state prompting, server-side key management, schema validation, and separation of deterministic and generative layers. After diagnosing a too-small Nano completion ceiling, five consecutive generated events at ages 6–10 resolved successfully and the same life returned after reload. A subsequent current v20 event resolved and restored age 1/history/stats after reload. These bounded checks do not establish a reliability SLO, broad narrative quality, cost or cross-device recovery.",
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

