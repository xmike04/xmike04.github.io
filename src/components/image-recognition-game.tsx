
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Search, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

const itemsToGuess = [
  { src: 'https://placehold.co/400x300.png', dataAiHint: 'cat', answer: 'Cat' },
  { src: 'https://placehold.co/400x300.png', dataAiHint: 'dog', answer: 'Dog' },
  { src: 'https://placehold.co/400x300.png', dataAiHint: 'tree', answer: 'Tree' },
  { src: 'https://placehold.co/400x300.png', dataAiHint: 'car', answer: 'Car' },
  { src: 'https://placehold.co/400x300.png', dataAiHint: 'house', answer: 'House' },
];

const options = ['Cat', 'Dog', 'Tree', 'Car', 'House', 'Boat', 'Person', 'Flower'];

function shuffleArray(array) {
  const newArr = array.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}


export default function ImageRecognitionGame() {
  const [currentItem, setCurrentItem] = useState(null);
  const [choices, setChoices] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);

  const getNewProblem = () => {
    setLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    const problem = itemsToGuess[Math.floor(Math.random() * itemsToGuess.length)];
    const otherOptions = options.filter(o => o !== problem.answer);
    const shuffledOptions = shuffleArray(otherOptions).slice(0, 3);
    const finalChoices = shuffleArray([problem.answer, ...shuffledOptions]);
    
    setTimeout(() => {
        setCurrentItem(problem);
        setChoices(finalChoices);
        setLoading(false);
    }, 500);
  };
  
  useEffect(() => {
    getNewProblem();
  }, []);

  const handleSelect = (choice) => {
    if (selectedAnswer) return;
    setSelectedAnswer(choice);
    setIsCorrect(choice === currentItem.answer);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Eye className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline">Image Recognition Challenge</CardTitle>
            <CardDescription>Can the AI guess the image? Help it by choosing the correct label.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {loading || !currentItem ? (
          <Skeleton className="w-full h-[300px] rounded-lg" />
        ) : (
          <Image
            src={currentItem.src}
            alt="Item to be recognized"
            data-ai-hint={currentItem.dataAiHint}
            width={400}
            height={300}
            className="rounded-lg border-4 border-muted"
          />
        )}
        
        {selectedAnswer && (
          <div className="mt-4 text-lg font-bold flex items-center gap-2">
            {isCorrect ? <CheckCircle className="text-green-500"/> : <XCircle className="text-red-500" />}
            {isCorrect ? `Correct! It's a ${currentItem.answer}.` : `Not quite! The correct answer was ${currentItem.answer}.`}
          </div>
        )}

      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center p-4 gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {choices.map(choice => (
                <Button 
                    key={choice} 
                    variant="outline"
                    onClick={() => handleSelect(choice)}
                    disabled={!!selectedAnswer}
                    className={cn(
                        selectedAnswer === choice && (isCorrect ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'),
                        selectedAnswer && selectedAnswer !== choice && choice === currentItem.answer && 'bg-green-500/20 border-green-500'
                    )}
                >
                    {choice}
                </Button>
            ))}
        </div>
        <Button onClick={getNewProblem}>
            <RefreshCw className="mr-2" />
            New Image
        </Button>
      </CardFooter>
    </Card>
  );
}
