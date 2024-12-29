import { supabase } from './supabase';

interface GeneratePromptResponse {
  prompt: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
  };
}

export async function generatePrompt(input: {
  type: 'personality' | 'job' | 'knowledge';
  context: string;
  requirements?: string[];
}): Promise<GeneratePromptResponse> {
  try {
    // Call OpenAI API through Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('generate-prompt', {
      body: JSON.stringify(input)
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw new Error('Failed to generate prompt');
  }
}