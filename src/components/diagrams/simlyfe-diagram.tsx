'use client';

import {
  DiagramContainer,
  DiagramEdge,
  DiagramNode,
  FlowParticle,
} from './diagram-primitives';

/**
 * SIMLYFE architecture.
 *
 * React 19 client → deterministic simulation core, which exchanges
 * game-state context and schema-validated events with a Supabase Edge
 * Function (server-side key proxy) fronting the GPT-4o-mini event engine.
 * Firebase cloud saves hang off the client as a side node.
 */

const E = {
  clientToCore: 'M 156 106 L 200 106',
  coreToProxy: 'M 400 92 L 444 92',
  proxyToCore: 'M 448 120 L 404 120',
  proxyToGpt: 'M 632 106 L 676 106',
  clientToFirebase: 'M 86 136 L 86 210',
} as const;

export default function SimlyfeDiagram() {
  return (
    <DiagramContainer
      viewBox="0 0 840 290"
      minWidth={720}
      label="SIMLYFE architecture diagram. A React 19 client drives a deterministic simulation core covering economy, careers, and relationships. The core sends game-state context to a Supabase Edge Function acting as a server-side key proxy, which calls the GPT-4o-mini event engine and returns schema-validated events to the core. Firebase cloud saves persist progress from the client."
      legend={[
        { label: 'Simulation loop', tone: 'primary' },
        { label: 'LLM narrative events', tone: 'accent' },
        { label: 'Cloud saves', tone: 'muted', dashed: true },
      ]}
    >
      {/* ── Edges ── */}
      <DiagramEdge d={E.clientToCore} />
      <DiagramEdge
        d={E.coreToProxy}
        label="game-state context"
        labelX={424}
        labelY={66}
      />
      <DiagramEdge
        d={E.proxyToCore}
        tone="accent"
        label="schema-validated events"
        labelX={424}
        labelY={152}
      />
      <DiagramEdge d={E.proxyToGpt} tone="accent" />
      <DiagramEdge
        d={E.clientToFirebase}
        tone="muted"
        dashed
        label="saves"
        labelX={94}
        labelY={176}
        labelAnchor="start"
      />

      {/* ── Flow particles ── */}
      <FlowParticle d={E.clientToCore} duration={1.8} />
      <FlowParticle d={E.coreToProxy} duration={1.8} delay={0.9} />
      <FlowParticle d={E.proxyToGpt} tone="accent" duration={1.8} delay={1.8} />
      <FlowParticle d={E.proxyToCore} tone="accent" duration={1.8} delay={2.7} />

      {/* ── Main flow ── */}
      <DiagramNode x={16} y={76} width={140} height={60} title="React 19 Client" sub="mobile-first UI" tone="primary" />
      <DiagramNode x={200} y={76} width={200} height={60} title="Deterministic Sim Core" sub="economy·careers·relationships" tone="primary" />
      <DiagramNode x={448} y={76} width={184} height={60} title="Supabase Edge Fn" sub="server-side key proxy" tone="primary" />
      <DiagramNode x={676} y={76} width={148} height={60} title="GPT-4o-mini" sub="event engine" tone="accent" highlight />

      {/* ── Side node ── */}
      <DiagramNode x={16} y={214} width={180} height={52} title="Firebase Cloud Saves" sub="cross-device persistence" />
    </DiagramContainer>
  );
}
