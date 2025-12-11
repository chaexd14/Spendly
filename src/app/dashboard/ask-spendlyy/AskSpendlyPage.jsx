'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useState, useEffect, useRef } from 'react';
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AskSpendlyPage({ session }) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user = session.user;
  const bottomRef = useRef(null);

  // Auto-scroll to last message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Load chat history
  useEffect(() => {
    async function loadChat() {
      const res = await fetch('/api/chat/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();
      if (data.success && data.thread) {
        setMessages(data.thread.messages);
      }
    }

    loadChat();
  }, [user.id]);

  // Save chat on update
  useEffect(() => {
    if (messages.length === 0) return;

    async function saveChat() {
      await fetch('/api/chat/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          messages,
        }),
      });
    }

    saveChat();
  }, [messages, user.id]);

  async function sendPrompt() {
    if (!prompt.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);

    const current = prompt;
    setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: current }),
      });

      const data = await res.json();

      // Add AI message
      setMessages((prev) => [...prev, { role: 'ai', content: data.output }]);
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-70px)]">
      {/* ChatGPT-like center panel */}
      <ScrollArea className="h-[500px]">
        <div className="flex flex-col w-full gap-10 p-5">
          {messages.length === 0 && !loading && (
            <div className="flex gap-10">
              <Avatar className="mt-1">
                <AvatarImage src="/aiAvatar.jpg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>

              <div className="rounded-lg p-4 shadow-sm max-w-[800px] text-base leading-relaxed bg-muted text-foreground">
                Welcome! Ask Spendly any question about your finances to get
                started.
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className="flex gap-10">
              <div>
                {/* Avatar */}
                {msg.role === 'ai' && (
                  <Avatar className="mt-1">
                    <AvatarImage src="/aiAvatar.jpg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
              </div>

              {/* Bubble */}
              <div
                className={`rounded-lg p-4 shadow-sm max-w-[800px] text-base leading-relaxed whitespace-pre-line ${
                  msg.role === 'ai'
                    ? 'bg-muted text-foreground'
                    : 'bg-primary text-primary-foreground ml-auto'
                }`}
              >
                {msg.role === 'ai' ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({ node, ...props }) => (
                        <span className="font-semibold" {...props} />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="/aiAvatar.jpg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>

              <div className="px-4 py-3 text-sm rounded-lg shadow-sm bg-muted text-muted-foreground">
                Spendlyy is typing
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input Bar */}
      <div className="p-4 border-t bg-background">
        <div className="w-full">
          <Card>
            <CardContent className="p-5">
              <Input
                placeholder="Ask Spendlyy..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="text-2xl h-[50px]"
              />
            </CardContent>

            <CardFooter>
              <Button onClick={sendPrompt}>Send</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
