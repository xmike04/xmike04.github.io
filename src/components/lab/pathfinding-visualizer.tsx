'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Flag, Play, RefreshCw, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const GRID_SIZE = 13;
const START = { row: 1, col: 1 };
const FINISH = { row: GRID_SIZE - 2, col: GRID_SIZE - 2 };

type Point = { row: number; col: number };
type Algo = 'astar' | 'dijkstra' | 'bfs';

const ALGOS: { id: Algo; label: string; blurb: string }[] = [
  {
    id: 'astar',
    label: 'A*',
    blurb: 'g(n) + Manhattan heuristic — expands toward the goal.',
  },
  {
    id: 'dijkstra',
    label: 'Dijkstra',
    blurb: 'Uniform cost (A* with h = 0) — expands evenly in every direction.',
  },
  {
    id: 'bfs',
    label: 'BFS',
    blurb: 'Level-by-level frontier — optimal on unweighted grids.',
  },
];

const cellKey = (p: Point) => `${p.row},${p.col}`;
const START_KEY = cellKey(START);
const FINISH_KEY = cellKey(FINISH);

function manhattan(a: Point, b: Point) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function makeWalls(wallChance = 0.22): Set<string> {
  const walls = new Set<string>();
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const key = `${row},${col}`;
      if (key === START_KEY || key === FINISH_KEY) continue;
      if (Math.random() < wallChance) walls.add(key);
    }
  }
  return walls;
}

/**
 * Grid search returning cells in visit order plus the reconstructed path.
 * A* sorts the frontier by g + Manhattan h, Dijkstra by g alone (h = 0),
 * BFS uses a plain FIFO queue — all three are the real algorithms.
 */
function search(
  walls: Set<string>,
  algo: Algo
): { visitedOrder: Point[]; path: Point[] } {
  const h = (p: Point) => (algo === 'astar' ? manhattan(p, FINISH) : 0);
  const g = new Map<string, number>([[START_KEY, 0]]);
  const parent = new Map<string, string | null>([[START_KEY, null]]);
  const closed = new Set<string>();
  const visitedOrder: Point[] = [];
  const open: Point[] = [{ ...START }];

  while (open.length > 0) {
    if (algo !== 'bfs') {
      open.sort(
        (a, b) =>
          g.get(cellKey(a))! + h(a) - (g.get(cellKey(b))! + h(b)) || h(a) - h(b)
      );
    }
    const cur = open.shift()!;
    const curKey = cellKey(cur);
    if (closed.has(curKey)) continue;
    closed.add(curKey);
    visitedOrder.push(cur);

    if (curKey === FINISH_KEY) {
      const path: Point[] = [];
      let k: string | null = curKey;
      while (k) {
        const [row, col] = k.split(',').map(Number);
        path.unshift({ row, col });
        k = parent.get(k) ?? null;
      }
      return { visitedOrder, path };
    }

    for (const [dr, dc] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const next = { row: cur.row + dr, col: cur.col + dc };
      if (
        next.row < 0 ||
        next.row >= GRID_SIZE ||
        next.col < 0 ||
        next.col >= GRID_SIZE
      )
        continue;
      const nextKey = cellKey(next);
      if (walls.has(nextKey) || closed.has(nextKey)) continue;

      const tentative = g.get(curKey)! + 1;
      if (algo === 'bfs') {
        // Mark on enqueue so each cell enters the queue once.
        if (!g.has(nextKey)) {
          g.set(nextKey, tentative);
          parent.set(nextKey, curKey);
          open.push(next);
        }
      } else if (tentative < (g.get(nextKey) ?? Infinity)) {
        g.set(nextKey, tentative);
        parent.set(nextKey, curKey);
        open.push(next);
      }
    }
  }

  return { visitedOrder, path: [] };
}

interface RunStats {
  visited: number;
  pathLength: number | null; // null = no path found
}

