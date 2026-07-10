
import type { CaseStudy } from '@/components/sections/case-study-view';
export type { CaseStudy };

export interface HeroStat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub?: string;
}

export interface SkillCategory {
  category: string;
  technologies: string[];
}

export interface RadarAxis {
  axis: string;
  value: number; // 0–100 self-assessed proficiency, drives the skills radar chart
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
  role: "ML Engineer",
  availability: "Open to ML Engineer and AI Product roles",
  contact: {
    email: "miked24977@gmail.com",
    phone: "4699800069",
    location: "Dallas, TX",
  },
  social: {
    github: "https://github.com/xmike04",
    linkedin: "https://linkedin.com/in/xmike04",
  },
  // Warm, first-person intro for the front page. Draft — edit freely to your voice.
  personalBio:
    "I'm Michael — an ML engineer based in Dallas who got hooked on AI the moment I realized a model could turn messy, real-world data into something people actually understand. I studied Computer Science Engineering at the University of North Texas, stuck around for a master's in Artificial Intelligence, and I help run the UNT AI Club as its treasurer. Whether it's a NASA satellite exhibit, an LLM-driven game, or an agentic tool at work, what I care about most is the moment an idea stops being a notebook and becomes something someone can actually click.",
  summary:
    "ML engineer focused on production AI systems — real-time interactive visualization, LLM-powered products, and the evaluation discipline that keeps them honest. Led a 5-person team building a NASA PACE satellite-data exhibit shown at the Kennedy Center in Washington, D.C., and shipped SIMLYFE, an LLM-driven life simulator with 350+ automated test assertions. Currently pursuing an M.S. in Artificial Intelligence (ML focus) at the University of North Texas while building agentic AI products at Mr. Cooper.",
  heroStats: [
    { value: 6, label: "In-browser ML demos", sub: "live in the ML Lab below" },
    { value: 350, suffix: "+", label: "Test assertions", sub: "SIMLYFE engine + LLM modules" },
    { value: 5, label: "Person team led", sub: "NASA PACE capstone exhibit" },
    { value: 2027, label: "M.S. AI", sub: "expected — UNT, ML focus" },
  ] as HeroStat[],
  skills: [
    {
      category: "Programming Languages",
      technologies: ["Python", "TypeScript / JavaScript", "C++", "SQL"],
    },
    {
      category: "AI/ML & Data Science",
      technologies: ["PyTorch", "TensorFlow", "OpenCV", "NLP", "RAG Pipelines", "BM25 & Cross-encoder Reranking", "LLM Evaluation", "Scikit-learn"],
    },
    {
      category: "Cloud & DevOps",
      technologies: ["AWS", "Google Cloud (Vertex AI, BigQuery)", "Docker", "Kubernetes", "GitHub Actions", "CI/CD pipelines", "Linux"],
    },
    {
      category: "Backend",
      technologies: ["FastAPI", "Node.js", "PostgreSQL", "pgvector", "Redis", "Flask", "Firebase", "RESTful APIs"],
    },
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "Tailwind CSS", "Data Visualization"],
    },
  ] satisfies SkillCategory[],
  skillsRadar: [
    { axis: "LLM / RAG", value: 88 },
    { axis: "ML / Deep Learning", value: 75 },
    { axis: "Backend", value: 82 },
    { axis: "Cloud / MLOps", value: 70 },
    { axis: "Frontend", value: 80 },
    { axis: "Data Engineering", value: 72 },
  ] satisfies RadarAxis[],
  workExperience: [
    {
      id: 'mr-cooper-internship',
      type: 'work',
      title: "Product Analyst Intern, AI/ML team",
      company: "Mr. Cooper Group",
      location: "Dallas, TX",
      date: "May 2025 – Present",
      sortKey: 999999,
      description: [
        "Selected for a competitive 10-week internship with the Product Management AI/ML team.",
        "Contributing to the development and support of internal Agentic AI products to help automate customer service.",
        "Responsibilities include story writing, user testing, model evaluation, and cross-functional collaboration with design, engineering, and business units.",
        "Exposure to tools such as Azure DevOps, MySQL, Microsoft Copilot, Google Cloud Services (GCS), and LucidChart in support of digital transformation and intelligent automation efforts.",
      ],
      detailedContent: `
As a Product Analyst Intern on the AI/ML team at Mr. Cooper, I am immersed in the lifecycle of enterprise-grade AI products. My primary focus is on supporting the development of Agentic AI systems designed to enhance customer service interactions.

Key Responsibilities & Learnings:
- Product Definition: I contribute to product strategy by writing user stories and defining feature requirements in Azure DevOps, ensuring that development aligns with business objectives and user needs.
- User-Centric Validation: I actively participate in user testing sessions, gathering feedback to iterate on product features and improve the user experience. This has honed my ability to translate user insights into actionable development tasks.
- Model & System Evaluation: I assist in the evaluation of AI models, analyzing performance metrics to ensure they meet our standards for accuracy and reliability.
- Cross-Functional Collaboration: I work closely with a diverse team of designers, software engineers, and business stakeholders. This has taught me how to effectively communicate technical concepts and product vision across different domains.
- Technology Exposure: I am gaining hands-on experience with a modern tech stack, including Azure DevOps for project management, MySQL for data analysis, Microsoft Copilot for AI-assisted development, and Google Cloud Services (GCS) for cloud infrastructure. I also use LucidChart for creating process flows and diagrams to support our digital transformation initiatives.
      `,
    },
  ] satisfies WorkItem[],
  projects: [
    {
        id: 'nasa-waving-project',
        type: 'project',
        flagship: true,
        title: "Wave: From Space to Ocean (NASA PACE Capstone)",
        company: "NASA PACE · University of Maryland IMD · University of North Texas",
        location: "",
        date: "Jan 2024 – May 2025",
        sortKey: 202505,
        description: [
            "Led a team of 5 building an interactive, gesture-driven exhibit visualizing live data from NASA's PACE satellite.",
            "Built full-stack applications integrating cloud data pipelines for large-scale scientific computations, with React/TypeScript visualization layers.",
            "Designed a Setup Wizard using ImGui and OpenCV that cut exhibit setup and calibration time by roughly 70%.",
            "Implemented scalable APIs and GraphQL endpoints for cross-platform data integration.",
            "Premiered at the Kennedy Center in Washington, D.C. (March 2025), with a planned national museum tour.",
        ],
        detailedContent: `
The "Wave: From Space to Ocean" project is a capstone initiative in collaboration with the NASA PACE team, the University of Maryland's Immersive Media Design program, and the University of North Texas. As the team lead, I guided a group of five students to build a comprehensive data visualization and analysis platform for NASA's PACE (Plankton, Aerosol, Cloud, ocean Ecosystem) satellite mission.

Key Contributions & Technical Details:
- Interactive Data Visualization: We developed a sophisticated front-end using React and TypeScript, allowing scientists and researchers to perform real-time analytics on complex oceanographic and atmospheric data. The visualizations are designed to be intuitive and interactive, facilitating new discoveries.
- Full-Stack Cloud Architecture: I was responsible for architecting and implementing a full-stack application that connects to NASA's data pipelines. This involved setting up cloud infrastructure capable of handling large-scale scientific computations and data streaming.
- Optimized User Workflow: To streamline the setup process for exhibit operators, I designed and built a Setup Wizard using ImGui and OpenCV. This tool automates the configuration of the analysis environment, significantly reducing setup time and potential for errors.
- Scalable Data Integration: We implemented a robust backend with scalable APIs and GraphQL endpoints to ensure seamless data integration from various sources and across different platforms.

The exhibit premiered at the Kennedy Center in Washington, D.C. in March 2025 and is scheduled to tour other museums, bringing the science of the PACE mission to the public.
        `,
        links: [
          { label: "NASA PACE — WAVE exhibit page", url: "https://pace.oceansciences.org/wave_space_to_ocean.htm" },
          { label: "UMD coverage of the Kennedy Center premiere", url: "https://cmns.umd.edu/news-events/news/wave-exhibit-kennedy-center-pace-nasa" },
        ],
        caseStudy: {
          problem:
            "NASA's PACE mission produces large-scale, high-dimensional oceanographic and atmospheric satellite data that is difficult for non-experts to interpret or interact with. The goal was to transform raw satellite data into a real-time interactive system that enables scientists, educators, and general audiences to explore complex datasets through intuitive gesture-based interfaces — without requiring domain expertise.",
          constraints: [
            "Real-time performance requirements with multi-user simultaneous interaction",
            "High-throughput stereo camera input (ZED SDK) requiring low-latency processing",
            "Deployment on constrained exhibit hardware with no dedicated GPU infrastructure",
            "Robustness across variable physical environments — lighting, spacing, and calibration",
            "Non-technical end users: scientists, educators, and general public audiences",
          ],
          approach:
            "Designed a modular pipeline combining computer vision, real-time rendering, and gesture recognition. Built gesture interaction using ZED stereo cameras and OpenCV with CUDA acceleration for tracking and interpreting user movement. Developed a configurable ImGui-based setup wizard to automate deployment, calibration, and system validation, reducing friction for non-technical operators. Integrated the full pipeline into Unity to render interactive PACE satellite visualizations across multiple display environments.",
          architectureDiagram: 'nasa',
          architectureNote:
            "ZED stereo camera → OpenCV + CUDA gesture pipeline → Unity rendering engine → ImGui setup wizard for calibration and validation",
          metrics: [
            { label: "Setup & calibration time", baseline: "Manual multi-step process", achieved: "~70% reduction via automated wizard" },
            { label: "Gesture recognition latency", baseline: "Not real-time", achieved: "<100ms end-to-end" },
            { label: "Simultaneous users supported", baseline: "Single user", achieved: "2–4 participants" },
            { label: "Runtime errors", baseline: "Manual validation only", achieved: "Eliminated via automated pre-flight checks" },
          ],
          productImpact:
            "Delivered an interactive exhibit system used to demonstrate NASA PACE mission data for public education and scientific outreach. Enabled intuitive exploration of satellite-derived oceanographic data without requiring domain expertise, bridging the gap between raw scientific output and accessible visualization. Improved deployment scalability so non-technical staff could independently configure and run the system. Premiered at the Kennedy Center in Washington, D.C., with a scheduled national museum tour.",
          techStack: ["C#", "C++", "Python", "Unity", "OpenCV", "ZED SDK", "CUDA", "ImGui", "OpenGL", "React", "TypeScript", "GraphQL"],
          links: [
            { label: "NASA PACE — WAVE exhibit page", url: "https://pace.oceansciences.org/wave_space_to_ocean.htm" },
            { label: "UMD IMD — project feature", url: "https://imd.umd.edu/articles/wave-new-understanding-about-earths-oceans-and-atmosphere" },
            { label: "UMD CMNS — Kennedy Center premiere", url: "https://cmns.umd.edu/news-events/news/wave-exhibit-kennedy-center-pace-nasa" },
          ],
          linksNote:
            "Exhibit code is owned by the university/NASA partnership; third-party press coverage above independently documents the project.",
        } satisfies CaseStudy,
    },
    {
      id: 'simlyfe',
      type: 'project',
      flagship: true,
      title: "SIMLYFE: LLM-Driven Life Simulator",
      company: "Personal Project",
      location: "",
      date: "2025 – 2026",
      sortKey: 202612,
      description: [
        "Built and shipped a mobile-first, browser-based life simulation game where players age a character year by year through careers, relationships, finances, and procedurally generated life events.",
        "Integrated GPT-4o-mini as a life-event generation engine behind a server-side LLM proxy, keeping API keys off the client entirely.",
        "Engineered deterministic game systems (economy, career ladders, relationship dynamics) that blend with LLM-generated narrative events.",
        "Wrote 350+ automated test assertions across the game engine, LLM integration, and market modules using Vitest.",
        "Live at simlyfe.vercel.app — React 19, Vite, Firebase cloud saves, Supabase Edge Functions.",
      ],
      detailedContent: `
SIMLYFE is a shipped, browser-based life simulation game — the kind of project that only works when deterministic game systems and non-deterministic LLM output are engineered to coexist.

Key Contributions & Technical Details:
- LLM Event Engine: Life events are generated by GPT-4o-mini, constrained by structured prompts that encode the character's age, career, relationships, and financial state, so generated events stay coherent with the simulation state.
- Server-Side Key Proxy: All LLM calls route through Supabase Edge Functions, so the OpenAI API key never ships to the browser — the same key-hygiene pattern used in production systems.
- Deterministic Core: The economy, career progression, and relationship systems are pure TypeScript modules — unit-testable, seedable, and independent of the LLM layer.
- Test Discipline: 350+ Vitest assertions cover the engine, LLM integration boundaries, and market modules, keeping refactors safe.
- Shipped Product: Cloud saves via Firebase, mobile-first dark glassmorphism UI, deployed on Vercel.
      `,
      links: [
        { label: "Live Demo", url: "https://simlyfe.vercel.app" },
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
          "Split the architecture into a deterministic TypeScript simulation core (economy, careers, relationships — pure functions, fully unit-tested) and an LLM narrative layer that receives structured game-state context and returns schema-validated events. All GPT-4o-mini calls route through Supabase Edge Functions acting as a server-side proxy, keeping keys off the client. Firebase handles cloud saves. The boundary between the two layers is contract-tested so LLM misbehavior degrades to fallback events instead of corrupting state.",
        architectureDiagram: 'simlyfe',
        architectureNote:
          "React 19 client → deterministic simulation core ⇄ Supabase Edge Function proxy → GPT-4o-mini event engine; Firebase cloud saves",
        metrics: [
          { label: "Automated test assertions", baseline: "0", achieved: "350+ (engine, LLM boundary, market)" },
          { label: "Client-side API key exposure", baseline: "Common naive pattern", achieved: "Zero — server-side proxy" },
          { label: "Deployment", baseline: "Prototype", achieved: "Live on Vercel with cloud saves" },
        ],
        productImpact:
          "A shipped, publicly playable game demonstrating production LLM integration patterns: structured prompting against live application state, server-side key management, schema validation at the LLM boundary, and a test suite that keeps deterministic and generative layers safely separated.",
        techStack: [
          "React 19", "TypeScript", "Vite", "Supabase Edge Functions", "Firebase",
          "OpenAI GPT-4o-mini", "Vitest", "Vercel",
        ],
        links: [
          { label: "Live Demo", url: "https://simlyfe.vercel.app" },
          { label: "GitHub Repository", url: "https://github.com/xmike04/SIMLYFE" },
        ],
      } satisfies CaseStudy,
    },
  ] satisfies ProjectItem[],
  education: [
    {
      school: "The University of North Texas (UNT)",
      degree: "MS, Artificial Intelligence (Machine Learning Focus)",
      date: "Expected May 2027",
      grade: "In Progress — Year 1 of 2",
      progress: 0.25,
      coursework: [
        "Applied Artificial Intelligence — search, heuristics, problem solving",
        "Advanced Machine Learning — supervised/unsupervised learning, deep learning fundamentals",
      ],
    },
    {
      school: "The University of North Texas (UNT)",
      degree: "BS, Computer Science Engineering",
      date: "May 2025",
      grade: "Graduated",
      gpa: "3.25 (4.0 Scale)",
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
    "What did Michael build for NASA?",
    "How does SIMLYFE use GPT-4o-mini?",
    "What is Michael studying in his master's?",
    "What's in the interactive ML Lab?",
  ],
  certifications: [
    "Intro to Web Development with HTML, CSS, & Bootstrap",
    "Web Development with JavaScript & APIs",
  ],
  interests: [
    "Treasurer of UNT AI Club (2023–Present) — led AI/ML workshops and hackathon participation.",
  ],
};

export type ResumeData = typeof resumeData;
