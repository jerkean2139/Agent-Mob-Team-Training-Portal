import { createClient } from '@supabase/supabase-js';

// Environment validation
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing required Supabase environment variables');
}

// Create singleton client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Auth configuration
export const AUTH_CONFIG = {
  redirectTo: `${window.location.origin}/auth/callback`,
  providers: ['email'] as const,
  defaultProvider: 'email' as const
};