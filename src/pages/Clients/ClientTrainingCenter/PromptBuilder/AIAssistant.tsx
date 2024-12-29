import React from 'react';
import { Wand2 } from 'lucide-react';
import { generatePrompt } from '../../../../lib/openai';

interface AIAssistantProps {
  onPromptGenerated: (prompt: string) => void;
}

export default function AIAssistant({ onPromptGenerated }: AIAssistantProps) {
  const [context, setContext] = React.useState('');
  const [type, setType] = React.useState<'personality' | 'job' | 'knowledge'>('personality');
  const [loading, setLoading] = React.useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generatePrompt({
        type,
        context,
        requirements: []
      });
      onPromptGenerated(result.prompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prompt Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="personality">Personality & Style</option>
          <option value="job">Job Description</option>
          <option value="knowledge">Knowledge Instructions</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Context
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="Describe what you want the prompt to achieve..."
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !context}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        <Wand2 className="w-4 h-4" />
        {loading ? 'Generating...' : 'Generate Prompt'}
      </button>
    </div>
  );
}