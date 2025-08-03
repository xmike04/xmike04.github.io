
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NeuralNetGame from "./neural-net-game";
import PathfindingVisualizer from "./pathfinding-visualizer";
import ImageRecognitionGame from "./image-recognition-game";
import GanExhibition from "./gan-exhibition";

export default function AiPlayground() {
  const games = [
    <NeuralNetGame key="neural-net" />,
    <PathfindingVisualizer key="pathfinding" />,
    <ImageRecognitionGame key="image-rec" />,
    <GanExhibition key="gan" />,
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-4xl mx-auto"
    >
      <CarouselContent>
        {games.map((game, index) => (
          <CarouselItem key={index}>{game}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
