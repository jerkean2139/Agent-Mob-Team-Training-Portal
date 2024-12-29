import { z } from 'zod';

export const ACCEPTED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'text/plain': '.txt'
} as const;

export const MAX_DOCUMENTS_PER_AGENT = 50;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const DocumentSchema = z.object({
  id: z.string().uuid(),
  agent_id: z.string().uuid(),
  client_id: z.string().uuid(),
  name: z.string().min(1),
  type: z.string(),
  size: z.number().max(MAX_FILE_SIZE),
  url: z.string().url().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

export type Document = z.infer<typeof DocumentSchema>;