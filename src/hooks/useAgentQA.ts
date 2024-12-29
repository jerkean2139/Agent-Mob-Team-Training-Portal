import React from 'react';
import type { QA } from '../types';
import { useSupabase } from './useSupabase';
import * as qaApi from '../lib/supabase/qa/queries';

export function useAgentQA(agentId: string) {
  const [items, setItems] = React.useState<QA[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const { error: dbError } = useSupabase();

  const fetchQAs = React.useCallback(async () => {
    if (!agentId) {
      setError(new Error('Agent ID is required'));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await qaApi.fetchAgentQAs(agentId);
      setItems(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching QAs:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch Q&As'));
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  React.useEffect(() => {
    if (!dbError && agentId) {
      fetchQAs();
    }
  }, [dbError, agentId, fetchQAs]);

  const addQA = async (question: string, answer: string) => {
    if (!agentId) throw new Error('Agent ID is required');
    if (!question?.trim() || !answer?.trim()) {
      throw new Error('Question and answer are required');
    }

    try {
      const newQA = await qaApi.addQA(agentId, { question, answer });
      setItems(prev => [newQA, ...prev]);
      return newQA;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Failed to create Q&A');
    }
  };

  const editQA = async (id: string, data: { question: string; answer: string }) => {
    if (!id) throw new Error('Q&A ID is required');
    if (!data.question?.trim() || !data.answer?.trim()) {
      throw new Error('Question and answer are required');
    }

    try {
      const updatedQA = await qaApi.updateQA(id, data);
      setItems(prev => prev.map(item => item.id === id ? updatedQA : item));
      return updatedQA;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Failed to update Q&A');
    }
  };

  const removeQA = async (id: string) => {
    if (!id) throw new Error('Q&A ID is required');

    try {
      await qaApi.archiveQA(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Failed to remove Q&A');
    }
  };

  return {
    items,
    loading,
    error: error || dbError,
    addQA,
    editQA,
    removeQA,
    refresh: fetchQAs
  };
}