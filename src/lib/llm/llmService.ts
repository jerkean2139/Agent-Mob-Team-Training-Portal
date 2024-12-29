import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { GoogleProvider } from './providers/google';
import { LLM_PROVIDERS, LLM_CONFIG } from './config';
import { LLMError, ERROR_CODES } from './utils/errors';
import type { CompletionRequest, CompletionResponse, StreamingResponse, LLMProvider } from './types';

export class LLMService {
  private providers: Map<string, LLMProvider>;
  private rateLimits: Map<string, { remaining: number; resetAt: number }>;

  constructor() {
    this.providers = new Map([
      [LLM_PROVIDERS.OPENAI, new OpenAIProvider()],
      [LLM_PROVIDERS.ANTHROPIC, new AnthropicProvider()],
      [LLM_PROVIDERS.GOOGLE, new GoogleProvider()]
    ]);
    this.rateLimits = new Map();
  }

  async complete(
    provider: keyof typeof LLM_PROVIDERS,
    request: CompletionRequest
  ): Promise<CompletionResponse> {
    await this.checkRateLimit(provider);
    const llmProvider = this.getProvider(provider);
    
    try {
      return await llmProvider.complete(request);
    } catch (error) {
      this.handleRateLimitError(provider, error);
      throw error;
    }
  }

  async *streamComplete(
    provider: keyof typeof LLM_PROVIDERS,
    request: CompletionRequest
  ): AsyncGenerator<StreamingResponse, void, unknown> {
    await this.checkRateLimit(provider);
    const llmProvider = this.getProvider(provider);

    if (!llmProvider.streamComplete) {
      throw new LLMError(
        ERROR_CODES.INVALID_REQUEST,
        `Provider ${provider} does not support streaming`,
        provider
      );
    }

    try {
      yield* llmProvider.streamComplete(request);
    } catch (error) {
      this.handleRateLimitError(provider, error);
      throw error;
    }
  }

  private getProvider(provider: keyof typeof LLM_PROVIDERS): LLMProvider {
    const llmProvider = this.providers.get(provider);
    if (!llmProvider) {
      throw new LLMError(
        ERROR_CODES.INVALID_REQUEST,
        `Provider ${provider} not found`,
        provider
      );
    }
    return llmProvider;
  }

  private async checkRateLimit(provider: string) {
    const rateLimit = this.rateLimits.get(provider);
    if (rateLimit && rateLimit.remaining <= 0 && Date.now() < rateLimit.resetAt) {
      throw new LLMError(
        ERROR_CODES.RATE_LIMIT,
        'Rate limit exceeded',
        provider,
        { resetAt: rateLimit.resetAt }
      );
    }
  }

  private handleRateLimitError(provider: string, error: unknown) {
    if (error instanceof LLMError && error.code === ERROR_CODES.RATE_LIMIT) {
      this.rateLimits.set(provider, {
        remaining: 0,
        resetAt: Date.now() + 60000 // 1 minute default
      });
    }
  }

  getProviderModels(provider: keyof typeof LLM_PROVIDERS) {
    return LLM_CONFIG[provider].models;
  }
}

// Export singleton instance
export const llmService = new LLMService();