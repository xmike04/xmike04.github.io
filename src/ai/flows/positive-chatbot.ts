// src/ai/flows/positive-chatbot.ts
'use server';

/**
 * @fileOverview An AI chatbot that provides positive and tailored responses based on a given resume.
 *
 * - positiveChatbot - A function that handles the chatbot interaction.
 * - PositiveChatbotInput - The input type for the positiveChatbot function.
 * - PositiveChatbotOutput - The return type for the positiveChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PositiveChatbotInputSchema = z.object({
  resume: z.string().describe('The resume content to base the responses on.'),
  question: z.string().describe('The question from the employer.'),
});
export type PositiveChatbotInput = z.infer<typeof PositiveChatbotInputSchema>;

const PositiveChatbotOutputSchema = z.object({
  response: z.string().describe('The positive and tailored response from the chatbot.'),
});
export type PositiveChatbotOutput = z.infer<typeof PositiveChatbotOutputSchema>;

export async function positiveChatbot(input: PositiveChatbotInput): Promise<PositiveChatbotOutput> {
  return positiveChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'positiveChatbotPrompt',
  input: {schema: PositiveChatbotInputSchema},
  output: {schema: PositiveChatbotOutputSchema},
  prompt: `You are a helpful and enthusiastic AI assistant designed to provide positive responses to employers asking questions about a candidate based on their resume. Your responses should be concise and under 5 sentences.

  Resume:
  {{resume}}

  Question:
  {{question}}

  Provide a positive and tailored response to the employer's question, highlighting the candidate's strengths and relevant experiences. Always be enthusiastic and encouraging in your response.
  Format the response so it is easy to read in markdown format, with line breaks to separate thoughts.
  `,
});

const positiveChatbotFlow = ai.defineFlow(
  {
    name: 'positiveChatbotFlow',
    inputSchema: PositiveChatbotInputSchema,
    outputSchema: PositiveChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
