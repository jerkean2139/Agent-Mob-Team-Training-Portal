import { supabase } from './client';
import type { QA } from '../../types';

export async function addQA(agentId: string, data: { question: string; answer: string }): Promise<QA> {
  const { data: qa, error } = await supabase
    .from('agent_qa')
    .insert([{
      agent_id: agentId,
      question: data.question,
      answer: data.answer,
      status: 'active',
      name: `Q&A: ${data.question.slice(0, 50)}...`
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding QA:', error);
    throw new Error('Failed to create Q&A');
  }
  if (!qa) throw new Error('Failed to create Q&A');

  return qa;
}

export async function updateQA(
  agentId: string, 
  qaId: string, 
  data: { question: string; answer: string }
): Promise<QA> {
  const { data: updated, error } = await supabase
    .from('agent_qa')
    .update({
      question: data.question,
      answer: data.answer,
      name: `Q&A: ${data.question.slice(0, 50)}...`,
      updated_at: new Date().toISOString()
    })
    .eq('id', qaId)
    .eq('agent_id', agentId)
    .select()
    .single();

  if (error) {
    console.error('Error updating QA:', error);
    throw new Error('Failed to update Q&A');
  }
  if (!updated) throw new Error('Q&A not found');

  return updated;
}

export async function archiveQA(agentId: string, qaId: string): Promise<void> {
  const { error } = await supabase
    .from('agent_qa')
    .update({ 
      status: 'archived',
      updated_at: new Date().toISOString()
    })
    .eq('id', qaId)
    .eq('agent_id', agentId);

  if (error) {
    console.error('Error archiving QA:', error);
    throw new Error('Failed to archive Q&A');
  }
}