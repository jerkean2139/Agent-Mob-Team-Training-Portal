import { supabase } from './supabase/client';
import type { AuthError, User } from '@supabase/supabase-js';

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { user: data.user, error };
  } catch (err) {
    return { user: null, error: err as AuthError };
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: err as AuthError };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}