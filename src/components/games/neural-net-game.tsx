
"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Play } from 'lucide-react';

const SVG_W = 540;
const SVG_H = 240;
const R = 13;

const LAYERS = [
  { id: 'input', label: 'Input', count: 3 },
  { id: 'h1', label: 'Hidden', count: 5 },
  { id: 'h2', label: 'Hidden', count: 4 },
  { id: 'output', label: 'Output', count: 2 },
];

function nodeId(layerIdx: number, nodeIdx: number) {
  return `${layerIdx}-${nodeIdx}`;
}

function getPositions() {
  const pos: Record<string, { x: number; y: number }> = {};
  LAYERS.forEach((layer, li) => {
    const x = (SVG_W / (LAYERS.length + 1)) * (li + 1);
    for (let ni = 0; ni < layer.count; ni++) {
      const y = (SVG_H / (layer.count + 1)) * (ni + 1);
      pos[nodeId(li, ni)] = { x, y };
    }
  });
  return pos;
}

const POS = getPositions();

type Edge = { from: string; to: string };

function buildEdges(): Edge[] {
  const edges: Edge[] = [];
  for (let li = 0; li < LAYERS.length - 1; li++) {
    for (let ni = 0; ni < LAYERS[li].count; ni++) {
      for (let nj = 0; nj < LAYERS[li + 1].count; nj++) {
        edges.push({ from: nodeId(li, ni), to: nodeId(li + 1, nj) });
      }
    }
  }
  return edges;
}

const EDGES = buildEdges();

export default function NeuralNetGame() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set());
  const [animating, setAnimating] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runForwardPass = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActiveNodes(new Set());
    setActiveEdges(new Set());
    setAnimating(true);

    LAYERS.forEach((layer, li) => {
      const t = setTimeout(() => {
        setActiveNodes(prev => {
          const next = new Set(prev);
          for (let ni = 0; ni < layer.count; ni++) next.add(nodeId(li, ni));
          return next;
        });
        setActiveEdges(prev => {
          const next = new Set(prev);
          EDGES.filter(e => e.from.startsWith(`${li}-`)).forEach(e =>
            next.add(`${e.from}>${e.to}`)
          );
          return next;
        });
        if (li === LAYERS.length - 1) {
          const done = setTimeout(() => setAnimating(false), 400);
          timers.current.push(done);
        }
      }, li * 480);
      timers.current.push(t);
    });
  };

  const edgeKey = (e: Edge) => `${e.from}>${e.to}`;

  const nodeConnected = (id: string) => {
    if (!hovered) return false;
    return EDGES.some(e => (e.from === hovered && e.to === id) || (e.to === hovered && e.from === id));
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <BrainCircuit className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline">Neural Network Visualizer</CardTitle>
            <CardDescription>Hover nodes to trace connections · Run a forward pass animation</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-muted/20 flex justify-center overflow-x-auto">
        <svg width={SVG_W} height={SVG_H + 20} className="overflow-visible">
          {/* Edges */}
          {EDGES.map(e => {
            const { x: x1, y: y1 } = POS[e.from];
            const { x: x2, y: y2 } = POS[e.to];
            const isActive = activeEdges.has(edgeKey(e));
            const isHovered = hovered === e.from || hovered === e.to;
            return (
              <line
                key={edgeKey(e)}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={
                  isActive
                    ? 'hsl(var(--accent))'
                    : isHovered
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--border))'
                }
                strokeWidth={isActive ? 2 : isHovered ? 1.5 : 0.8}
                opacity={isActive ? 0.9 : isHovered ? 0.85 : 0.35}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Layer labels */}
          {LAYERS.map((layer, li) => {
            const x = (SVG_W / (LAYERS.length + 1)) * (li + 1);
            return (
              <text
                key={layer.id}
                x={x}
                y={SVG_H + 18}
                textAnchor="middle"
                fontSize={10}
                fill="hsl(var(--muted-foreground))"
              >
                {layer.label}
              </text>
            );
          })}

          {/* Nodes */}
          {LAYERS.map((layer, li) =>
            Array.from({ length: layer.count }, (_, ni) => {
              const id = nodeId(li, ni);
              const { x, y } = POS[id];
              const isActive = activeNodes.has(id);
              const isHovered = hovered === id;
              const connected = nodeConnected(id);
              return (
                <circle
                  key={id}
                  cx={x}
                  cy={y}
                  r={isHovered ? R + 2 : R}
                  fill={
                    isActive
                      ? 'hsl(var(--accent))'
                      : isHovered
                      ? 'hsl(var(--primary))'
                      : connected
                      ? 'hsl(var(--primary) / 0.25)'
                      : 'hsl(var(--card))'
                  }
                  stroke={
                    isHovered
                      ? 'hsl(var(--primary))'
                      : connected
                      ? 'hsl(var(--primary) / 0.6)'
                      : 'hsl(var(--border))'
                  }
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })
          )}
        </svg>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        <Button onClick={runForwardPass} disabled={animating}>
          <Play className="mr-2 w-4 h-4" />
          {animating ? 'Propagating...' : 'Run Forward Pass'}
        </Button>
      </CardFooter>
    </Card>
  );
}
