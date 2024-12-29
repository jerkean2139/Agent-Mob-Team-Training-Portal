export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
}

export interface CompletionRequest {
  messages: Message[];
  model: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface CompletionResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface StreamingResponse {
  content: string;
  done: boolean;
}

export interface LLMProvider {
  complete(request: CompletionRequest): Promise<CompletionResponse>;
  streamComplete?(request: CompletionRequest): AsyncGenerator<StreamingResponse, void, unknown>;
}