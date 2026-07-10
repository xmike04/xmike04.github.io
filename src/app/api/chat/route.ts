import { NextResponse } from "next/server";
import { z } from "zod";

import { positiveChatbot, positiveChatbotStream } from "@/ai/flows/positive-chatbot";

export const dynamic = "force-dynamic";

const chatRequestSchema = z.object({
  question: z.string().trim().min(1).max(500),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "ai"]),
        content: z.string().trim().min(1).max(1000),
      })
    )
    .max(8)
    .optional()
    .default([]),
});

const UNAVAILABLE_MESSAGE =
  "I'm sorry, the live chat is unavailable right now. Please try again in a moment or reach out through the contact section below.";

export async function POST(request: Request) {
  let input: z.infer<typeof chatRequestSchema>;

  try {
    const body = await request.json();
    input = chatRequestSchema.parse(body);
  } catch {
    // Invalid JSON or schema violation — never echo details back.
    return NextResponse.json(
      { response: "Please send a shorter question so I can answer clearly." },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    // Friendly message instead of a 500 — the key simply isn't configured.
    return NextResponse.json({ response: UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  try {
    // Preferred path: stream plain-text deltas as they arrive from OpenAI.
    const stream = await positiveChatbotStream(input);

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (streamError) {
    // Don't spend a second completion on a caller that already hung up.
    if (request.signal.aborted) {
      return NextResponse.json({ response: UNAVAILABLE_MESSAGE }, { status: 499 });
    }
    console.error("Streaming chat failed, retrying without streaming:", streamError);

    try {
      // Graceful fallback: one non-streaming completion returned as JSON.
      const output = await positiveChatbot(input);
      return NextResponse.json(output);
    } catch (fallbackError) {
      console.error("Error in /api/chat:", fallbackError);
      return NextResponse.json({ response: UNAVAILABLE_MESSAGE }, { status: 503 });
    }
  }
}
