'use server';

/**
 * @fileOverview An interactive symptom checker AI agent.
 *
 * - interactiveSymptomChecker - A function that handles the symptom checking process.
 * - InteractiveSymptomCheckerInput - The input type for the interactiveSymptomChecker function.
 * - InteractiveSymptomCheckerOutput - The return type for the interactiveSymptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveSymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe("The user's symptoms, described in natural language."),
  previousResponses: z
    .array(z.object({question: z.string(), answer: z.string()}))
    .optional()
    .describe('The history of questions and answers in the conversation.'),
});
export type InteractiveSymptomCheckerInput =
  z.infer<typeof InteractiveSymptomCheckerInputSchema>;

const InteractiveSymptomCheckerOutputSchema = z.object({
  question: z.string().describe('The next question to ask the user.'),
  suggestedConditions: z
    .array(z.string())
    .describe('A list of possible conditions based on the symptoms.'),
});
export type InteractiveSymptomCheckerOutput =
  z.infer<typeof InteractiveSymptomCheckerOutputSchema>;

export async function interactiveSymptomChecker(
  input: InteractiveSymptomCheckerInput
): Promise<InteractiveSymptomCheckerOutput> {
  return interactiveSymptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveSymptomCheckerPrompt',
  input: {schema: InteractiveSymptomCheckerInputSchema},
  output: {schema: InteractiveSymptomCheckerOutputSchema},
  prompt: `You are an AI-powered symptom checker. Your goal is to help the user identify possible conditions based on their symptoms.

  The user will provide a description of their symptoms. You should ask clarifying questions to narrow down the possible conditions. After each question, also provide a list of suggested conditions based on the information you have so far.

  Here's the user's description of their symptoms: {{{symptoms}}}

  {{#if previousResponses}}
  Here is the history of our conversation so far:
  {{#each previousResponses}}
  Question: {{{this.question}}}
  Answer: {{{this.answer}}}
  {{/each}}
  {{/if}}

  Based on this information, what is your next question for the user?  What are the suggested conditions? Make sure to set the question and suggestedConditions fields in the output.`,
});

const interactiveSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'interactiveSymptomCheckerFlow',
    inputSchema: InteractiveSymptomCheckerInputSchema,
    outputSchema: InteractiveSymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
