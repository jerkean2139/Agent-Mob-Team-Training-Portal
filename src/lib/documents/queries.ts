import { supabase } from '../supabase/client';
import type { Document } from './types';
import { MAX_DOCUMENTS_PER_AGENT } from './types';

export async function getDocumentCount(agentId: string): Promise<number> {
  const { count, error } = await supabase
    .from('agent_documents')
    .select('*', { count: 'exact', head: true })
    .eq('agent_id', agentId);

  if (error) throw error;
  return count || 0;
}

export async function uploadDocument(
  file: File,
  agentId: string,
  clientId: string
): Promise<Document> {
  // Check document count
  const count = await getDocumentCount(agentId);
  if (count >= MAX_DOCUMENTS_PER_AGENT) {
    throw new Error(`Maximum document limit (${MAX_DOCUMENTS_PER_AGENT}) reached for this agent`);
  }

  // Upload file to storage
  const fileExt = file.name.split('.').pop();
  const filePath = `${clientId}/${agentId}/${Date.now()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('agent-documents')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('agent-documents')
    .getPublicUrl(filePath);

  // Create document record
  const { data, error } = await supabase
    .from('agent_documents')
    .insert([{
      agent_id: agentId,
      client_id: clientId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: publicUrl
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDocuments(agentId: string): Promise<Document[]> {
  const { data, error } = await supabase
    .from('agent_documents')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function deleteDocument(id: string): Promise<void> {
  const { error } = await supabase
    .from('agent_documents')
    .delete()
    .eq('id', id);

  if (error) throw error;
}