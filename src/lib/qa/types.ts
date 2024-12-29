import { z } from 'zod';

export const QASchema = z.object({
  id: z.string().uuid().optional(),
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  agentId: z.string().uuid(),
  status: z.enum(['active', 'archived']).default('active'),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

export type QA = z.infer<typeof QASchema>;