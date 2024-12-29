import React from 'react';
import { supabase } from '../../lib/supabase/client';
import { autoLogin } from '../../lib/auth/autoLogin';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        // Initial session check
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (mounted) {
          setUser(session?.user ?? null);
          setError(null);
        }

        // Try auto-login in development
        if (!session?.user && import.meta.env.DEV) {
          await autoLogin();
        }
      } catch (err) {
        console.warn('Auth initialization error:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Authentication failed'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    // Initialize auth
    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}