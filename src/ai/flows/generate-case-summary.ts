
'use server';

/**
 * @fileOverview AI flow to generate a case summary from a prescription image.
 *
 * - generateCaseSummary - A function that handles the case summary generation process.
 * - GenerateCaseSummaryInput - The input type for the generateCaseSummary function.
 * - GenerateCaseSummaryOutput - The return type for the generateCaseSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaseSummaryInputSchema = z.object({
  prescriptionPhotoDataUri: z
    .string()
    .describe(
      'A photo of a prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type GenerateCaseSummaryInput = z.infer<typeof GenerateCaseSummaryInputSchema>;

const GenerateCaseSummaryOutputSchema = z.object({
  caseSummary: z.string().describe('A summary of the medication, dosage, and potential side effects.'),
  disease: z.string().describe('The likely disease or condition based on the prescription.'),
  likelihood: z.string().describe('The likelihood of the diagnosis (e.g., High, Medium, Low).'),
  patientInfo: z.string().describe('Information and next steps for the patient regarding the potential diagnosis.'),
});
export type GenerateCaseSummaryOutput = z.infer<typeof GenerateCaseSummaryOutputSchema>;

export async function generateCaseSummary(input: GenerateCaseSummaryInput): Promise<GenerateCaseSummaryOutput> {
  return generateCaseSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaseSummaryPrompt',
  input: {schema: GenerateCaseSummaryInputSchema},
  output: {schema: GenerateCaseSummaryOutputSchema},
  prompt: `You are a medical expert. You will analyze a prescription and do the following:
  1.  Summarize the medication, dosage, and potential side effects for the patient in a way that's easy to understand.
  2.  Based on the medication, infer the likely disease or condition it is meant to treat.
  3.  State the likelihood (High, Medium, or Low) that this is the correct diagnosis.
  4.  Provide helpful information and suggest next steps for a patient with this condition.

Prescription Photo: {{media url=prescriptionPhotoDataUri}}`,
});

const generateCaseSummaryFlow = ai.defineFlow(
  {
    name: 'generateCaseSummaryFlow',
    inputSchema: GenerateCaseSummaryInputSchema,
    outputSchema: GenerateCaseSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

