
import type { CaseStudy } from '@/components/case-study-view';
export type { CaseStudy };

export const resumeData = {
  name: "Michael E. Marin",
  contact: {
    email: "miked24977@gmail.com",
    phone: "4699800069",
    location: "Dallas, TX",
  },
  summary:
    "AI/ML-focused computer science graduate with hands-on experience developing scalable systems and immersive interfaces for NASA and enterprise users. Expert in designing end-to-end AI pipelines, including React/TypeScript full-stack visualization layers, ImGui/OpenCV setup automation, and TensorFlow/PyTorch deep learning models, delivering quantifiable impact (e.g. 99% accuracy, 40% query speed-ups). Passionate about bridging technical innovation and user value to drive meaningful product outcomes in AI-driven organizations.",
  skills: [
    {
      category: "Programming Languages",
      technologies: ["Python", "JavaScript (React, Node.js, TypeScript)", "C++", "SQL"],
    },
    {
      category: "AI/ML & Data Science",
      technologies: ["TensorFlow", "PyTorch", "OpenCV", "NLP", "RAG Pipelines", "Scikit-learn"],
    },
    {
      category: "Cloud & DevOps",
      technologies: ["AWS", "Google Cloud (Vertex AI, BigQuery)", "Docker", "Kubernetes", "GitHub Actions", "CI/CD pipelines", "Linux"],
    },
    {
      category: "Backend Development",
      technologies: ["Node.js", "FastAPI", "Flask", "PostgreSQL", "pgvector", "Redis", "Firebase", "RESTful APIs"],
    },
  ],
  workExperience: [
    {
      id: 'mr-cooper-internship',
      type: 'work',
      title: "Product Analyst Intern, AI/ ML team",
      company: "Mr. Cooper Group",
      location: "Dallas, TX",
      date: "May 2025",
      logo: "https://placehold.co/200x50.png",
      logoAiHint: "company logo",
      description: [
        "Selected for a competitive 10-week internship with the Product Management AI/ML team.",
        "Contributing to the development and support of internal Agentic AI products to help automate customer service.",
        "Responsibilities include story writing, user testing, model evaluation, and cross-functional collaboration with design, engineering, and business units.",
        "Exposure to tools such as Azure DevOps, MySQL, Microsoft Copilot, Google Cloud Services(GCS), and LucidChart in support of digital transformation and intelligent automation efforts.",
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
  ],
  projects: [
    {
        id: 'nasa-waving-project',
        type: 'project',
        title: "Waving: From Space to Ocean (Senior Project)",
        company: "Collaborated with NASA Goddard Program, University of Maryland, and UNT",
        location: "",
        date: "Jan 2024 – May 2025",
        description: [
            "Lead a team of 5 to develop a interactive data visualizations in React and TypeScript, enabling real-time analytics for NASA's PACE Satellite.",
            "Built full-stack applications integrating cloud data pipelines for large-scale scientific computations.",
            "Designed a Setup Wizard using ImGui and OpenCV, optimizing user configuration workflows.",
            "Implemented scalable APIs and GraphQL endpoints for cross-platform data integration.",
            "Currently being showcases at Kennedy Museum in Washington D.C.; Set to travel to different museums across the country.",
        ],
        detailedContent: `
The "Waving: From Space to Ocean" project is a capstone initiative in collaboration with NASA, the University of Maryland, and the University of North Texas. As the team lead, I guided a group of five students to build a comprehensive data visualization and analysis platform for NASA's PACE (Plankton, Aerosol, Cloud, ocean Ecosystem) satellite mission.

Key Contributions & Technical Details:
- Interactive Data Visualization: We developed a sophisticated front-end using React and TypeScript, allowing scientists and researchers to perform real-time analytics on complex oceanographic and atmospheric data. The visualizations are designed to be intuitive and interactive, facilitating new discoveries.
- Full-Stack Cloud Architecture: I was responsible for architecting and implementing a full-stack application that connects to NASA's data pipelines. This involved setting up cloud infrastructure capable of handling large-scale scientific computations and data streaming.
- Optimized User Workflow: To streamline the setup process for researchers, I designed and built a Setup Wizard using ImGui and OpenCV. This tool automates the configuration of the analysis environment, significantly reducing setup time and potential for errors.
- Scalable Data Integration: We implemented a robust backend with scalable APIs and GraphQL endpoints to ensure seamless data integration from various sources and across different platforms.

This project is not only a technical achievement but also a significant contribution to the scientific community. It is currently being showcased at the Kennedy Museum in Washington D.C. and is scheduled to tour other museums, bringing the science of the PACE mission to the public.
        `,
        links: [
          { label: "Live Demo", url: "https://linkedin.com/in/xmike04" },
          { label: "GitHub Repository", url: "https://github.com/xmike04" }
        ]
    },
    {
      id: 'ragops-platform',
      type: 'project',
      title: "RAGOps: Production-Grade RAG Platform",
      company: "Personal Project",
      location: "",
      date: "2024 – 2025",
      description: [
        "Built a production-grade RAG platform with hybrid retrieval (vector + BM25), cross-encoder reranking, and citation-based answer generation.",
        "Designed end-to-end LLM pipeline: document ingestion, semantic chunking, embedding, hybrid retrieval, and generation using FastAPI and PostgreSQL (pgvector).",
        "Implemented observability layer tracking retrieval latency, token usage, cost, and per-query diagnostics via an admin dashboard.",
        "Developed evaluation framework with 150+ benchmark queries measuring Recall@k, MRR, and answer correctness.",
        "Hybrid retrieval improved Recall@10 significantly over dense-only baseline; reranking reduced irrelevant context and improved answer precision.",
      ],
      detailedContent: `
RAGOps is a production-oriented Retrieval-Augmented Generation platform built to address core limitations of naive LLM systems: poor retrieval quality, hallucinations, lack of observability, and no evaluation framework. The system enables users to create domain-specific knowledge bases from unstructured documents and query them through a fully instrumented RAG pipeline that prioritizes grounded responses, retrieval transparency, and measurable performance.

Key Contributions & Technical Details:
- Hybrid Retrieval Architecture: Moved beyond naive embedding-only retrieval by combining dense vector search (semantic similarity via pgvector) with lexical retrieval (BM25-style keyword matching), then fusing results with a cross-encoder reranker. This multi-stage pipeline significantly improved Recall@10 and answer precision over the dense-only baseline.
- End-to-End LLM Pipeline: Designed the full ingestion-to-generation stack — PDF/markdown/HTML parsing, semantic chunking with configurable overlap, embedding generation, and indexing into PostgreSQL with pgvector. Queries flow through retrieval, reranking, and structured prompt construction before LLM generation.
- Observability & Tracing: Implemented a full query tracing layer capturing retrieval latency vs generation latency, token usage, cost per query, retrieved document distribution, reranker impact, and failure rates. All traces are inspectable in an admin dashboard for debugging and optimization.
- Evaluation Framework: Developed a structured benchmark pipeline with 150+ curated question-answer pairs and ground-truth documents. Metrics include Recall@k, MRR, citation accuracy, answer correctness, latency, and cost. Used experiments (dense vs hybrid, with/without reranking, fixed vs semantic chunking) to drive iterative improvements.
- Hallucination Prevention: Fallback mechanism rejects low-evidence queries rather than generating ungrounded responses. Responses include source citations and retrieved supporting passages.
      `,
      links: [
        { label: "GitHub Repository", url: "https://github.com/xmike04" }
      ],
      caseStudy: {
        problem:
          "Naive RAG systems built on embedding-only retrieval suffer from poor recall on out-of-distribution queries, context pollution from irrelevant chunks, and zero visibility into why a given answer was produced. There was no systematic way to measure or improve retrieval quality over time.",
        constraints: [
          "Heterogeneous document formats (PDF, markdown, HTML) required a unified ingestion pipeline",
          "Query latency budget: end-to-end response under 3 seconds including reranking",
          "Cost per query had to remain viable for self-hosted, single-tenant use",
          "Evaluation required ground-truth labels — 150 QA pairs curated manually",
          "No managed vector database; pgvector on PostgreSQL to keep the stack minimal",
        ],
        approach:
          "Replaced single-stage dense retrieval with a three-stage pipeline: (1) dual retrieval combining pgvector ANN search with BM25-style lexical matching, (2) score fusion to merge candidate lists, and (3) a cross-encoder reranker applied to the top-k candidates before passing context to the LLM. Chunking strategy was switched from fixed-size to semantic boundaries to improve chunk coherence. A fallback gate rejects low-confidence queries rather than hallucinating. Evaluation was embedded into the development loop — every pipeline change was measured against the 150-query benchmark before merging.",
        architectureNote:
          "Ingestion → Chunker → Embedder → pgvector + BM25 index → Fusion → Cross-encoder reranker → LLM generation → Traced response",
        metrics: [
          { label: "Recall@10", baseline: "~58%", achieved: "~81%" },
          { label: "Answer precision (manual)", baseline: "62%", achieved: "84%" },
          { label: "Irrelevant context rate", baseline: "31%", achieved: "11%" },
          { label: "Avg query latency", baseline: "1.1 s", achieved: "2.4 s (reranker added)" },
          { label: "Benchmark queries", baseline: "0", achieved: "150 QA pairs" },
        ],
        productImpact:
          "RAGOps functions as a self-hostable knowledge-base Q&A system for domain-specific document corpora. The observability dashboard lets an operator debug retrieval failures without re-running experiments manually. The evaluation framework enables confident iteration — any retrieval change is quantified before deployment, treating the LLM application as infrastructure rather than a prototype.",
        techStack: [
          "Python", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Celery",
          "Next.js", "TypeScript", "BM25", "Cross-encoder reranker", "LLM API",
        ],
        links: [
          { label: "GitHub Repository", url: "https://github.com/xmike04" },
        ],
      } satisfies CaseStudy,
    }
  ],
  education: [
    {
      school: "The University of North Texas (UNT)",
      degree: "MS, Artificial Intelligence (Machine Learning Focus)",
      date: "Expected May 2027",
      grade: "In Progress",
    },
    {
      school: "The University of North Texas (UNT)",
      degree: "BS, Computer Science Engineering",
      date: "May 2025",
      grade: "Graduated",
      gpa: "3.25 (4.0 Scale)",
    },
  ],
  certifications: [
    "Intro to Web Development with HTML, CSS, & Bootstrap",
    "Web Development with JavaScript & APIs",
  ],
  interests: [
    "Treasurer of UNT AI Club (2023-Current) – Led AI/ML workshops and hackathon participation.",
  ],
};

// Raw text version for the AI
export const resumeText = `
Michael E. Marin
Dallas, TX
Cell: 4699800069
Email: miked24977@gmail.com

SUMMARY
AI/ML-focused computer science graduate with hands-on experience developing scalable systems and immersive interfaces for NASA and enterprise users. Expert in designing end-to-end AI pipelines, including React/TypeScript full-stack visualization layers, ImGui/OpenCV setup automation, and TensorFlow/PyTorch deep learning models, delivering quantifiable impact (e.g. 99% accuracy, 40% query speed-ups). Passionate about bridging technical innovation and user value to drive meaningful product outcomes in AI-driven organizations.

SKILLS
• Programming Languages: Python, JavaScript (React, Node.js, TypeScript), C++, SQL
• AI/ML & Data Science: TensorFlow, PyTorch, OpenCV, NLP, RAG Pipelines, Scikit-learn
• Cloud & DevOps: AWS, Google Cloud (Vertex AI, BigQuery), Docker, Kubernetes, GitHub Actions, CI/CD pipelines, Linux
• Backend Development: Node.js, Flask, PostgreSQL, Firebase, RESTful APIs

WORK EXPERIENCE
Mr. Cooper Group (Dallas, TX)
Product Analyst Intern, AI/ ML team | May 2025
• Selected for a competitive 10-week internship with the Product Management AI/ML team.
• Contributing to the development and support of internal Agentic AI products to help automate customer service
• Responsibilities include story writing, user testing, model evaluation, and cross-functional collaboration with design, engineering, and business units.
• Exposure to tools such as Azure DevOps, MySQL, Microsoft Copilot, Google Cloud Services(GCS), and LucidChart in support of digital transformation and intelligent automation efforts.

EDUCATION
The University of North Texas (UNT) | May 2025
BS, Computer Science Engineering
Grade: Graduated | GPA: (4.0 Scale): 3.25
MS, Artificial Intelligence (focus in ML)
Grade: Year 1 of 2
Relevant Coursework:
• Applied Artificial Intelligence (AI) – Fundamentals of AI, search algorithms, heuristics, and problem solving techniques.
• Advanced Machine Learning – Supervised/unsupervised learning, deep learning fundamentals, and data preprocessing.
• Computer Science III – Advanced programming concepts, data structures, algorithms, and engineering principles.

PROJECTS
Waving: From Space to Ocean (Senior Project)
Collaborated with NASA Goddard Program, University of Maryland, and UNT | Jan 2024 – May 2025
• Lead a team of 5 to develop a interactive data visualizations in React and TypeScript, enabling real-time analytics for NASA's PACE Satellite.
• Built full-stack applications integrating cloud data pipelines for large-scale scientific computations.
• Designed a Setup Wizard using ImGui and OpenCV, optimizing user configuration workflows.
• Implemented scalable APIs and GraphQL endpoints for cross-platform data integration.
• Currently being showcases at Kennedy Museum in Washington D.C.; Set to travel to different museums across the country.

RAGOps: Production-Grade RAG Platform
Personal Project | 2024 – 2025
• Built a production-grade RAG platform with hybrid retrieval (vector + BM25), cross-encoder reranking, and citation-based answer generation.
• Designed end-to-end LLM pipeline including document ingestion, chunking, embedding, retrieval, and generation using FastAPI and PostgreSQL (pgvector).
• Implemented observability layer tracking latency, token usage, cost, and retrieval diagnostics per query.
• Developed evaluation framework with 150+ benchmark queries measuring Recall@k, MRR, and answer correctness.
• Hybrid retrieval improved Recall@10 significantly over dense-only baseline; reranking reduced irrelevant context and improved answer precision.

CERTIFICATIONS, TECHNICAL SKILLS & INTERESTS
• Intro to Web Development with HTML, CSS, & Bootstrap
• Web Development with JavaScript & APIs
• Treasurer of UNT AI Club (2023-Current) – Led AI/ML workshops and hackathon participation.
`;
