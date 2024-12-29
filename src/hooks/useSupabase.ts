import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client';

export function useSupabase() {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test the connection with a simple query instead of health_check
        const { error } = await supabase
          .from('agents')
          .select('count', { count: 'exact', head: true });
          
        if (error) throw error;
        setError(null);
      } catch (err) {
        console.error('Supabase connection error:', err);
        setError(err instanceof Error ? err : new Error('Failed to connect to Supabase'));
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return { error, loading };
}