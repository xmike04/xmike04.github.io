/**
 * Server-only chatbot flow. Called from the /api/chat route handler —
 * OPENAI_API_KEY is read here on the server and never reaches the browser.
 */
import { z } from "zod";

import { resumeData } from "@/lib/resume-data";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4o-mini";

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
  `Candidate: ${resumeData.name} — ${resumeData.role}`,
  `Availability: ${resumeData.availability}`,
  `Location: ${resumeData.contact.location} | Email: ${resumeData.contact.email}`,
  `Links: GitHub ${resumeData.social.github} | LinkedIn ${resumeData.social.linkedin}`,
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
    .map((entry) =>
      [
        `${entry.degree} at ${entry.school} (${entry.date})`,
        entry.gpa ? `GPA ${entry.gpa}` : "",
        entry.coursework?.length
          ? `Coursework: ${entry.coursework.join("; ")}`
          : "",
      ]
        .filter(Boolean)
        .join(" — ")
    )
    .join(" | ")}`,
  `Press & recognition: ${resumeData.press
    .map((item) => `${item.title} (${item.outlet}) - ${item.description}`)
    .join(" | ")}`,
  `Certifications: ${resumeData.certifications.join(" | ")}`,
  `Leadership & interests: ${resumeData.interests.join(" | ")}`,
].join("\n");

const SYSTEM_INSTRUCTIONS =
  "You are the portfolio assistant for Michael Marin. Answer using only the supplied resume context and conversation. Be warm, confident, and concise. Use 2 to 5 sentences, plain text only, and focus on experience, outcomes, and fit. If a question is unrelated to Michael's background or asks for information not present in the provided context, politely say you can only answer based on the portfolio and resume information available here.";

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

async function requestOpenAI(input: PositiveChatbotInput, stream: boolean) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
      instructions: SYSTEM_INSTRUCTIONS,
      input: buildConversation(input.history, input.question),
      stream,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errorBody}`);
  }

  return response;
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

/** Pull the text deltas out of one raw SSE event block. */
function extractEventDeltas(rawEvent: string) {
  let deltas = "";

  for (const line of rawEvent.split("\n")) {
    if (!line.startsWith("data:")) continue;

    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    try {
      const parsed = JSON.parse(payload) as { type?: string; delta?: unknown };
      if (
        parsed.type === "response.output_text.delta" &&
        typeof parsed.delta === "string"
      ) {
        deltas += parsed.delta;
      }
    } catch {
      // Ignore malformed or non-JSON SSE payloads.
    }
  }

  return deltas;
}

/** TransformStream that turns OpenAI SSE bytes into plain UTF-8 text deltas. */
function sseToTextDeltas() {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });

      let separatorIndex: number;
      while ((separatorIndex = buffer.indexOf("\n\n")) !== -1) {
        const rawEvent = buffer.slice(0, separatorIndex);
        buffer = buffer.slice(separatorIndex + 2);

        const deltas = extractEventDeltas(rawEvent);
        if (deltas) controller.enqueue(encoder.encode(deltas));
      }
    },
    flush(controller) {
      const deltas = extractEventDeltas(buffer);
      if (deltas) controller.enqueue(encoder.encode(deltas));
    },
  });
}

/**
 * Streaming variant: resolves to a ReadableStream of UTF-8 encoded text
 * deltas once OpenAI has accepted the request. Setup failures (missing key,
 * non-2xx upstream response) reject before any bytes are produced, so the
 * caller can still fall back to a plain JSON response.
 */
export async function positiveChatbotStream(
  rawInput: PositiveChatbotInput
): Promise<ReadableStream<Uint8Array>> {
  const input = PositiveChatbotInputSchema.parse(rawInput);
  const response = await requestOpenAI(input, true);

  if (!response.body) {
    throw new Error("OpenAI streaming response had no body.");
  }

  return response.body.pipeThrough(sseToTextDeltas());
}

/** Non-streaming variant, kept as the fallback path for /api/chat. */
export async function positiveChatbot(
  rawInput: PositiveChatbotInput
): Promise<PositiveChatbotOutput> {
  const input = PositiveChatbotInputSchema.parse(rawInput);
  const response = await requestOpenAI(input, false);

  const data = await response.json();
  const text = extractResponseText(data);

  return PositiveChatbotOutputSchema.parse({
    response:
      text ||
      "I’m sorry, I couldn’t generate a response just now. Please try asking again.",
  });
}
