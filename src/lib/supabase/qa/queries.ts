import { supabase } from '../client';
import type { QA } from '../../../types';

export async function fetchAgentQAs(agentId: string): Promise<QA[]> {
  if (!agentId) throw new Error('Agent ID is required');

  try {
    const { data, error } = await supabase
      .from('agent_qa')
      .select('*')
      .eq('agent_id', agentId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching QAs:', error);
    throw new Error('Failed to fetch Q&As');
  }
}

export async function addQA(agentId: string, data: { question: string; answer: string }): Promise<QA> {
  if (!agentId) throw new Error('Agent ID is required');
  if (!data.question?.trim() || !data.answer?.trim()) {
    throw new Error('Question and answer are required');
  }

  try {
    const { data: qa, error } = await supabase
      .from('agent_qa')
      .insert([{
        agent_id: agentId,
        question: data.question.trim(),
        answer: data.answer.trim(),
        status: 'active',
        name: `Q&A: ${data.question.slice(0, 50)}...`
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('This question already exists for this agent');
      }
      throw error;
    }
    
    if (!qa) throw new Error('Failed to create Q&A');
    return qa;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Failed to create Q&A');
  }
}

export async function updateQA(id: string, data: { question: string; answer: string }): Promise<QA> {
  if (!id) throw new Error('Q&A ID is required');
  if (!data.question?.trim() || !data.answer?.trim()) {
    throw new Error('Question and answer are required');
  }

  try {
    const { data: updated, error } = await supabase
      .from('agent_qa')
      .update({
        question: data.question.trim(),
        answer: data.answer.trim(),
        name: `Q&A: ${data.question.slice(0, 50)}...`,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('This question already exists for this agent');
      }
      throw error;
    }
    
    if (!updated) throw new Error('Q&A not found');
    return updated;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Failed to update Q&A');
  }
}

export async function archiveQA(id: string): Promise<void> {
  if (!id) throw new Error('Q&A ID is required');

  try {
    const { error } = await supabase
      .from('agent_qa')
      .update({ 
        status: 'archived',
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error archiving QA:', error);
    throw new Error('Failed to archive Q&A');
  }
}