import { supabase } from './supabase';

interface ClaudeResponse {
  content: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
  };
}

export async function generatePrompt(context: {
  clientData: any;
  requirements: string;
  existingPrompts?: string[];
}): Promise<ClaudeResponse> {
  // Implementation will connect to Claude.ai API
  // This is a placeholder until we have the actual API integration
  return {
    content: "Generated prompt based on context",
    usage: {
      prompt_tokens: 100,
      completion_tokens: 150
    }
  };
}

export async function saveToPromptLibrary(prompt: {
  title: string;
  content: string;
  category: string;
  tags?: string[];
}) {
  const { data, error } = await supabase
    .from('prompt_library')
    .insert([prompt])
    .select()
    .single();

  if (error) throw error;
  return data;
}