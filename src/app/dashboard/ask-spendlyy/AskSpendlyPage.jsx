'use client';

import { useState } from 'react';
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
  const [userPromt, setUserPromt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const user = session.user;

  const setPromptMessage = (text) => {
    setUserPromt(text);
  };

  async function sendPrompt() {
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        toast.error('Something went wrong.');
        return;
      }

      setResponse(data.output);
    } catch (err) {
      setError('Network error: ' + err.message);
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
            {userPromt && (
              <div className="border border-red-400 ">
                <div className="flex items-start justify-end gap-5">
                  <p className="leading-7 text-justify">{userPromt}</p>

                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="rounded-lg">SP</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            )}

            {response && (
              <div className="flex gap-5 border border-red-400">
                <Avatar>
                  <AvatarImage src="/aiAvatar.jpg" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <p className="leading-7 text-justify">{response}</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {!response && !userPromt && (
          <h1 className="text-4xl font-extrabold tracking-tight text-center scroll-m-20 text-balance">
            <span>Hi </span> {user.name}
          </h1>
        )}

        <InputGroup>
          <InputGroupTextarea
            placeholder="Ask Spendlyy..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="default"
              onClick={() => {
                sendPrompt();
                setPromptMessage(prompt);
              }}
            >
              Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  );
}