export default function LabPathfindingVisualizer() {
  const reducedMotion = useReducedMotion();
  const [walls, setWalls] = useState<Set<string>>(makeWalls);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [path, setPath] = useState<Set<string>>(new Set());
  const [algo, setAlgo] = useState<Algo>('astar');
  const [speed, setSpeed] = useState(6); // 1 (slow) … 10 (fast)
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState<RunStats | null>(null);
  const [drawing, setDrawing] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const toggleWall = (key: string) => {
    if (running || key === START_KEY || key === FINISH_KEY) return;
    setWalls((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setVisited(new Set());
    setPath(new Set());
    setStats(null);
  };

  const visualize = () => {
    clearTimers();
    setVisited(new Set());
    setPath(new Set());
    setStats(null);

    const { visitedOrder, path: foundPath } = search(walls, algo);
    const result: RunStats = {
      visited: visitedOrder.length,
      pathLength: foundPath.length > 0 ? foundPath.length - 1 : null,
    };

    if (reducedMotion) {
      // Instant render — no step animation for reduced-motion users.
      setVisited(new Set(visitedOrder.map(cellKey)));
      setPath(new Set(foundPath.map(cellKey)));
      setStats(result);
      return;
    }

    setRunning(true);
    const cellDelay = (11 - speed) * 4; // 4–40 ms per explored cell

    visitedOrder.forEach((p, i) => {
      timers.current.push(
        setTimeout(() => {
          setVisited((prev) => new Set(prev).add(cellKey(p)));
        }, i * cellDelay)
      );
    });

    const pathStart = visitedOrder.length * cellDelay + 80;
    foundPath.forEach((p, i) => {
      timers.current.push(
        setTimeout(() => {
          setPath((prev) => new Set(prev).add(cellKey(p)));
        }, pathStart + i * 30)
      );
    });

    timers.current.push(
      setTimeout(() => {
        setStats(result);
        setRunning(false);
      }, pathStart + foundPath.length * 30 + 100)
    );
  };

  const reset = () => {
    clearTimers();
    setRunning(false);
    setStats(null);
    setVisited(new Set());
    setPath(new Set());
    setWalls(makeWalls());
  };

  const activeAlgo = ALGOS.find((a) => a.id === algo)!;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="inline-flex rounded-md border border-border/70 p-0.5"
          role="group"
          aria-label="Search algorithm"
        >
          {ALGOS.map((a) => (
            <Button
              key={a.id}
              variant={algo === a.id ? 'default' : 'ghost'}
              size="sm"
              className="h-8 px-3 font-mono text-xs"
              onClick={() => setAlgo(a.id)}
              disabled={running}
              aria-pressed={algo === a.id}
            >
              {a.label}
            </Button>
          ))}
        </div>
        <div className="flex w-40 items-center gap-2">
          <span className="text-xs text-muted-foreground">Speed</span>
          <Slider
            value={[speed]}
            min={1}
            max={10}
            step={1}
            onValueChange={([v]) => setSpeed(v)}
            disabled={running}
            aria-label="Animation speed"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{activeAlgo.blurb}</p>

      {/* Grid */}
      <div className="flex justify-center">
        <div
          className="grid w-full max-w-[420px] select-none gap-0.5"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          onPointerLeave={() => setDrawing(false)}
          onPointerUp={() => setDrawing(false)}
        >
          {Array.from({ length: GRID_SIZE }, (_, row) =>
            Array.from({ length: GRID_SIZE }, (_, col) => {
              const key = `${row},${col}`;
              const isStart = key === START_KEY;
              const isFinish = key === FINISH_KEY;
              const isWall = walls.has(key);
              const isPath = path.has(key);
              const isVisited = visited.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  tabIndex={-1}
                  aria-label={`Toggle wall at row ${row + 1}, column ${col + 1}`}
                  disabled={running}
                  className={cn(
                    'flex aspect-square cursor-crosshair items-center justify-center rounded-[3px] border border-border/40 bg-muted/30 motion-safe:transition-colors motion-safe:duration-150',
                    isWall && 'border-transparent bg-foreground/75',
                    isVisited &&
                      !isPath &&
                      !isStart &&
                      !isFinish &&
                      'border-transparent bg-primary/30',
                    isPath &&
                      !isStart &&
                      !isFinish &&
                      'border-transparent bg-accent',
                    isStart && 'border-transparent bg-emerald-500',
                    isFinish && 'border-transparent bg-rose-500'
                  )}
                  onPointerDown={() => {
                    setDrawing(true);
                    toggleWall(key);
                  }}
                  onPointerEnter={() => {
                    if (drawing) toggleWall(key);
                  }}
                >
                  {isStart ? (
                    <Rocket className="h-3 w-3 text-white" aria-hidden />
                  ) : isFinish ? (
                    <Flag className="h-3 w-3 text-white" aria-hidden />
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Legend + stats */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-primary/30" />
          Explored
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-accent" />
          Shortest path
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-foreground/75" />
          Wall (click/drag to edit)
        </span>
      </div>
      <p
        className="min-h-5 text-center font-mono text-xs text-muted-foreground"
        aria-live="polite"
      >
        {running
          ? 'Searching…'
          : stats
            ? stats.pathLength !== null
              ? `Visited ${stats.visited} cells · path length ${stats.pathLength} steps`
              : `Visited ${stats.visited} cells · no path found — remove some walls`
            : ' '}
      </p>

      <div className="flex justify-center gap-3">
        <Button onClick={visualize} disabled={running}>
          <Play className="mr-1.5" />
          {running ? 'Searching…' : `Run ${activeAlgo.label}`}
        </Button>
        <Button variant="outline" onClick={reset} disabled={running}>
          <RefreshCw className="mr-1.5" />
          New map
        </Button>
      </div>
    </div>
  );
}
