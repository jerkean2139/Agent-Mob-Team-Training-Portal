import { supabase } from '../supabase';
import { AuthError } from './types';
import { handleAuthError } from './utils';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw handleAuthError(error);
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw handleAuthError(error);
  return user;
}