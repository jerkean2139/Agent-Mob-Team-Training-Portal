import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

export function useAgentCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAgentCount() {
      try {
        const { count, error } = await supabase
          .from('agents')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        setCount(count || 0);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch agent count'));
      } finally {
        setLoading(false);
      }
    }

    fetchAgentCount();
  }, []);

  return { count, loading, error };
}