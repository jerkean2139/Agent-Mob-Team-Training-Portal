import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ClientResource } from '../types';

export function useClientResources(clientId: string, type?: string) {
  const [resources, setResources] = useState<ClientResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        let query = supabase
          .from('client_resources')
          .select('*')
          .eq('client_id', clientId);
        
        if (type) {
          query = query.eq('type', type);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setResources(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (clientId) {
      fetchResources();
    }
  }, [clientId, type]);

  return { resources, loading, error };
}