import { AuthError, AUTH_ERROR_CODES } from './types';

export function handleAuthError(error: unknown): AuthError {
  if (error instanceof AuthError) return error;

  const message = error instanceof Error ? error.message : 'Unknown error occurred';

  // Handle specific error cases
  if (message.includes('Invalid login credentials')) {
    return new AuthError(
      'Invalid email or password',
      AUTH_ERROR_CODES.INVALID_CREDENTIALS
    );
  }

  if (message.includes('Failed to fetch')) {
    return new AuthError(
      'Network connection failed',
      AUTH_ERROR_CODES.NETWORK_ERROR
    );
  }

  if (message.includes('JWT')) {
    return new AuthError(
      'Session expired. Please sign in again.',
      AUTH_ERROR_CODES.SESSION_EXPIRED
    );
  }

  return new AuthError(message, AUTH_ERROR_CODES.UNKNOWN, error);
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}