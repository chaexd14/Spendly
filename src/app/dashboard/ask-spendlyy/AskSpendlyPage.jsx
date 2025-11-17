'use client';

import { useState, useEffect } from 'react';
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

export default function AskSpendlyPage({ session }) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const user = session.user;

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

    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    const currentPrompt = prompt;
    setPrompt('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: 'ai', content: data.output }]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        {error && (
          <div>
            <h3 className="mb-2 font-bold">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        <ScrollArea>
          <div className="grid grid-cols-1 gap-3">
            {messages.map((msg, index) => (
              <div key={index} className="p-3 border rounded">
                {msg.role === 'user' ? (
                  <div className="flex items-start justify-end gap-3">
                    <p className="leading-7 text-justify">{msg.content}</p>
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src="/aiAvatar.jpg" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <p className="leading-7 text-justify w-[60%]">
                      {msg.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <InputGroup>
          <InputGroupTextarea
            placeholder="Ask Spendlyy..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton variant="default" onClick={sendPrompt}>
              Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  );
}
