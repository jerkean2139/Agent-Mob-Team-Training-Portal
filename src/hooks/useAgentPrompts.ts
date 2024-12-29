import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AgentPrompt {
  id: string;
  agent_id: string;
  type: 'personality' | 'job' | 'knowledge';
  content: string;
  created_at: string;
  updated_at: string;
}

export function useAgentPrompts(agentId: string) {
  const [prompts, setPrompts] = useState<AgentPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchPrompts();
  }, [agentId]);

  const fetchPrompts = async () => {
    try {
      const { data, error: queryError } = await supabase
        .from('agent_prompts')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;
      setPrompts(data || []);
    } catch (err) {
      console.error('Error fetching prompts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch prompts'));
    } finally {
      setLoading(false);
    }
  };

  const savePrompt = async (type: AgentPrompt['type'], content: string) => {
    try {
      const existing = prompts.find(p => p.type === type);
      
      if (existing) {
        const { error } = await supabase
          .from('agent_prompts')
          .update({ 
            content,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('agent_prompts')
          .insert([{
            agent_id: agentId,
            type,
            content
          }]);
        
        if (error) throw error;
      }

      // Refresh prompts after saving
      await fetchPrompts();
    } catch (err) {
      console.error('Error saving prompt:', err);
      throw err;
    }
  };

  return { prompts, loading, error, savePrompt };
}