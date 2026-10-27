'use client';

import {
  DiagramContainer,
  DiagramEdge,
  DiagramNode,
  FlowParticle,
} from './diagram-primitives';

/**
 * NASA PACE "Wave: From Space to Ocean" exhibit pipeline.
 *
 * Team runtime: ZED tracking → fuzzy pose/motion scores → OSC → Unity → display.
 * The ImGui wizard supports prerequisite checks and camera configuration.
 * Personal scope is documented separately in the case study; deployment is excluded.
 */

const E = {
  cameraToPipeline: 'M 172 102 L 214 102',
  pipelineToUnity: 'M 400 102 L 442 102',
  unityToDisplay: 'M 612 102 L 654 102',
  wizardToPipeline: 'M 310 204 L 310 138',
  wizardToCamera:
    'M 216 232 L 102 232 Q 94 232 94 224 L 94 138',
} as const;

export default function NasaPipelineDiagram() {
  return (
    <DiagramContainer
      viewBox="0 0 840 285"
      minWidth={720}
      label="NASA PACE team architecture: ZED body tracking feeds fuzzy pose and motion gesture scores, sent through OSC to Unity rendering and the exhibit display. The ImGui wizard supports hardware prerequisites and camera configuration. Michael’s confirmed contributions are gesture co-design, the ImGui setup interface, and Unity integration oversight; deployment was outside his role."
      legend={[
        { label: 'Live gesture → render path', tone: 'primary' },
        { label: 'Hardware setup & configuration', tone: 'accent' },
      ]}
    >
      {/* ── Edges ── */}
      <DiagramEdge d={E.cameraToPipeline} />
      <DiagramEdge d={E.pipelineToUnity} label="OSC" labelX={421} labelY={91} />
      <DiagramEdge d={E.unityToDisplay} />
      <DiagramEdge
        d={E.wizardToPipeline}
        tone="accent"
        label="prerequisites · config"
        labelX={320}
        labelY={176}
        labelAnchor="start"
      />
      <DiagramEdge
        d={E.wizardToCamera}
        tone="accent"
        dashed
        label="camera config"
        labelX={155}
        labelY={222}
      />

      {/* ── Flow particles ── */}
      <FlowParticle d={E.cameraToPipeline} duration={1.8} />
      <FlowParticle d={E.pipelineToUnity} duration={1.8} delay={0.9} />
      <FlowParticle d={E.unityToDisplay} duration={1.8} delay={1.8} />
      <FlowParticle d={E.wizardToPipeline} tone="accent" duration={2.4} delay={0.5} />

      {/* ── Live path ── */}
      <DiagramNode x={16} y={72} width={156} height={60} title="ZED Stereo Camera" sub="tracked body joints" tone="primary" />
      <DiagramNode x={220} y={72} width={180} height={60} title="Fuzzy Gesture Logic" sub="pose + motion scores" tone="primary" />
      <DiagramNode x={448} y={72} width={164} height={60} title="Unity Rendering" sub="PACE data visuals" tone="primary" />
      <DiagramNode x={660} y={72} width={164} height={60} title="Exhibit Display" sub="interactive science" highlight />

      {/* ── Setup wizard ── */}
      <DiagramNode x={220} y={204} width={180} height={56} title="ImGui Setup Wizard" sub="hardware + camera setup" tone="accent" />
    </DiagramContainer>
  );
}
