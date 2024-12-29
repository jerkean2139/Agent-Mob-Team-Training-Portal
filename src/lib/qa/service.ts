import { supabase } from '../supabase';
import type { QA } from './types';

export async function createQA(data: Omit<QA, 'id' | 'created_at' | 'updated_at'>) {
  const { data: qa, error } = await supabase
    .from('agent_qa')
    .insert([{
      agent_id: data.agentId,
      question: data.question,
      answer: data.answer,
      status: data.status,
      name: `Q&A: ${data.question.slice(0, 50)}...`
    }])
    .select()
    .single();

  if (error) throw error;
  return qa;
}

export async function getQAsByAgent(agentId: string) {
  if (!agentId) throw new Error('Agent ID is required');

  const { data, error } = await supabase
    .from('agent_qa')
    .select('*')
    .eq('agent_id', agentId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateQA(id: string, data: Partial<QA>) {
  const { data: qa, error } = await supabase
    .from('agent_qa')
    .update({
      question: data.question,
      answer: data.answer,
      status: data.status,
      name: data.question ? `Q&A: ${data.question.slice(0, 50)}...` : undefined,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return qa;
}

export async function deleteQA(id: string) {
  const { error } = await supabase
    .from('agent_qa')
    .update({ 
      status: 'archived',
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) throw error;
}