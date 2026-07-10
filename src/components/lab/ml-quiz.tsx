'use client';

import { useState } from 'react';
import { CheckCircle, RefreshCw, RotateCcw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Question {
  scenario: string;
  correct: string;
  options: string[];
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    scenario: "You have 1M labeled images and want to train a model to classify new photos into 1,000 categories.",
    correct: "Supervised Learning",
    options: ["Supervised Learning", "Reinforcement Learning", "Unsupervised Learning", "Few-Shot Learning"],
    explanation: "Labeled data + explicit targets = supervised learning. Classic image classification with CNNs like ResNet or ViT.",
  },
  {
    scenario: "You want to group customer purchase histories into segments with no predefined categories.",
    correct: "Clustering",
    options: ["Clustering", "Classification", "Regression", "Fine-tuning"],
    explanation: "No labels, find structure = clustering. K-Means, DBSCAN, and hierarchical clustering are common approaches.",
  },
  {
    scenario: "A robot learns to navigate a maze by receiving +1 when it reaches the exit and −1 when it hits a wall.",
    correct: "Reinforcement Learning",
    options: ["Supervised Learning", "Reinforcement Learning", "Transfer Learning", "Self-Supervised Learning"],
    explanation: "Agent + environment + reward signal = reinforcement learning (e.g., PPO, DQN, SAC).",
  },
  {
    scenario: "You take a GPT model trained on internet text and continue training it on 50K medical Q&A pairs.",
    correct: "Fine-tuning",
    options: ["Pre-training", "Fine-tuning", "Prompt Engineering", "Knowledge Distillation"],
    explanation: "Adapting a pretrained model to a specific domain with additional training data is fine-tuning.",
  },
  {
    scenario: "Your model scores 98% on training data but only 61% on the test set.",
    correct: "Overfitting",
    options: ["Underfitting", "Overfitting", "Data Leakage", "Distribution Shift"],
    explanation: "High train accuracy, low test accuracy = the model memorized training data instead of generalizing (overfitting).",
  },
  {
    scenario: "You hold out 15% of training data to tune hyperparameters without touching the test set.",
    correct: "Validation Set",
    options: ["Test Set", "Validation Set", "Holdout Set", "Cross-validation"],
    explanation: "The validation set is used to tune hyperparameters during training. Test set is only touched once at the end.",
  },
  {
    scenario: "You compress a 768-dim sentence embedding to 2D so you can plot it and see topic clusters.",
    correct: "Dimensionality Reduction",
    options: ["Feature Engineering", "Dimensionality Reduction", "Normalization", "Quantization"],
    explanation: "PCA, t-SNE, and UMAP are common dimensionality reduction techniques for visualizing high-dimensional data.",
  },
  {
    scenario: "A language model fetches relevant documents from a vector database before generating its answer.",
    correct: "RAG",
    options: ["Fine-tuning", "Prompt Engineering", "RAG", "Chain-of-Thought"],
    explanation: "Retrieval-Augmented Generation (RAG) grounds LLM responses in retrieved context to reduce hallucination.",
  },
  {
    scenario: "You train two networks simultaneously: one generates synthetic data, the other tries to detect it.",
    correct: "GAN",
    options: ["VAE", "GAN", "Diffusion Model", "Autoencoder"],
    explanation: "Generative Adversarial Networks (GANs) pit a generator against a discriminator in a minimax game.",
  },
  {
    scenario: "You want to predict next month's energy consumption from historical usage and weather data.",
    correct: "Regression",
    options: ["Classification", "Regression", "Clustering", "Ranking"],
    explanation: "Predicting a continuous numerical output (energy kWh) is a regression problem.",
  },
  {
    scenario: "You scale each input feature to have zero mean and unit variance before training.",
    correct: "Normalization",
    options: ["Regularization", "Normalization", "Augmentation", "Dropout"],
    explanation: "Zero mean + unit variance = standardization (z-score normalization). Helps gradient descent converge faster.",
  },
  {
    scenario: "During training you randomly zero out 20% of neuron activations to prevent co-adaptation.",
    correct: "Dropout",
    options: ["Batch Norm", "Weight Decay", "Dropout", "Early Stopping"],
    explanation: "Dropout randomly disables neurons during training, acting as an ensemble of many smaller networks.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MlQuiz() {
  const [questions, setQuestions] = useState(() => shuffle(QUESTIONS));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];
  const isCorrect = selected === q.correct;

  const handleSelect = (choice: string) => {
    if (selected) return;
    setSelected(choice);
    if (choice === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffle(QUESTIONS));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const pct = Math.round((score / questions.length) * 100);
  const answered = done ? questions.length : index + (selected ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>
            {done
              ? `Complete — ${score}/${questions.length} correct`
              : `Question ${index + 1} of ${questions.length}`}
          </span>
          <span>Score: {score}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted/60">
          <div
            className="h-full rounded-full bg-primary motion-safe:transition-[width] motion-safe:duration-300"
            style={{ width: `${(answered / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[280px] space-y-4">
        {done ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-10">
            <p className="font-headline text-5xl font-bold tabular-nums">
              <span className="text-primary">{score}</span>/{questions.length}
            </p>
            <p className="text-lg text-muted-foreground">
              {pct === 100
                ? 'Perfect. You know your ML.'
                : pct >= 75
                  ? 'Solid fundamentals.'
                  : pct >= 50
                    ? 'Getting there — review the misses.'
                    : 'Time to hit the textbooks.'}
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                Scenario
              </p>
              <p className="text-sm leading-relaxed">{q.scenario}</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {q.options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  onClick={() => handleSelect(option)}
                  disabled={!!selected}
                  className={cn(
                    'h-auto justify-start whitespace-normal px-4 py-3 text-left font-mono text-sm',
                    selected &&
                      option === q.correct &&
                      'border-emerald-500 bg-emerald-500/15 text-emerald-700 disabled:opacity-100 dark:text-emerald-400',
                    selected &&
                      option === selected &&
                      !isCorrect &&
                      'border-rose-500 bg-rose-500/15 text-rose-700 disabled:opacity-100 dark:text-rose-400'
                  )}
                >
                  {option}
                </Button>
              ))}
            </div>

            {selected ? (
              <div
                className={cn(
                  'flex items-start gap-2 rounded-lg border p-3 text-sm',
                  isCorrect
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : 'border-rose-500/30 bg-rose-500/10'
                )}
                role="status"
              >
                {isCorrect ? (
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden />
                )}
                <span className="text-muted-foreground">{q.explanation}</span>
              </div>
            ) : null}
          </>
        )}
      </div>

      <div className="flex justify-center gap-3">
        {done ? (
          <Button onClick={handleRestart}>
            <RotateCcw className="mr-1.5" />
            Try again
          </Button>
        ) : (
          selected && (
            <Button onClick={handleNext}>
              {index + 1 >= questions.length ? 'See results' : 'Next →'}
            </Button>
          )
        )}
        {!done && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRestart}
            className="text-muted-foreground"
          >
            <RefreshCw className="mr-1.5" />
            Restart
          </Button>
        )}
      </div>
    </div>
  );
}
