
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, RefreshCw } from 'lucide-react';

const realImages = [
  { src: 'https://placehold.co/400x400.png', dataAiHint: 'dog', isReal: true },
  { src: 'https://placehold.co/400x400.png', dataAiHint: 'cat', isReal: true },
  { src: 'https://placehold.co/400x400.png', dataAiHint: 'landscape', isReal: true },
];

const generatedImages = [
  { src: 'https://placehold.co/400x400.png', dataAiHint: 'abstract art', isReal: false },
  { src: 'https://placehold.co/400x400.png', dataAiHint: 'surrealism', isReal: false },
  { src: 'https://placehold.co/400x400.png', dataAiHint: 'fantasy creature', isReal: false },
];

export default function GanExhibition() {
  const [images, setImages] = useState(getNewPair);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');

  function getNewPair() {
    const realImg = realImages[Math.floor(Math.random() * realImages.length)];
    const genImg = generatedImages[Math.floor(Math.random() * generatedImages.length)];
    return Math.random() > 0.5 ? [realImg, genImg] : [genImg, realImg];
  }

  function handleSelect(selectedIndex) {
    setSelected(selectedIndex);
    const correct = images[selectedIndex].isReal;
    setMessage(correct ? 'Correct! You spotted the real image.' : 'Nice try! That one was AI-generated.');
  }

  function handleNext() {
    setSelected(null);
    setMessage('');
    setImages(getNewPair());
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Bot className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline">GAN Exhibition: Real or Fake?</CardTitle>
            <CardDescription>Can you tell which image is real and which is AI-generated?</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <Image
              src={img.src}
              alt={img.isReal ? "Real" : "Generated"}
              data-ai-hint={img.dataAiHint}
              width={400}
              height={400}
              className="rounded-lg w-full h-auto cursor-pointer border-4 border-transparent hover:border-primary transition-all"
              onClick={() => !selected && handleSelect(index)}
            />
            {selected !== null && (
              <div className={`absolute inset-0 flex items-center justify-center font-bold text-2xl text-white bg-black/50 ${images[index].isReal ? 'bg-green-500/70' : 'bg-red-500/70'}`}>
                {images[index].isReal ? 'REAL' : 'AI-GENERATED'}
              </div>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center p-4">
        {message && <p className="mb-4 text-lg">{message}</p>}
        <Button onClick={handleNext}>
          <RefreshCw className="mr-2"/>
          Next Pair
        </Button>
      </CardFooter>
    </Card>
  );
}
