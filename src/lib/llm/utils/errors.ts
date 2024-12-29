export class LLMError extends Error {
  constructor(
    public code: string,
    message: string,
    public provider: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'LLMError';
  }
}

export const ERROR_CODES = {
  RATE_LIMIT: 'rate_limit',
  CONTEXT_LENGTH: 'context_length',
  INVALID_REQUEST: 'invalid_request',
  API_ERROR: 'api_error',
  TIMEOUT: 'timeout',
  NETWORK: 'network_error'
} as const;

export function isLLMError(error: unknown): error is LLMError {
  return error instanceof LLMError;
}

export function handleProviderError(error: unknown, provider: string): never {
  // Network errors
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    throw new LLMError(
      ERROR_CODES.NETWORK,
      'Network connection failed',
      provider
    );
  }

  // Provider-specific error handling
  if (error instanceof Error) {
    // OpenAI errors
    if (error.message.includes('Rate limit')) {
      throw new LLMError(
        ERROR_CODES.RATE_LIMIT,
        'Rate limit exceeded',
        provider
      );
    }

    if (error.message.includes('maximum context length')) {
      throw new LLMError(
        ERROR_CODES.CONTEXT_LENGTH,
        'Maximum context length exceeded',
        provider
      );
    }
  }

  // Generic error
  throw new LLMError(
    ERROR_CODES.API_ERROR,
    'An unexpected error occurred',
    provider,
    { originalError: error }
  );
}