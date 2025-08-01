"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BrainCircuit } from 'lucide-react';

const Node = ({ id, onMouseEnter, onMouseLeave, isHighlighted, isPathHighlighted }) => (
  <div
    onMouseEnter={() => onMouseEnter(id)}
    onMouseLeave={onMouseLeave}
    className={cn(
      "w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200",
      isPathHighlighted ? "bg-accent/80 border-accent" : "bg-card border-primary/20",
      isHighlighted ? "bg-primary border-primary shadow-lg scale-110" : ""
    )}
  />
);

const Line = ({ isHighlighted }) => (
  <div className={cn("h-0.5 w-full transition-colors duration-200", isHighlighted ? 'bg-primary' : 'bg-border')} />
);

export default function NeuralNetGame() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const layers = [
    { id: 'input', count: 3 },
    { id: 'hidden1', count: 4 },
    { id: 'hidden2', count: 4 },
    { id: 'output', count: 2 },
  ];

  const connections = {
    'input-0': ['hidden1-0', 'hidden1-1', 'hidden1-2', 'hidden1-3'],
    'input-1': ['hidden1-0', 'hidden1-1', 'hidden1-2', 'hidden1-3'],
    'input-2': ['hidden1-0', 'hidden1-1', 'hidden1-2', 'hidden1-3'],
    'hidden1-0': ['hidden2-0', 'hidden2-1'],
    'hidden1-1': ['hidden2-0', 'hidden2-1', 'hidden2-2'],
    'hidden1-2': ['hidden2-1', 'hidden2-2', 'hidden2-3'],
    'hidden1-3': ['hidden2-2', 'hidden2-3'],
    'hidden2-0': ['output-0'],
    'hidden2-1': ['output-0', 'output-1'],
    'hidden2-2': ['output-0', 'output-1'],
    'hidden2-3': ['output-1'],
  };

  const isPathHighlighted = (nodeId) => {
    if (!hoveredNode) return false;
    if (hoveredNode === nodeId) return true;
    const [layer, index] = hoveredNode.split('-');
    const [nodeLayer, nodeIndex] = nodeId.split('-');
    
    if (connections[hoveredNode] && connections[hoveredNode].includes(nodeId)) {
      return true;
    }
    
    for (const [key, value] of Object.entries(connections)) {
      if (value.includes(hoveredNode) && key === nodeId) {
        return true;
      }
    }
    return false;
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <BrainCircuit className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline">Neural Network Visualizer</CardTitle>
            <CardDescription>Hover over the nodes to see the connections.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 bg-muted/20">
        <div className="flex justify-between items-center min-h-[250px]">
          {layers.map((layer, layerIndex) => (
            <>
              <div key={layer.id} className="flex flex-col justify-around h-full gap-6">
                {Array.from({ length: layer.count }).map((_, nodeIndex) => {
                  const nodeId = `${layer.id}-${nodeIndex}`;
                  return (
                    <Node
                      key={nodeId}
                      id={nodeId}
                      onMouseEnter={setHoveredNode}
                      onMouseLeave={() => setHoveredNode(null)}
                      isHighlighted={hoveredNode === nodeId}
                      isPathHighlighted={isPathHighlighted(nodeId)}
                    />
                  );
                })}
              </div>
              {layerIndex < layers.length - 1 && (
                <div className="flex-1 flex flex-col justify-center gap-1 mx-4">
                   {/* This is a decorative representation of connections */}
                   <Line isHighlighted={!!hoveredNode} />
                   <Line isHighlighted={!!hoveredNode} />
                   <Line isHighlighted={!!hoveredNode} />
                   <Line isHighlighted={!!hoveredNode} />
                   <Line isHighlighted={!!hoveredNode} />
                </div>
              )}
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
