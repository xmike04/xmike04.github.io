'use client';

import {
  DiagramContainer,
  DiagramEdge,
  DiagramNode,
  FlowParticle,
} from './diagram-primitives';

/**
 * RAGOps hybrid-retrieval pipeline.
 *
 * Row 1 (left → right): Documents → Ingestion/Chunker → Embedder, branching
 * into pgvector (dense, primary) and BM25 (lexical, accent) indexes that
 * converge on Score Fusion. A sweep carries the fused candidates down to
 * row 2: Cross-encoder Reranker → LLM Generation → Cited Answer, with an
 * Observability/Tracing bus tapping the generation stages.
 */

// Edge paths (also driven by FlowParticles, so they are shared constants).
const E = {
  docsToChunker: 'M 128 124 L 154 124',
  chunkerToEmbedder: 'M 312 124 L 334 124',
  embedderToPgvector:
    'M 440 124 L 452 124 Q 460 124 460 116 L 460 62 Q 460 54 468 54 L 472 54',
  embedderToBm25:
    'M 440 124 L 452 124 Q 460 124 460 132 L 460 186 Q 460 194 468 194 L 472 194',
  pgvectorToFusion:
    'M 618 54 L 630 54 Q 638 54 638 62 L 638 116 Q 638 124 646 124 L 650 124',
  bm25ToFusion:
    'M 618 194 L 630 194 Q 638 194 638 186 L 638 132 Q 638 124 646 124 L 650 124',
  fusionToReranker:
    'M 720 152 L 720 240 Q 720 248 712 248 L 56 248 Q 48 248 48 256 L 48 320 Q 48 328 56 328 L 90 328',
  rerankerToLlm: 'M 276 328 L 318 328',
  llmToAnswer: 'M 472 328 L 522 328',
  tapReranker: 'M 182 356 L 182 400',
  tapLlm: 'M 398 356 L 398 400',
  tapAnswer: 'M 596 356 L 596 400',
} as const;

export default function RagPipelineDiagram() {
  return (
    <DiagramContainer
      viewBox="0 0 840 470"
      minWidth={760}
      label="RAGOps architecture diagram. Documents flow through ingestion and semantic chunking, then embedding. Retrieval branches in parallel into a pgvector dense index and a BM25 lexical index, whose candidates merge in score fusion. Fused top-k candidates pass to a cross-encoder reranker, then LLM generation, producing a cited answer. An observability and tracing layer taps the reranking, generation, and answer stages, capturing latency, token usage, and cost."
      legend={[
        { label: 'Dense retrieval path', tone: 'primary' },
        { label: 'Lexical branch (BM25)', tone: 'accent' },
        { label: 'Telemetry taps', tone: 'muted', dashed: true },
      ]}
    >
      {/* ── Edges ── */}
      <DiagramEdge d={E.docsToChunker} />
      <DiagramEdge d={E.chunkerToEmbedder} />
      <DiagramEdge d={E.embedderToPgvector} />
      <DiagramEdge d={E.embedderToBm25} tone="accent" />
      <DiagramEdge d={E.pgvectorToFusion} />
      <DiagramEdge d={E.bm25ToFusion} tone="accent" />
      <DiagramEdge
        d={E.fusionToReranker}
        label="top-k candidates"
        labelX={384}
        labelY={240}
      />
      <DiagramEdge d={E.rerankerToLlm} />
      <DiagramEdge d={E.llmToAnswer} />
      <DiagramEdge d={E.tapReranker} tone="muted" dashed arrow={false} />
      <DiagramEdge d={E.tapLlm} tone="muted" dashed arrow={false} />
      <DiagramEdge d={E.tapAnswer} tone="muted" dashed arrow={false} />

      {/* ── Flow particles ── */}
      <FlowParticle d={E.docsToChunker} duration={1.6} />
      <FlowParticle d={E.chunkerToEmbedder} duration={1.6} delay={0.8} />
      <FlowParticle d={E.embedderToPgvector} duration={2.4} delay={0.4} />
      <FlowParticle d={E.embedderToBm25} tone="accent" duration={2.4} delay={1.2} />
      <FlowParticle d={E.pgvectorToFusion} duration={2.4} delay={1.6} />
      <FlowParticle d={E.bm25ToFusion} tone="accent" duration={2.4} delay={2.4} />
      <FlowParticle d={E.fusionToReranker} duration={5} />
      <FlowParticle d={E.fusionToReranker} duration={5} delay={2.5} />
      <FlowParticle d={E.rerankerToLlm} duration={1.8} delay={1} />
      <FlowParticle d={E.llmToAnswer} duration={1.8} delay={2} />

      {/* ── Row 1: ingestion + retrieval ── */}
      <DiagramNode x={16} y={96} width={112} height={56} title="Documents" sub="PDF · MD · HTML" />
      <DiagramNode x={160} y={96} width={152} height={56} title="Ingestion · Chunker" sub="semantic chunking" />
      <DiagramNode x={340} y={96} width={100} height={56} title="Embedder" sub="dense vectors" tone="primary" />

      {/* Parallel branch */}
      <DiagramNode x={478} y={28} width={140} height={52} title="pgvector index" sub="dense ANN" tone="primary" />
      <DiagramNode x={478} y={168} width={140} height={52} title="BM25 index" sub="lexical match" tone="accent" />

      <DiagramNode x={656} y={96} width={128} height={56} title="Score Fusion" sub="merge candidates" tone="primary" />

      {/* ── Row 2: rerank + generation ── */}
      <DiagramNode x={88} y={300} width={188} height={56} title="Cross-encoder Reranker" sub="top-k rescoring" tone="primary" />
      <DiagramNode x={324} y={300} width={148} height={56} title="LLM Generation" sub="grounded prompt" tone="primary" />
      <DiagramNode x={528} y={300} width={136} height={56} title="Cited Answer" sub="with sources" highlight />

      {/* ── Observability bus ── */}
      <DiagramNode
        x={96}
        y={404}
        width={568}
        height={50}
        title="Observability · Tracing"
        sub="latency · tokens · cost · per-query traces"
      />
    </DiagramContainer>
  );
}
