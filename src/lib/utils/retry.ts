interface RetryOptions {
  retries?: number;
  delay?: number;
  shouldRetry?: (error: unknown) => boolean;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 1000,
    shouldRetry = () => true
  } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (!shouldRetry(error) || attempt === retries - 1) {
        throw error;
      }

      // Exponential backoff with jitter
      const jitter = Math.random() * 200;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt) + jitter));
    }
  }

  throw lastError;
}