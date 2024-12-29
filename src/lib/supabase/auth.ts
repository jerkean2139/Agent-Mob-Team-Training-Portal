import { supabase } from './client';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// Auto-login function for development
export async function autoLogin() {
  if (import.meta.env.DEV) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        await signIn('test@client.com', 'testpassword123');
      }
    } catch (error) {
      console.error('Auto-login failed:', error);
    }
  }
}