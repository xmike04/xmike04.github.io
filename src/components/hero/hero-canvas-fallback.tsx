'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const COUNT = 48;
const LINK_DIST = 120;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  violet: boolean;
}

/**
 * Lightweight Canvas-2D constellation for touch / small-screen devices.
 * Renders a static mesh + grid backdrop under prefers-reduced-motion.
 */
export default function HeroCanvasFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    const nodes: Node[] = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00045,
      violet: Math.random() < 0.3,
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const [cyan, violet] = isDark ? ['34,211,238', '167,139,250'] : ['14,116,144', '109,40,217'];
      const pointAlpha = isDark ? 0.8 : 0.5;
      const lineAlpha = isDark ? 0.16 : 0.12;

      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -0.02) n.x = 1.02;
        if (n.x > 1.02) n.x = -0.02;
        if (n.y < -0.02) n.y = 1.02;
        if (n.y > 1.02) n.y = -0.02;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = (nodes[i].x - nodes[j].x) * w;
          const dy = (nodes[i].y - nodes[j].y) * h;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${cyan},${((1 - d / LINK_DIST) * lineAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.violet ? violet : cyan},${pointAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="mesh-bg absolute inset-0" aria-hidden="true">
        <div className="grid-bg absolute inset-0 opacity-40" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
