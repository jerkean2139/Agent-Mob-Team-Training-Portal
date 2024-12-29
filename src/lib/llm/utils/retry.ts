import { LLMError, ERROR_CODES } from './errors';

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_INITIAL_DELAY = 1000;
const DEFAULT_MAX_DELAY = 10000;

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  shouldRetry?: (error: unknown) => boolean;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = DEFAULT_MAX_RETRIES,
    initialDelay = DEFAULT_INITIAL_DELAY,
    maxDelay = DEFAULT_MAX_DELAY,
    shouldRetry = defaultShouldRetry
  } = options;

  let lastError: unknown;
  let delay = initialDelay;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (!shouldRetry(error) || attempt === maxRetries - 1) {
        throw error;
      }

      // Exponential backoff with jitter
      const jitter = Math.random() * 200;
      await sleep(Math.min(delay + jitter, maxDelay));
      delay *= 2;
    }
  }

  throw lastError;
}

function defaultShouldRetry(error: unknown): boolean {
  if (!(error instanceof LLMError)) return false;

  return [
    ERROR_CODES.RATE_LIMIT,
    ERROR_CODES.NETWORK,
    ERROR_CODES.TIMEOUT
  ].includes(error.code as ERROR_CODES);
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));