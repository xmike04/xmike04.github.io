
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapIcon, Play, RefreshCw, Flag, Rat } from 'lucide-react';
import { cn } from '@/lib/utils';

const GRID_SIZE = 12;

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      currentRow.push({
        row,
        col,
        isStart: false,
        isFinish: false,
        isWall: false,
        isPath: false,
        isVisited: false,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

const createRandomGrid = () => {
    const grid = createInitialGrid();
    grid[1][1].isStart = true;
    grid[GRID_SIZE - 2][GRID_SIZE - 2].isFinish = true;

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if(grid[row][col].isStart || grid[row][col].isFinish) continue;
            if (Math.random() < 0.2) {
                grid[row][col].isWall = true;
            }
        }
    }
    return grid;
}

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState(createRandomGrid());
  const [isVisualizing, setIsVisualizing] = useState(false);

  const resetGrid = () => {
    setIsVisualizing(false);
    setGrid(createRandomGrid());
  }

  const visualizePath = () => {
    setIsVisualizing(true);
    // This is a simplified mock visualization. A real implementation would use an algorithm like A*.
    const newGrid = grid.map(row => row.map(node => ({...node, isPath: false, isVisited: false})));
    setGrid(newGrid);

    const path = [
        [1,1],[1,2],[1,3],[2,3],[3,3],[3,4],[3,5],[4,5],[5,5],[6,5],[6,6],[6,7],[7,7],[8,7],[8,8],[8,9],[9,9],[10,9],[10,10]
    ];
    
    path.forEach(([row, col], index) => {
        setTimeout(() => {
            const newGridWithVisited = grid.map((r, rIdx) => r.map((n, cIdx) => {
                if(rIdx === row && cIdx === col) return {...n, isVisited: true};
                return n;
            }));
            setGrid(newGridWithVisited);
        }, index * 50);
    });

    setTimeout(() => {
        path.forEach(([row, col], index) => {
            setTimeout(() => {
                const newGridWithPath = grid.map((r, rIdx) => r.map((n, cIdx) => {
                    if(rIdx === row && cIdx === col) return {...n, isPath: true};
                    return n;
                }));
                setGrid(newGridWithPath);
            }, index * 30);
        });
        setIsVisualizing(false);
    }, path.length * 50 + 500);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <MapIcon className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline">A* Pathfinding Visualizer</CardTitle>
            <CardDescription>Watch the algorithm find the shortest path from start to finish.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center p-4 bg-muted/20">
        <div className="grid gap-1" style={{gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}>
            {grid.map((row, rowIdx) =>
                row.map((node, nodeIdx) => (
                    <div
                        key={`${rowIdx}-${nodeIdx}`}
                        className={cn("w-6 h-6 border border-primary/10 transition-colors duration-300", {
                            'bg-green-500': node.isStart,
                            'bg-red-500': node.isFinish,
                            'bg-foreground': node.isWall,
                            'bg-accent animate-pulse': node.isPath,
                            'bg-primary/50': node.isVisited && !node.isPath && !node.isStart && !node.isFinish,
                        })}
                    >
                     {node.isStart && <Rat className="text-white w-4 h-4 m-auto"/>}
                     {node.isFinish && <Flag className="text-white w-4 h-4 m-auto"/>}
                    </div>
                ))
            )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-4">
        <Button onClick={visualizePath} disabled={isVisualizing}>
            <Play className="mr-2"/>
            {isVisualizing ? 'Visualizing...' : 'Visualize Path'}
        </Button>
        <Button onClick={resetGrid} variant="outline" disabled={isVisualizing}>
            <RefreshCw className="mr-2"/>
            New Map
        </Button>
      </CardFooter>
    </Card>
  );
}
