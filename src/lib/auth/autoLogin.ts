import { supabase } from '../supabase/client';
import { withRetry } from '../utils/retry';

const TEST_EMAIL = 'test@client.com';
const TEST_PASSWORD = 'testpassword123';

export async function autoLogin() {
  // Only run in development
  if (!import.meta.env.DEV) {
    return false;
  }

  try {
    // Check if already logged in
    const { data: { user }, error: userError } = await withRetry(
      () => supabase.auth.getUser(),
      { 
        retries: 3,
        delay: 1000,
        shouldRetry: (error) => {
          // Only retry network errors
          return error instanceof Error && error.message.includes('Failed to fetch');
        }
      }
    );

    if (userError) {
      console.warn('Error checking user session:', userError);
      return false;
    }
    
    if (user) {
      return true;
    }

    // Attempt login
    const { error: signInError } = await withRetry(
      () => supabase.auth.signInWithPassword({
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      }),
      { retries: 2 }
    );

    if (signInError) {
      // If login fails, try to create test user
      const { error: signUpError } = await withRetry(
        () => supabase.auth.signUp({
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
          options: {
            data: {
              name: 'Test User'
            }
          }
        }),
        { retries: 2 }
      );

      if (signUpError) {
        console.warn('Failed to create test user:', signUpError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.warn('Auto-login failed:', error);
    return false;
  }
}