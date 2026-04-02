
"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapIcon, Play, RefreshCw, Flag, Rat } from 'lucide-react';
import { cn } from '@/lib/utils';

const GRID_SIZE = 13;
const START = { row: 1, col: 1 };
const FINISH = { row: GRID_SIZE - 2, col: GRID_SIZE - 2 };

interface Cell {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
}

function makeGrid(wallChance = 0.22): Cell[][] {
  return Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => ({
      row, col,
      isStart: row === START.row && col === START.col,
      isFinish: row === FINISH.row && col === FINISH.col,
      isWall:
        row !== START.row || col !== START.col
          ? row !== FINISH.row || col !== FINISH.col
            ? Math.random() < wallChance
            : false
          : false,
      isVisited: false,
      isPath: false,
    }))
  );
}

interface ANode {
  row: number; col: number;
  g: number; h: number; f: number;
  parent: { row: number; col: number } | null;
}

function manhattan(a: { row: number; col: number }, b: { row: number; col: number }) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function astar(grid: Cell[][]): {
  visitedOrder: { row: number; col: number }[];
  path: { row: number; col: number }[];
} {
  const nodes: ANode[][] = grid.map(row =>
    row.map(cell => ({
      row: cell.row, col: cell.col,
      g: Infinity, h: manhattan(cell, FINISH), f: Infinity,
      parent: null,
    }))
  );

  nodes[START.row][START.col].g = 0;
  nodes[START.row][START.col].f = nodes[START.row][START.col].h;

  const open: ANode[] = [nodes[START.row][START.col]];
  const closed = new Set<string>();
  const visitedOrder: { row: number; col: number }[] = [];

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f || a.h - b.h);
    const cur = open.shift()!;
    const key = `${cur.row},${cur.col}`;
    if (closed.has(key)) continue;
    closed.add(key);
    visitedOrder.push({ row: cur.row, col: cur.col });

    if (cur.row === FINISH.row && cur.col === FINISH.col) {
      const path: { row: number; col: number }[] = [];
      let n: ANode | null = cur;
      while (n) {
        path.unshift({ row: n.row, col: n.col });
        n = n.parent ? nodes[n.parent.row][n.parent.col] : null;
      }
      return { visitedOrder, path };
    }

    for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nr = cur.row + dr;
      const nc = cur.col + dc;
      if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) continue;
      if (grid[nr][nc].isWall || closed.has(`${nr},${nc}`)) continue;
      const neighbor = nodes[nr][nc];
      const g = cur.g + 1;
      if (g < neighbor.g) {
        neighbor.g = g;
        neighbor.f = g + neighbor.h;
        neighbor.parent = { row: cur.row, col: cur.col };
        if (!open.some(n => n.row === nr && n.col === nc)) open.push(neighbor);
      }
    }
  }

  return { visitedOrder, path: [] };
}

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState<Cell[][]>(makeGrid);
  const [running, setRunning] = useState(false);
  const [noPath, setNoPath] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const toggleWall = (row: number, col: number) => {
    if (running) return;
    setGrid(prev =>
      prev.map((r, ri) =>
        r.map((cell, ci) =>
          ri === row && ci === col && !cell.isStart && !cell.isFinish
            ? { ...cell, isWall: !cell.isWall, isVisited: false, isPath: false }
            : cell
        )
      )
    );
  };

  const visualize = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setNoPath(false);
    setRunning(true);

    // Clean grid (keep walls, reset visited/path)
    const clean = grid.map(row =>
      row.map(cell => ({ ...cell, isVisited: false, isPath: false }))
    );
    setGrid(clean);

    const { visitedOrder, path } = astar(clean);

    visitedOrder.forEach(({ row, col }, i) => {
      const t = setTimeout(() => {
        setGrid(prev =>
          prev.map((r, ri) =>
            r.map((cell, ci) =>
              ri === row && ci === col && !cell.isStart && !cell.isFinish
                ? { ...cell, isVisited: true }
                : cell
            )
          )
        );
      }, i * 18);
      timers.current.push(t);
    });

    const delay = visitedOrder.length * 18 + 80;

    if (path.length > 0) {
      path.forEach(({ row, col }, i) => {
        const t = setTimeout(() => {
          setGrid(prev =>
            prev.map((r, ri) =>
              r.map((cell, ci) =>
                ri === row && ci === col ? { ...cell, isPath: true } : cell
              )
            )
          );
        }, delay + i * 35);
        timers.current.push(t);
      });
      const done = setTimeout(() => setRunning(false), delay + path.length * 35 + 150);
      timers.current.push(done);
    } else {
      const done = setTimeout(() => {
        setNoPath(true);
        setRunning(false);
      }, delay);
      timers.current.push(done);
    }
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setRunning(false);
    setNoPath(false);
    setGrid(makeGrid());
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <MapIcon className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline">A* Pathfinding Visualizer</CardTitle>
            <CardDescription>Click/drag cells to draw walls · Watch A* explore and find the shortest path</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-4 bg-muted/20">
        {noPath && (
          <p className="text-destructive text-sm mb-2 font-medium">
            No path found — try removing some walls.
          </p>
        )}
        <div
          className="grid gap-0.5 select-none cursor-crosshair"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
          onMouseLeave={() => setDrawing(false)}
        >
          {grid.map(row =>
            row.map(cell => (
              <div
                key={`${cell.row}-${cell.col}`}
                className={cn(
                  'w-[22px] h-[22px] border border-primary/10 transition-colors duration-150 flex items-center justify-center',
                  cell.isWall && 'bg-foreground',
                  cell.isStart && 'bg-green-500',
                  cell.isFinish && 'bg-red-500',
                  cell.isPath && !cell.isStart && !cell.isFinish && 'bg-accent',
                  cell.isVisited && !cell.isPath && !cell.isStart && !cell.isFinish && 'bg-primary/35',
                )}
                onMouseDown={() => { setDrawing(true); toggleWall(cell.row, cell.col); }}
                onMouseEnter={() => { if (drawing) toggleWall(cell.row, cell.col); }}
                onMouseUp={() => setDrawing(false)}
              >
                {cell.isStart && <Rat className="text-white w-3 h-3" />}
                {cell.isFinish && <Flag className="text-white w-3 h-3" />}
              </div>
            ))
          )}
        </div>
        <div className="flex gap-6 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-primary/35 inline-block" /> Explored</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-accent inline-block" /> Shortest path</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-foreground inline-block" /> Wall</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-4">
        <Button onClick={visualize} disabled={running}>
          <Play className="mr-2 w-4 h-4" />
          {running ? 'Searching...' : 'Find Path (A*)'}
        </Button>
        <Button onClick={reset} variant="outline" disabled={running}>
          <RefreshCw className="mr-2 w-4 h-4" />
          New Map
        </Button>
      </CardFooter>
    </Card>
  );
}
