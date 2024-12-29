export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'auth/invalid-credentials',
  NETWORK_ERROR: 'auth/network-error',
  SESSION_EXPIRED: 'auth/session-expired',
  UNKNOWN: 'auth/unknown-error'
} as const;