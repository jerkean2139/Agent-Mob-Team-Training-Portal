import { z } from 'zod';

export const LLM_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  GOOGLE: 'google'
} as const;

export const LLM_CONFIG = {
  openai: {
    baseUrl: 'https://api.openai.com/v1',
    models: {
      gpt4: 'gpt-4',
      gpt35: 'gpt-3.5-turbo'
    }
  },
  anthropic: {
    baseUrl: 'https://api.anthropic.com/v1',
    models: {
      claude: 'claude-2',
      claudeInstant: 'claude-instant-1'
    }
  },
  google: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1',
    models: {
      palm: 'chat-bison-001'
    }
  }
};

// Validation schemas
export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  name: z.string().optional()
});

export const CompletionRequestSchema = z.object({
  messages: z.array(MessageSchema),
  model: z.string(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().positive().optional()
});