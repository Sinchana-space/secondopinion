"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { interactiveSymptomChecker } from "@/ai/flows/interactive-symptom-checker";
import type { InteractiveSymptomCheckerOutput } from "@/ai/flows/interactive-symptom-checker";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Bot, User, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Message = {
  role: 'user' | 'bot';
  content: string;
};

type ConversationHistory = {
  question: string;
  answer: string;
};

export default function SymptomCheckerPage() {
  const [symptoms, setSymptoms] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [history, setHistory] = useState<ConversationHistory[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [suggestedConditions, setSuggestedConditions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialSymptomSubmitted, setInitialSymptomSubmitted] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation, isLoading]);

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms || isLoading) return;

    setIsLoading(true);
    setError(null);
    setConversation([{ role: 'user', content: symptoms }]);
    setInitialSymptomSubmitted(true);

    try {
      const response: InteractiveSymptomCheckerOutput = await interactiveSymptomChecker({ symptoms });
      setConversation(prev => [...prev, { role: 'bot', content: response.question }]);
      setCurrentQuestion(response.question);
      setSuggestedConditions(response.suggestedConditions);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setConversation(prev => prev.slice(0, 1)); // Revert conversation
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async (answer: string) => {
    if (!answer || isLoading || !currentQuestion) return;

    setIsLoading(true);
    setError(null);

    const newHistory: ConversationHistory[] = [...history, { question: currentQuestion, answer }];
    setHistory(newHistory);
    setConversation(prev => [...prev, { role: 'user', content: answer }]);

    try {
      const response = await interactiveSymptomChecker({
        symptoms,
        previousResponses: newHistory,
      });
      setConversation(prev => [...prev, { role: 'bot', content: response.question }]);
      setCurrentQuestion(response.question);
      setSuggestedConditions(response.suggestedConditions);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Interactive Symptom Checker
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Let our AI guide you through a series of questions to identify potential conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {!initialSymptomSubmitted ? (
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Sparkles className="text-accent" />Describe your symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInitialSubmit} className="space-y-4">
                  <Textarea
                    placeholder="e.g., 'I have a sore throat, a fever, and I've been coughing for 3 days.'"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={5}
                    className="bg-background/80"
                  />
                  <Button type="submit" disabled={isLoading || !symptoms} className="w-full">
                    {isLoading ? "Analyzing..." : "Start Symptom Check"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col h-[600px] bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg shadow-primary/5">
                <div ref={chatContainerRef} className="flex-1 space-y-6 p-6 overflow-y-auto">
                {conversation.map((msg, index) => (
                  <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {msg.role === 'bot' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                    <div className={cn("p-3 rounded-lg max-w-md break-words", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground')}>
                      <p>{msg.content}</p>
                    </div>
                    {msg.role === 'user' && <User className="w-6 h-6 text-muted-foreground flex-shrink-0" />}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3 justify-start">
                      <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                      <div className="p-3 rounded-lg bg-secondary max-w-md">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-2 w-2 rounded-full animate-bounce" />
                            <Skeleton className="h-2 w-2 rounded-full animate-bounce delay-150" />
                            <Skeleton className="h-2 w-2 rounded-full animate-bounce delay-300" />
                        </div>
                      </div>
                    </div>
                )}
                 {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
              </div>
              <div className="p-4 border-t border-primary/20">
                <AnswerInput onSubmit={handleAnswerSubmit} disabled={isLoading} />
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Suggested Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && suggestedConditions.length === 0 ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ) : suggestedConditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {suggestedConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="text-sm bg-accent/20 text-accent-foreground border-accent">
                      {condition}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No suggestions yet. Please answer the questions.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AnswerInput({ onSubmit, disabled }: { onSubmit: (answer: string) => void; disabled: boolean; }) {
  const [answer, setAnswer] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
      setAnswer("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer..."
        disabled={disabled}
        className="bg-background/80"
        autoComplete="off"
      />
      <Button type="submit" disabled={disabled || !answer.trim()}>Send</Button>
    </form>
  );
}
