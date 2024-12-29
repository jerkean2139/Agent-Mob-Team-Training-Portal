import type { ApiErrorResponse } from '../types';

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(error: ApiErrorResponse): ApiError {
    return new ApiError(error.code, error.message, error.details);
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}