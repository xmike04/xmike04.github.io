"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Loader2, MessageSquare, Send, Sparkles, User } from "lucide-react";
import { useReducedMotion } from "motion/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { resumeData } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

interface ChatResponse {
  response: string;
}

const GREETING: ChatMessage = {
  role: "ai",
  content: `Hi! I'm ${resumeData.name.split(" ")[0]}'s portfolio assistant. Ask me anything about his experience, projects, or studies.`,
};

const FALLBACK_MESSAGE =
  "I'm sorry, the live chat is unavailable right now. Please try again shortly.";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingReply, setStreamingReply] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, loading, reducedMotion]);

  const showSuggestions = messages.length === 1 && !loading;

  const appendAiMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "ai", content }]);
  };

  const appendToLastAiMessage = (text: string) => {
    setMessages((prev) => {
      const next = prev.slice();
      const last = next[next.length - 1];
      if (last?.role === "ai") {
        next[next.length - 1] = { ...last, content: last.content + text };
      }
      return next;
    });
  };

  const sendMessage = async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || loading) return;

    // Skip the greeting, keep the last 6 turns, and respect the API limits.
    const history = messages
      .slice(1)
      .slice(-6)
      .map((message) => ({
        role: message.role,
        content: message.content.slice(0, 1000),
      }))
      .filter((message) => message.content.length > 0);

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.slice(0, 500), history }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      // Non-streaming path: error statuses and the JSON fallback.
      if (!response.ok || contentType.includes("application/json") || !response.body) {
        const data = (await response.json().catch(() => null)) as ChatResponse | null;
        appendAiMessage(data?.response || FALLBACK_MESSAGE);
        return;
      }

      // Streaming path: render text deltas into the reply as they arrive.
      appendAiMessage("");
      setStreamingReply(true);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let received = "";

      while (true) {
        const { done, value } = await reader.read();
        const text = done ? decoder.decode() : decoder.decode(value, { stream: true });
        if (text) {
          received += text;
          appendToLastAiMessage(text);
        }
        if (done) break;
      }

      if (!received.trim()) {
        // Stream opened but produced nothing usable — show the fallback copy.
        setMessages((prev) => {
          const next = prev.slice();
          const last = next[next.length - 1];
          if (last?.role === "ai" && !last.content.trim()) {
            next[next.length - 1] = { ...last, content: FALLBACK_MESSAGE };
          }
          return next;
        });
      }
    } catch (error) {
      console.error("Error submitting chat request:", error);
      appendAiMessage(FALLBACK_MESSAGE);
    } finally {
      setLoading(false);
      setStreamingReply(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-20 md:bottom-6 md:right-6">
        {/* Soft pulsing halo — motion-safe keeps it static under reduced motion. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-primary/30 blur-md motion-safe:animate-pulse"
        />
        <Button
          className="glow-primary relative h-14 w-14 rounded-full shadow-2xl md:h-16 md:w-16"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant chat"
        >
          <MessageSquare className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass flex h-[80vh] flex-col gap-0 border-border/60 p-0 sm:max-w-[90vw] md:max-w-[440px]">
          <DialogHeader className="border-b border-border/60 p-4">
            <DialogTitle className="flex items-center gap-2 font-headline">
              <Bot className="text-primary" aria-hidden="true" />
              AI Assistant
            </DialogTitle>
            <DialogDescription className="sr-only">
              Chat with an AI assistant about {resumeData.name}&apos;s experience,
              projects, and education.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 space-y-4 overflow-y-auto p-4" role="log" aria-label="Chat messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "ai" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot size={20} aria-hidden="true" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/60 bg-muted/60"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      <User size={20} aria-hidden="true" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {loading && !streamingReply && (
              <div className="flex items-start justify-start gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={20} aria-hidden="true" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2 rounded-lg border border-border/60 bg-muted/60 p-3">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="space-y-2 pt-2">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {resumeData.suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void sendMessage(question)}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-left text-xs transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <DialogFooter className="border-t border-border/60 p-4">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-background/60"
                disabled={loading}
                aria-label="Your question"
              />
              <Button type="submit" size="icon" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
