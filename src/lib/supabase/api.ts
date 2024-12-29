import { supabase } from './client';
import type { Client, ClientTeam } from '../../types';

export async function createClient(data: Partial<Client>) {
  const { data: client, error } = await supabase
    .from('clients')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return client;
}

export async function createClientTeam(data: Partial<ClientTeam>) {
  const { data: team, error } = await supabase
    .from('client_teams')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return team;
}

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select(`
      *,
      client_teams (*),
      client_resources (*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}