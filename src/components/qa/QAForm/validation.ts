import { z } from 'zod';

export const qaSchema = z.object({
  question: z.string()
    .min(1, 'Question is required')
    .max(500, 'Question is too long')
    .trim(),
  answer: z.string()
    .min(1, 'Answer is required')
    .max(2000, 'Answer is too long')
    .trim()
});

export type QAFormData = z.infer<typeof qaSchema>;

export function validateQAForm(data: unknown) {
  try {
    return { data: qaSchema.parse(data), error: null };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { data: null, error: err.errors[0].message };
    }
    return { data: null, error: 'Invalid form data' };
  }
}