import { createClient } from '@supabase/supabase-js';

// API configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  timeout: 30000, // 30 seconds
};

// Create Supabase client
export const supabase = createClient(API_CONFIG.baseUrl, API_CONFIG.anonKey);

// API endpoints mapping to Supabase tables/functions
export const ENDPOINTS = {
  agents: 'agents',
  training: 'agent_training_progress',
  messages: 'agent_messages',
  prompts: 'agent_prompts'
} as const;

// Error codes
export const ERROR_CODES = {
  UNAUTHORIZED: 'auth/unauthorized',
  NOT_FOUND: 'resource/not-found',
  VALIDATION: 'validation/error',
  SERVER_ERROR: 'server/error'
} as const;