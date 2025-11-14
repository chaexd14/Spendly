'use client';

import { useState } from 'react';
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';

export default function AskSpendlyPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(''); // <-- NEW

  async function sendPrompt() {
    setError(''); // clear previous error
    setResponse(''); // clear previous response

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend returned an error
        setError(data.error || 'Something went wrong.');
        return;
      }

      setResponse(data.output);
    } catch (err) {
      // Network / unexpected error
      setError('Network error: ' + err.message);
    }
  }

  return (
    <>
      {/* ERROR MESSAGE */}
      {error && (
        <div>
          <h3 className="mb-2 font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {/* AI Response */}
      {response && (
        <div>
          <p>{response}</p>
        </div>
      )}

      <InputGroup>
        <InputGroupTextarea
          placeholder="Ask, Search or Chat..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="default" onClick={sendPrompt}>
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
