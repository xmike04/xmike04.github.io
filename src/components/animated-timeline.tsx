
"use client";

import { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface TimelineItemProps {
  item: {
    id: string;
    type: 'work' | 'project';
    title: string;
    company: string;
    date: string;
    description: string[];
    detailedContent?: string;
  };
  index: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const Icon = item.type === 'work' ? Briefcase : Rocket;
  const alignment = index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right';
  const cardAlignment = index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto';
  const pointerAlignment = index % 2 === 0 ? 'md:left-0 md:-ml-2' : 'md:right-0 md:-mr-2';

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center transition-all duration-700 ease-out ${alignment} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className={`absolute top-5 ${pointerAlignment} z-10 hidden h-4 w-4 rotate-45 transform bg-card md:block`}></div>
      <div className="absolute top-5 h-full w-0.5 bg-border -translate-x-1/2 left-1/2"></div>
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <Card className={`w-full max-w-md my-8 shadow-lg hover:shadow-xl transition-shadow ${cardAlignment}`}>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
            <Badge variant="secondary">{item.date}</Badge>
          </div>
          <CardDescription>{item.company}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {item.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </CardContent>
        {item.detailedContent && (
          <CardFooter className={index % 2 !== 0 ? 'md:justify-end' : ''}>
            <Button asChild variant="link" className="p-0 h-auto">
              <Link href={`/item/${item.id}`}>
                See More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

interface AnimatedTimelineProps {
  items: any[];
}

export default function AnimatedTimeline({ items }: AnimatedTimelineProps) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}
