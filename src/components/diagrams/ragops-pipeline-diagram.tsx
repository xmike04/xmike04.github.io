const nodes = [
  { x: 20, y: 56, w: 118, h: 46, title: 'React console', detail: 'Ops + traces' },
  { x: 174, y: 56, w: 104, h: 46, title: 'FastAPI', detail: 'Search + ingest' },
  { x: 314, y: 18, w: 128, h: 46, title: 'Redis worker', detail: 'Async ingestion' },
  { x: 314, y: 94, w: 128, h: 46, title: 'PostgreSQL', detail: 'pgvector + data' },
  { x: 480, y: 56, w: 112, h: 46, title: 'Lexical + vector', detail: 'Sequential queries' },
  { x: 628, y: 56, w: 92, h: 46, title: 'RRF', detail: 'Fusion' },
  { x: 756, y: 56, w: 126, h: 46, title: 'Optional rerank', detail: 'Cross-encoder' },
];

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="currentColor"
      strokeWidth="2"
      markerEnd="url(#ragops-arrow)"
      className="text-primary/60"
    />
  );
}

export default function RagopsPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 902 184"
      role="img"
      aria-labelledby="ragops-diagram-title ragops-diagram-description"
      className="h-auto w-full"
    >
      <title id="ragops-diagram-title">RAGOps platform architecture</title>
      <desc id="ragops-diagram-description">
        The React operations console calls FastAPI, which coordinates a Redis ingestion worker and
        PostgreSQL with pgvector. PostgreSQL cover-density lexical ranking and vector retrieval run
        sequentially before reciprocal rank fusion and optional reranking. Hash embeddings are the
        default. The separate offline experiment uses BM25 and MiniLM. Prometheus scrapes API metrics.
      </desc>
      <defs>
        <marker id="ragops-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-primary/60" />
        </marker>
        <linearGradient id="ragops-node" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
          <stop offset="1" stopColor="hsl(var(--accent))" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      <Arrow x1={138} y1={79} x2={174} y2={79} />
      <Arrow x1={278} y1={72} x2={314} y2={43} />
      <Arrow x1={278} y1={86} x2={314} y2={117} />
      <Arrow x1={378} y1={64} x2={378} y2={94} />
      <Arrow x1={442} y1={117} x2={480} y2={88} />
      <Arrow x1={592} y1={79} x2={628} y2={79} />
      <Arrow x1={720} y1={79} x2={756} y2={79} />

      {nodes.map((node) => (
        <g key={node.title}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx="10"
            fill="url(#ragops-node)"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.45"
          />
          <text x={node.x + node.w / 2} y={node.y + 19} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
            {node.title}
          </text>
          <text x={node.x + node.w / 2} y={node.y + 34} textAnchor="middle" className="fill-muted-foreground text-[8px]">
            {node.detail}
          </text>
        </g>
      ))}

      <g>
        <rect x="330" y="158" width="242" height="22" rx="11" fill="hsl(var(--muted))" fillOpacity="0.55" />
        <text x="451" y="172" textAnchor="middle" className="fill-muted-foreground text-[9px] font-medium">
          API metrics · Prometheus + Grafana
        </text>
        <path d="M 330 169 H 226 V 102" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ragops-arrow)" className="text-muted-foreground/60" />
      </g>
    </svg>
  );
}
