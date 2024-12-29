import { supabase } from './supabase';

const MAX_DOCS_PER_AGENT = 50;

export async function uploadDocument(clientId: string, file: File) {
  // Check document count
  const { count } = await supabase
    .from('client_resources')
    .select('*', { count: 'exact' })
    .eq('client_id', clientId)
    .eq('type', 'document');

  if (count >= MAX_DOCS_PER_AGENT) {
    throw new Error(`Maximum document limit (${MAX_DOCS_PER_AGENT}) reached`);
  }

  // Upload document logic here
  // This is a placeholder until we implement actual file upload
  const { data, error } = await supabase
    .from('client_resources')
    .insert([{
      client_id: clientId,
      type: 'document',
      name: file.name,
      metadata: {
        size: file.size,
        type: file.type
      }
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}