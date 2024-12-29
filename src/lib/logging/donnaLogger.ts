import { supabase } from '../supabase';

interface LogQuestionParams {
  clientId: string;
  question: string;
  sessionId: string;
}

export async function logDonnaQuestion({ 
  clientId, 
  question, 
  sessionId 
}: LogQuestionParams) {
  try {
    const { data, error } = await supabase
      .rpc('log_donna_question', {
        p_client_id: clientId,
        p_question: question,
        p_session_id: sessionId
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error logging question:', error);
    throw error;
  }
}