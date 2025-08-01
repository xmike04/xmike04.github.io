"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Bot, MessageSquare, Send, User, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { positiveChatbotAction } from "@/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export default function ChatBot({ resume }: { resume: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      content: "Hello! I'm an AI assistant. Ask me anything about Michael's resume, and I'll provide a positive, tailored response."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput('');

    try {
      const result = await positiveChatbotAction({ resume, question: input });
      if (result.response) {
        const aiMessage: ChatMessage = { role: 'ai', content: result.response };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error("Received an empty response from the AI.");
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with the chatbot. Please try again later.",
      });
      // Optionally remove the user's message or add an error message to the chat
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I had trouble connecting. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-20"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Chatbot"
      >
        <MessageSquare className="h-8 w-8" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] h-[70vh] flex flex-col p-0 gap-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center gap-2 font-headline">
              <Bot className="text-primary"/>
              AI Assistant
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                {message.role === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("max-w-[80%] rounded-lg p-3 text-sm", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-accent-foreground"><User size={20} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {loading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <DialogFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
