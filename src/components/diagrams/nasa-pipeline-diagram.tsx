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
 * Live path (left → right): ZED Stereo Camera → OpenCV + CUDA gesture
 * pipeline → Unity rendering → exhibit display. The ImGui Setup Wizard
 * feeds calibration into the pipeline and camera before showtime.
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
      label="NASA PACE exhibit architecture diagram. A ZED stereo camera streams depth and RGB data into an OpenCV plus CUDA gesture pipeline, which drives Unity rendering of PACE satellite visuals on the exhibit display. An ImGui setup wizard feeds calibration and validation settings into the gesture pipeline and camera before showtime."
      legend={[
        { label: 'Live gesture → render path', tone: 'primary' },
        { label: 'Operator setup & calibration', tone: 'accent' },
      ]}
    >
      {/* ── Edges ── */}
      <DiagramEdge d={E.cameraToPipeline} />
      <DiagramEdge d={E.pipelineToUnity} />
      <DiagramEdge d={E.unityToDisplay} />
      <DiagramEdge
        d={E.wizardToPipeline}
        tone="accent"
        label="calibration · validation"
        labelX={320}
        labelY={176}
        labelAnchor="start"
      />
      <DiagramEdge
        d={E.wizardToCamera}
        tone="accent"
        dashed
        label="camera setup"
        labelX={155}
        labelY={222}
      />

      {/* ── Flow particles ── */}
      <FlowParticle d={E.cameraToPipeline} duration={1.8} />
      <FlowParticle d={E.pipelineToUnity} duration={1.8} delay={0.9} />
      <FlowParticle d={E.unityToDisplay} duration={1.8} delay={1.8} />
      <FlowParticle d={E.wizardToPipeline} tone="accent" duration={2.4} delay={0.5} />

      {/* ── Live path ── */}
      <DiagramNode x={16} y={72} width={156} height={60} title="ZED Stereo Camera" sub="depth + RGB stream" tone="primary" />
      <DiagramNode x={220} y={72} width={180} height={60} title="Gesture Pipeline" sub="OpenCV + CUDA" tone="primary" />
      <DiagramNode x={448} y={72} width={164} height={60} title="Unity Rendering" sub="PACE data visuals" tone="primary" />
      <DiagramNode x={660} y={72} width={164} height={60} title="Exhibit Display" sub="multi-user interaction" highlight />

      {/* ── Setup wizard ── */}
      <DiagramNode x={220} y={204} width={180} height={56} title="ImGui Setup Wizard" sub="~70% faster setup" tone="accent" />
    </DiagramContainer>
  );
}
