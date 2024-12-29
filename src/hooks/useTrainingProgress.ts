import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface TrainingProgress {
  id: string;
  agent_id: string;
  stage: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export function useTrainingProgress(agentId: string) {
  const [progress, setProgress] = useState<TrainingProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const { data, error: queryError } = await supabase
          .from('agent_training_progress')
          .select('*')
          .eq('agent_id', agentId)
          .order('created_at', { ascending: true });

        if (queryError) throw queryError;
        setProgress(data || []);
      } catch (err) {
        console.error('Error fetching training progress:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch training progress'));
      } finally {
        setLoading(false);
      }
    }

    if (agentId) {
      fetchProgress();
    }
  }, [agentId]);

  const updateProgress = async (stage: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('agent_training_progress')
        .upsert([{
          agent_id: agentId,
          stage,
          completed,
          completed_at: completed ? new Date().toISOString() : null
        }]);

      if (error) throw error;

      // Refresh progress
      const { data, error: refreshError } = await supabase
        .from('agent_training_progress')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: true });

      if (refreshError) throw refreshError;
      setProgress(data || []);
    } catch (err) {
      console.error('Error updating progress:', err);
      throw err;
    }
  };

  return { progress, loading, error, updateProgress };
}