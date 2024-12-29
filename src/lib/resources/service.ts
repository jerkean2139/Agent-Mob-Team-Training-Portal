import { supabase } from '../supabase';

export async function createResource(data: {
  client_id: string;
  type: string;
  name: string;
  content?: string;
  metadata?: Record<string, any>;
}) {
  const { data: resource, error } = await supabase
    .from('client_resources')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return resource;
}

export async function getResources(clientId: string, type?: string) {
  let query = supabase
    .from('client_resources')
    .select('*')
    .eq('client_id', clientId);
  
  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}