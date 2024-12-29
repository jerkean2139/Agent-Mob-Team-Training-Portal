import { useState, useEffect } from 'react';
import { Agent } from '../types';
import { supabase } from '../lib/supabase';
import { handleSupabaseError } from '../lib/supabase/error';

export function useAgents(clientId?: string) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second

    async function fetchAgents() {
      try {
        let query = supabase
          .from('agents')
          .select('*')
          .order('display_order', { ascending: true });

        if (clientId) {
          query = query.eq('client_id', clientId);
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;
        if (mounted) {
          setAgents(data || []);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching agents:', err);
        
        if (mounted) {
          // Retry on network errors
          if (retryCount < MAX_RETRIES && 
              err instanceof Error && 
              err.message.includes('Failed to fetch')) {
            retryCount++;
            setTimeout(fetchAgents, RETRY_DELAY * retryCount); // Exponential backoff
            return;
          }
          
          setError(handleSupabaseError(err));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchAgents();

    return () => {
      mounted = false;
    };
  }, [clientId]);

  return { agents, loading, error };
}