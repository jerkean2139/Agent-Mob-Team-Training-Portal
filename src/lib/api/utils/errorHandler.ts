import { ApiError } from './errors';
import { ERROR_CODES } from '../config';

export function handleApiError(error: unknown): never {
  if (error instanceof ApiError) {
    // Handle known API errors
    switch (error.code) {
      case ERROR_CODES.UNAUTHORIZED:
        throw new ApiError('auth/unauthorized', 'Please sign in to continue');
      case ERROR_CODES.NOT_FOUND:
        throw new ApiError('resource/not-found', 'The requested resource was not found');
      case ERROR_CODES.VALIDATION:
        throw new ApiError('validation/error', 'Invalid request data');
      default:
        throw error;
    }
  }

  // Handle unknown errors
  throw new ApiError(
    ERROR_CODES.SERVER_ERROR,
    'An unexpected error occurred'
  );
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof Error && 
    (error.message.includes('Failed to fetch') || 
     error.message.includes('Network request failed'));
}