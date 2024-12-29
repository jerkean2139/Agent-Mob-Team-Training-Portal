import type { LLMProvider, CompletionRequest, CompletionResponse } from '../types';
import { LLM_CONFIG } from '../config';

export class AnthropicProvider implements LLMProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    const response = await fetch(`${LLM_CONFIG.anthropic.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        max_tokens: request.maxTokens
      })
    });

    const data = await response.json();

    return {
      content: data.content[0].text,
      model: request.model,
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
  }
}