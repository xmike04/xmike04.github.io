
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NeuralNetGame from "./games/neural-net-game";
import PathfindingVisualizer from "./games/pathfinding-visualizer";
import ImageRecognitionGame from "./games/image-recognition-game";
import GanExhibition from "./games/gan-exhibition";

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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
