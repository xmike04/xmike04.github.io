'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from 'next-themes';

const COUNT = 800;
const BOUNDS = { x: 9.5, y: 5.5, z: 3.5 } as const;
const NEIGHBOR_DISTANCE = 1.0;
const MAX_SEGMENTS = 700;
const DRIFT_AMPLITUDE = 0.26;

interface FieldData {
  /** Mutated in place every frame — shared with the line pass below. */
  positions: Float32Array;
  basePositions: Float32Array;
  phases: Float32Array;
  freqs: Float32Array;
  violetMask: Uint8Array;
  /** Flattened [a, b, a, b, ...] point-index pairs. */
  pairs: Uint16Array;
  segmentCount: number;
  linePositions: Float32Array;
}

let fieldCache: FieldData | null = null;

/**
 * Generates the point cloud and its proximity graph exactly once per page
 * load. The O(n²) neighbor search never runs again — per-frame work only
 * copies coordinates through the precomputed index pairs.
 */
function getField(): FieldData {
  if (fieldCache) return fieldCache;

  const basePositions = new Float32Array(COUNT * 3);
  const positions = new Float32Array(COUNT * 3);
  const phases = new Float32Array(COUNT * 3);
  const freqs = new Float32Array(COUNT * 3);
  const violetMask = new Uint8Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    basePositions[i3] = (Math.random() * 2 - 1) * BOUNDS.x;
    basePositions[i3 + 1] = (Math.random() * 2 - 1) * BOUNDS.y;
    basePositions[i3 + 2] = (Math.random() * 2 - 1) * BOUNDS.z;
    for (let k = 0; k < 3; k++) {
      phases[i3 + k] = Math.random() * Math.PI * 2;
      freqs[i3 + k] = 0.12 + Math.random() * 0.25;
    }
    violetMask[i] = Math.random() < 0.3 ? 1 : 0;
  }
  positions.set(basePositions);

  const pairList: number[] = [];
  const maxSq = NEIGHBOR_DISTANCE * NEIGHBOR_DISTANCE;
  outer: for (let a = 0; a < COUNT; a++) {
    const a3 = a * 3;
    for (let b = a + 1; b < COUNT; b++) {
      const b3 = b * 3;
      const dx = basePositions[a3] - basePositions[b3];
      const dy = basePositions[a3 + 1] - basePositions[b3 + 1];
      const dz = basePositions[a3 + 2] - basePositions[b3 + 2];
      if (dx * dx + dy * dy + dz * dz < maxSq) {
        pairList.push(a, b);
        if (pairList.length >= MAX_SEGMENTS * 2) break outer;
      }
    }
  }

  const pairs = new Uint16Array(pairList);
  const segmentCount = pairs.length / 2;
  const linePositions = new Float32Array(segmentCount * 6);
  for (let s = 0; s < segmentCount; s++) {
    const a3 = pairs[s * 2] * 3;
    const b3 = pairs[s * 2 + 1] * 3;
    const o = s * 6;
    linePositions[o] = basePositions[a3];
    linePositions[o + 1] = basePositions[a3 + 1];
    linePositions[o + 2] = basePositions[a3 + 2];
    linePositions[o + 3] = basePositions[b3];
    linePositions[o + 4] = basePositions[b3 + 1];
    linePositions[o + 5] = basePositions[b3 + 2];
  }

  fieldCache = { positions, basePositions, phases, freqs, violetMask, pairs, segmentCount, linePositions };
  return fieldCache;
}

function FieldScene({ isLight }: { isLight: boolean }) {
  const field = useMemo(getField, []);
  const linesRef = useRef<THREE.LineSegments>(null);
  const spinRef = useRef<THREE.Group>(null);
  const parallaxRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const colors = useMemo(() => {
    const cyan = new THREE.Color(isLight ? '#0e7490' : '#22d3ee');
    const violet = new THREE.Color(isLight ? '#7c3aed' : '#a78bfa');
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const c = field.violetMask[i] ? violet : cyan;
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [isLight, field]);

  // Track the pointer on window — the canvas sits behind the hero content
  // (pointer-events: none), so r3f's own pointer plumbing never fires.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { positions, basePositions, phases, freqs, pairs, segmentCount } = field;

    // Drift every point on its own sine orbit (drei <Points> flags the
    // position attribute for upload each frame).
    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = basePositions[i] + Math.sin(t * freqs[i] + phases[i]) * DRIFT_AMPLITUDE;
    }

    // Re-anchor the precomputed segments to the drifted points.
    const lineGeom = linesRef.current?.geometry;
    if (lineGeom) {
      const lp = lineGeom.attributes.position.array as Float32Array;
      for (let s = 0; s < segmentCount; s++) {
        const a3 = pairs[s * 2] * 3;
        const b3 = pairs[s * 2 + 1] * 3;
        const o = s * 6;
        lp[o] = positions[a3];
        lp[o + 1] = positions[a3 + 1];
        lp[o + 2] = positions[a3 + 2];
        lp[o + 3] = positions[b3];
        lp[o + 4] = positions[b3 + 1];
        lp[o + 5] = positions[b3 + 2];
      }
      lineGeom.attributes.position.needsUpdate = true;
    }

    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.02;
    }
    if (parallaxRef.current) {
      const damp = Math.min(1, delta * 2.5);
      parallaxRef.current.rotation.y = THREE.MathUtils.lerp(parallaxRef.current.rotation.y, pointer.current.x * 0.16, damp);
      parallaxRef.current.rotation.x = THREE.MathUtils.lerp(parallaxRef.current.rotation.x, pointer.current.y * 0.1, damp);
    }
  });

  return (
    <group ref={parallaxRef}>
      <group ref={spinRef} rotation={[0.12, 0, 0]}>
        <Points positions={field.positions} colors={colors} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            vertexColors
            size={0.06}
            sizeAttenuation
            depthWrite={false}
            opacity={isLight ? 0.55 : 0.85}
            blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
            toneMapped={false}
          />
        </Points>
        <lineSegments ref={linesRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[field.linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            transparent
            color={isLight ? '#0e7490' : '#22d3ee'}
            opacity={isLight ? 0.12 : 0.15}
            depthWrite={false}
            blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
            toneMapped={false}
          />
        </lineSegments>
      </group>
    </group>
  );
}

/**
 * Ambient 3D neural point field for the hero background. Renders only when
 * both the tab and the hero are visible — otherwise the frameloop is halted.
 */
export default function NeuralField3D() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const [tabVisible, setTabVisible] = useState(true);
  const [inViewport, setInViewport] = useState(true);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);

    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), { threshold: 0 });
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={tabVisible && inViewport ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 40 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <FieldScene isLight={isLight} />
      </Canvas>
    </div>
  );
}
