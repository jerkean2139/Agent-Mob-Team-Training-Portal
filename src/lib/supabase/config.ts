// Environment validation
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('Missing Supabase environment variables');
}

export const SUPABASE_CONFIG = {
  url: SUPABASE_URL || '',
  key: SUPABASE_KEY || '',
  options: {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      storage: localStorage
    }
  }
};