export class SupabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'SupabaseError';
  }

  static fromError(error: unknown): SupabaseError {
    if (error instanceof SupabaseError) return error;

    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Handle specific error cases
    if (message.includes('Failed to fetch')) {
      return new SupabaseError(
        'Network connection failed',
        'network_error'
      );
    }

    if (message.includes('JWT')) {
      return new SupabaseError(
        'Authentication failed',
        'auth_error'
      );
    }

    return new SupabaseError(message, 'unknown_error', error);
  }
}