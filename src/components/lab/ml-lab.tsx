'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import {
  Brain,
  FlaskConical,
  Map,
  Network,
  PenTool,
  ScanEye,
  WholeWord,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Reveal } from '@/components/motion/reveal';

function PanelSkeleton() {
  return (
    <div className="space-y-4 py-4" aria-hidden>
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-8 w-2/3" />
    </div>
  );
}

const loading = () => <PanelSkeleton />;

// Each experiment is code-split and only fetched when its tab is first opened.
const MnistRecognizer = dynamic(() => import('./mnist-recognizer'), {
  ssr: false,
  loading,
});
const NeuralNetPlayground = dynamic(() => import('./neural-net-playground'), {
  ssr: false,
  loading,
});
const PathfindingVisualizer = dynamic(() => import('./pathfinding-visualizer'), {
  ssr: false,
  loading,
});
const AttentionVisualizer = dynamic(() => import('./attention-visualizer'), {
  ssr: false,
  loading,
});
const TokenizerPlayground = dynamic(() => import('./tokenizer-playground'), {
  ssr: false,
  loading,
});
const MlQuiz = dynamic(() => import('./ml-quiz'), { ssr: false, loading });

interface LabTab {
  value: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  caption: string;
  Component: ComponentType;
}

const TABS: LabTab[] = [
  {
    value: 'digits',
    label: 'Digit Recognizer',
    icon: PenTool,
    caption:
      'Real in-browser inference — a convolutional net served with onnxruntime-web, the same pattern used to ship ML to the edge.',
    Component: MnistRecognizer,
  },
  {
    value: 'neural-net',
    label: 'Neural Net',
    icon: Network,
    caption:
      'Every number here is computed live — matrix multiply, ReLU, softmax — the core math inside every deep model.',
    Component: NeuralNetPlayground,
  },
  {
    value: 'pathfinding',
    label: 'Pathfinding',
    icon: Map,
    caption:
      'A*, Dijkstra, and BFS side by side — the cost-vs-heuristic tradeoffs that show up in planning and optimization work.',
    Component: PathfindingVisualizer,
  },
  {
    value: 'attention',
    label: 'Attention',
    icon: ScanEye,
    caption:
      'Scaled dot-product attention computed for real — the mechanism that makes transformers (and every modern LLM) work.',
    Component: AttentionVisualizer,
  },
  {
    value: 'tokenizer',
    label: 'Tokenizer',
    icon: WholeWord,
    caption:
      'The exact BPE vocabulary the GPT-4o family reads with — token counts drive the cost and latency of every LLM system.',
    Component: TokenizerPlayground,
  },
  {
    value: 'quiz',
    label: 'Quiz',
    icon: Brain,
    caption:
      'Twelve scenario questions drawn from day-to-day ML practice — the judgment calls behind model and data decisions.',
    Component: MlQuiz,
  },
];

export default function MlLab() {
  const [active, setActive] = useState(TABS[0].value);
  // Panels lazy-mount on first activation, then stay mounted to preserve state.
  const [activated, setActivated] = useState<Set<string>>(
    () => new Set([TABS[0].value])
  );

  const handleTabChange = (value: string) => {
    setActive(value);
    setActivated((prev) =>
      prev.has(value) ? prev : new Set(prev).add(value)
    );
  };

  return (
    <section id="lab" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <h2 className="mb-4 flex items-center justify-center gap-3 font-headline text-3xl font-bold md:text-5xl">
              <FlaskConical
                className="h-8 w-8 text-primary md:h-10 md:w-10"
                aria-hidden
              />
              Interactive <span className="gradient-text">ML Lab</span>
            </h2>
            <p className="text-balance text-muted-foreground">
              Real algorithms running in your browser — not videos.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Tabs
            value={active}
            onValueChange={handleTabChange}
            className="mx-auto max-w-4xl"
          >
            <div className="overflow-x-auto pb-1">
              <TabsList className="h-auto w-max min-w-full justify-start gap-1 bg-muted/50 p-1">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="gap-1.5 px-3 py-2 data-[state=active]:text-primary"
                  >
                    <tab.icon className="h-4 w-4" aria-hidden />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {TABS.map((tab) => (
              // forceMount keeps opened panels alive (preserving their state),
              // but Radix skips its own hiding when forced — so hide manually.
              <TabsContent
                key={tab.value}
                value={tab.value}
                forceMount
                hidden={active !== tab.value}
              >
                <div className="glass relative overflow-hidden rounded-2xl p-4 md:p-6">
                  <p className="mb-5 border-b border-border/60 pb-4 text-sm text-muted-foreground">
                    {tab.caption}
                  </p>
                  {activated.has(tab.value) ? <tab.Component /> : null}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
