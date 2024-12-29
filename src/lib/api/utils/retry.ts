const DEFAULT_RETRY_COUNT = 3;
const DEFAULT_DELAY = 1000;

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    retries = DEFAULT_RETRY_COUNT,
    delay = DEFAULT_DELAY,
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

      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }

  throw lastError;
}