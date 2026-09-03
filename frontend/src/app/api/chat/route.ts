import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
// Note: Requires GEMINI_API_KEY environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured.' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    // System instruction for the Concierge persona
    const systemPrompt = `You are the Property Concierge for "Rank My Property Manager". 
Your goal is to help landlords find local property management companies based on their portfolio size and needs.
Be extremely concise, helpful, and friendly. 
Do not hallucinate data. If they ask about fees, ask them for their city and how many units they have, then promise to connect them with a vetted local manager.
Keep responses under 3 sentences.`;

    const chat = model.startChat({
      history: history.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })),
      systemInstruction: { parts: [{ text: systemPrompt }], role: 'model' }
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
