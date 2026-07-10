'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/** Always-present base layer — also serves as the reduced-motion visual. */
function StaticBackdrop() {
  return (
    <div className="mesh-bg absolute inset-0" aria-hidden="true">
      <div className="grid-bg absolute inset-0 opacity-40" />
    </div>
  );
}

const NeuralField3D = dynamic(() => import('./neural-field-3d'), {
  ssr: false,
  loading: () => <StaticBackdrop />,
});

const HeroCanvasFallback = dynamic(() => import('./hero-canvas-fallback'), {
  ssr: false,
  loading: () => <StaticBackdrop />,
});

type Mode = 'static' | 'canvas2d' | 'webgl';

/**
 * Capability-gated hero background. Decides once on mount (all matchMedia
 * reads live in the effect, so server and first client render agree):
 * reduced motion → static gradients; fine pointer + ≥1024px → 3D neural
 * field, mounted after idle so it never competes with first paint;
 * otherwise → cheap Canvas-2D constellation.
 */
export default function HeroVisual() {
  const [mode, setMode] = useState<Mode>('static');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wantsWebgl =
      window.matchMedia('(pointer: fine)').matches && window.matchMedia('(min-width: 1024px)').matches;
    if (!wantsWebgl) {
      setMode('canvas2d');
      return;
    }

    let cancelled = false;
    let idleId = 0;
    let timerId = 0;
    const start = () => {
      if (!cancelled) setMode('webgl');
    };
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(start, { timeout: 1500 });
    } else {
      timerId = window.setTimeout(start, 0);
    }
    return () => {
      cancelled = true;
      if (idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <StaticBackdrop />
      {mode === 'webgl' ? <NeuralField3D /> : mode === 'canvas2d' ? <HeroCanvasFallback /> : null}
      {/* Fade the field into the page background so the section hand-off is seamless */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
