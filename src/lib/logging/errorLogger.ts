import { supabase } from '../supabase';

export interface ErrorLog {
  id: string;
  error_message: string;
  stack_trace?: string;
  component?: string;
  user_id?: string;
  screenshot_url?: string;
  status: 'new' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export async function logError(error: Error, component?: string) {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    const { data, error: logError } = await supabase
      .from('error_logs')
      .insert([{
        error_message: error.message,
        stack_trace: error.stack,
        component,
        user_id: user.user?.id,
        status: 'new',
        priority: 'medium'
      }])
      .select()
      .single();

    if (logError) throw logError;
    return data;
  } catch (err) {
    console.error('Failed to log error:', err);
    throw err;
  }
}

export async function updateErrorStatus(
  errorId: string, 
  status: ErrorLog['status']
) {
  const { error } = await supabase
    .from('error_logs')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', errorId);

  if (error) throw error;
}

export async function addErrorScreenshot(
  errorId: string, 
  screenshot: File
) {
  try {
    const fileName = `error-screenshots/${errorId}/${screenshot.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from('error-logs')
      .upload(fileName, screenshot);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('error-logs')
      .getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from('error_logs')
      .update({ screenshot_url: publicUrl })
      .eq('id', errorId);

    if (updateError) throw updateError;
  } catch (err) {
    console.error('Failed to upload screenshot:', err);
    throw err;
  }
}