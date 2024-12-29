// Common API types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Agent-specific types
export interface AgentMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'agent';
  metadata?: Record<string, unknown>;
}

export interface AgentCommand {
  type: 'start' | 'stop' | 'pause' | 'resume';
  parameters?: Record<string, unknown>;
}