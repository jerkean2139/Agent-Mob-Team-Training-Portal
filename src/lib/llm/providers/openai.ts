import { Configuration, OpenAIApi } from 'openai';
import type { LLMProvider, CompletionRequest, CompletionResponse, StreamingResponse } from '../types';
import { withRetry } from '../utils/retry';
import { handleProviderError } from '../utils/errors';

export class OpenAIProvider implements LLMProvider {
  private client: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY
    });
    this.client = new OpenAIApi(configuration);
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    return withRetry(async () => {
      try {
        const response = await this.client.createChatCompletion({
          model: request.model,
          messages: request.messages,
          temperature: request.temperature,
          max_tokens: request.maxTokens,
          stream: false
        });

        return {
          content: response.data.choices[0].message?.content || '',
          model: response.data.model,
          usage: {
            promptTokens: response.data.usage?.prompt_tokens || 0,
            completionTokens: response.data.usage?.completion_tokens || 0,
            totalTokens: response.data.usage?.total_tokens || 0
          }
        };
      } catch (error) {
        throw handleProviderError(error, 'openai');
      }
    });
  }

  async *streamComplete(request: CompletionRequest): AsyncGenerator<StreamingResponse, void, unknown> {
    try {
      const response = await this.client.createChatCompletion({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature,
        max_tokens: request.maxTokens,
        stream: true
      }, { responseType: 'stream' });

      const stream = response.data as unknown as ReadableStream;
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              yield { content: '', done: true };
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                yield { content, done: false };
              }
            } catch (e) {
              console.warn('Failed to parse streaming response:', e);
            }
          }
        }
      }
    } catch (error) {
      throw handleProviderError(error, 'openai');
    }
  }
}