import { NextResponse } from "next/server";
import { z } from "zod";

import { positiveChatbot } from "@/ai/flows/positive-chatbot";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = chatRequestSchema.parse(body);
    const output = await positiveChatbot(input);

    return NextResponse.json(output);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { response: "Please send a shorter question so I can answer clearly." },
        { status: 400 }
      );
    }

    console.error("Error in /api/chat:", error);

    return NextResponse.json(
      {
        response:
          "I'm sorry, the live chat is unavailable right now. Please try again in a moment or reach out through the contact section below.",
      },
      { status: 500 }
    );
  }
}
