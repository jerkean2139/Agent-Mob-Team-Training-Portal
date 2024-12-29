import type { LLMProvider, CompletionRequest, CompletionResponse } from '../types';
import { LLM_CONFIG } from '../config';

export class GoogleProvider implements LLMProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    const response = await fetch(
      `${LLM_CONFIG.google.baseUrl}/models/${request.model}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: request.messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
          }))
        })
      }
    );

    const data = await response.json();

    return {
      content: data.candidates[0].content.parts[0].text,
      model: request.model,
      usage: {
        promptTokens: 0, // Google doesn't provide token usage
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }
}