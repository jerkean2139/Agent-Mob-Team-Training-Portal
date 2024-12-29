import { supabase } from '../supabase';

const SHEET_HEADERS = ['Timestamp', 'Client', 'User', 'Question'];

export async function syncDonnaLogsToSheets(clientId: string) {
  try {
    // Fetch logs
    const { data: logs, error } = await supabase
      .from('donna_logs')
      .select(`
        *,
        clients (name),
        auth.users (email)
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Format data for sheets
    const rows = logs.map(log => [
      new Date(log.created_at).toISOString(),
      log.clients?.name || 'Unknown Client',
      log.users?.email || 'Unknown User',
      log.question
    ]);

    // Call Supabase Edge Function to sync with Google Sheets
    const { error: syncError } = await supabase.functions.invoke('sync-donna-logs', {
      body: { rows, headers: SHEET_HEADERS }
    });

    if (syncError) throw syncError;
  } catch (error) {
    console.error('Error syncing logs to sheets:', error);
    throw error;
  }
}