'use server';

import { z } from "zod";

import { resumeData } from "@/lib/resume-data";

const PositiveChatbotInputSchema = z.object({
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
export type PositiveChatbotInput = z.infer<typeof PositiveChatbotInputSchema>;

const PositiveChatbotOutputSchema = z.object({
  response: z.string().min(1),
});
export type PositiveChatbotOutput = z.infer<typeof PositiveChatbotOutputSchema>;

const RESUME_CONTEXT = [
  `Candidate: ${resumeData.name}`,
  `Summary: ${resumeData.summary}`,
  `Skills: ${resumeData.skills
    .map((category) => `${category.category}: ${category.technologies.join(", ")}`)
    .join(" | ")}`,
  `Experience: ${resumeData.workExperience
    .map(
      (role) =>
        `${role.title} at ${role.company} (${role.date}) - ${role.description.join(" ")}`
    )
    .join(" | ")}`,
  `Projects: ${resumeData.projects
    .map(
      (project) =>
        `${project.title} (${project.date}) - ${project.description.join(" ")}`
    )
    .join(" | ")}`,
  `Education: ${resumeData.education
    .map((entry) => `${entry.degree} at ${entry.school} (${entry.date})`)
    .join(" | ")}`,
].join("\n");

function buildConversation(history: PositiveChatbotInput["history"], question: string) {
  const formattedHistory = history
    .map((message) => `${message.role === "ai" ? "Assistant" : "Visitor"}: ${message.content}`)
    .join("\n");

  return [
    "Resume context:",
    RESUME_CONTEXT,
    "",
    "Conversation so far:",
    formattedHistory || "No prior conversation.",
    "",
    `Latest visitor question: ${question}`,
  ].join("\n");
}

function extractResponseText(data: unknown) {
  if (
    data &&
    typeof data === "object" &&
    "output_text" in data &&
    typeof (data as { output_text?: unknown }).output_text === "string"
  ) {
    return (data as { output_text: string }).output_text.trim();
  }

  return "";
}

export async function positiveChatbot(
  rawInput: PositiveChatbotInput
): Promise<PositiveChatbotOutput> {
  const input = PositiveChatbotInputSchema.parse(rawInput);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-5.4-mini",
      instructions:
        "You are the portfolio assistant for Michael Marin. Answer using only the supplied resume context and conversation. Be warm, confident, and concise. Use 2 to 5 sentences, plain text only, and focus on experience, outcomes, and fit. If a question is unrelated to Michael's background or asks for information not present in the provided context, politely say you can only answer based on the portfolio and resume information available here.",
      input: buildConversation(input.history, input.question),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const text = extractResponseText(data);

  return PositiveChatbotOutputSchema.parse({
    response:
      text ||
      "I’m sorry, I couldn’t generate a response just now. Please try asking again.",
  });
}
