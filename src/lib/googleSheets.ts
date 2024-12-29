import { supabase } from './supabase';

interface SheetConfig {
  spreadsheetId: string;
  ranges: string[];
  mappings: Record<string, string>;
}

export async function connectGoogleSheet(clientId: string, config: SheetConfig) {
  // Implementation will use Google Sheets API
  // This is a placeholder until we have the actual API integration
  const { data, error } = await supabase
    .from('client_resources')
    .insert([{
      client_id: clientId,
      type: 'sheet',
      name: 'Google Sheet Connection',
      metadata: config
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}