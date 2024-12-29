import { supabase } from './supabase';

interface GHLConfig {
  apiKey: string;
  locationId: string;
  webhookUrl?: string;
}

export async function connectGHL(clientId: string, config: GHLConfig) {
  const { data, error } = await supabase
    .from('clients')
    .update({
      integration_configs: {
        ...config,
        provider: 'ghl',
        connected: true
      }
    })
    .eq('id', clientId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function syncGHLContacts(clientId: string) {
  // Implementation will fetch contacts from GHL API
  // This is a placeholder until we implement the actual API calls
  return [];
}