import React from 'react';
import { Edit2, Save, ArrowRight } from 'lucide-react';
import type { PromptData } from '../../../lib/prompts/promptBuilder';

interface PromptPreviewProps {
  prompt: string;
  type: PromptData['type'];
  onEdit: () => void;
  onSave: () => void;
  onContinue: () => void;
  saving: boolean;
  saved: boolean;
}

export default function PromptPreview({ 
  prompt, 
  type, 
  onEdit, 
  onSave, 
  onContinue,
  saving,
  saved 
}: PromptPreviewProps) {
  const isLast = type === 'knowledge';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Generated Prompt</h3>
        <div className="text-sm text-gray-500">
          {saved ? 'Prompt saved successfully' : 'Review and save your prompt'}
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border">
        <pre className="whitespace-pre-wrap font-mono text-sm">{prompt}</pre>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <Edit2 className="w-4 h-4" />
          Edit Answers
        </button>

        {!saved ? (
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Prompt'}
          </button>
        ) : !isLast ? (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Continue to Next Prompt
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}