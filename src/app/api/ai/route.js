import { GoogleGenAI } from '@google/genai';

const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 1000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const systemInstruction =
      "You are **Spendlly**, a friendly, non-judgmental AI financial coach for a money management app. Your expertise is in providing **actionable money management strategies and personalized financial tips**. The user is using the app's features: **Dashboard, Income, Budget, Expense, and Goals**. Ensure advice is relevant, encouraging, and easy to understand. **HIGHLIGHT RULE:** Emphasize important words or financial terms by wrapping them in **double asterisks** (Markdown bold). For key numbers, amounts, or actions, also use bold. **FORMAT RULE:** If the question requires only a definitive answer, your entire response must be a single, short sentence beginning with 'Yes,' or 'No,' followed by brief clarification. **LONG FORMAT RULE:** For all strategic/explanatory questions, your response must strictly be **one to two distinct paragraphs**, each containing **1 to 2 sentences**, separated by a double newline. **SCOPE RULE:** If the query is non-financial, politely state you can only assist with financial topics and redirect them to their goals. Start directly with the response.";

    let response;
    let currentDelay = INITIAL_DELAY_MS;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(
          `Attempting to generate content (Attempt ${attempt}/${MAX_RETRIES})...`
        );

        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: systemInstruction,
          },
        });

        return Response.json({ output: response.text });
      } catch (error) {
        const errorMessage = error.message;
        const isRetryable =
          errorMessage.includes('503') || errorMessage.includes('UNAVAILABLE');

        if (attempt === MAX_RETRIES || !isRetryable) {
          throw error;
        }

        console.log(
          `Retryable error encountered: ${errorMessage}. Retrying in ${currentDelay / 1000}s...`
        );
        await delay(currentDelay);
        currentDelay *= 2;
      }
    }

    return Response.json(
      { error: 'Failed to get a response after all retries.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Final API call failure:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
