"use server";

import { positiveChatbot } from "@/ai/flows/positive-chatbot";
import type { PositiveChatbotInput, PositiveChatbotOutput } from "@/ai/flows/positive-chatbot";

export async function positiveChatbotAction(
  input: PositiveChatbotInput
): Promise<PositiveChatbotOutput> {
  // In a real app, you might add authentication, validation, or logging here.
  try {
    const output = await positiveChatbot(input);
    return output;
  } catch (error) {
    console.error("Error in positiveChatbotAction:", error);
    // You could return a structured error object
    return { response: "I'm sorry, I encountered an error. Please try again later." };
  }
}
