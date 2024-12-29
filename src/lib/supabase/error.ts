export class SupabaseError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'SupabaseError';
  }
}

export function handleSupabaseError(error: any): Error {
  console.error('Supabase error:', error);
  
  // Network errors
  if (error?.message?.includes('Failed to fetch')) {
    return new SupabaseError(
      'Connection failed. Please check your internet connection and try again.',
      { code: 'NETWORK_ERROR' }
    );
  }
  
  // Database errors
  if (error?.code === 'PGRST301') {
    return new SupabaseError(
      'Database connection failed. Please try again later.',
      { code: 'DB_ERROR' }
    );
  }

  // Authentication errors
  if (error?.message?.includes('JWT')) {
    return new SupabaseError(
      'Your session has expired. Please sign in again.',
      { code: 'AUTH_ERROR' }
    );
  }

  // Rate limiting
  if (error?.message?.includes('429')) {
    return new SupabaseError(
      'Too many requests. Please try again later.',
      { code: 'RATE_LIMIT' }
    );
  }

  // Generic error with details
  return new SupabaseError(
    error?.message || 'An unexpected error occurred',
    error?.details || { code: 'UNKNOWN' }
  );
}