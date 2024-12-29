import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Client } from '../types';

export function useClient(clientId: string) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchClient() {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select(`
            *,
            client_teams (*),
            client_resources (*),
            workflows (*)
          `)
          .eq('id', clientId)
          .single();

        if (error) throw error;
        setClient(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  return { client, loading, error };
}