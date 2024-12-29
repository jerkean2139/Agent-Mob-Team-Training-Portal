import React from 'react';
import { Wand2 } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../../../../../../../../lib/prompts/templates';

interface PromptTemplatesProps {
  agentName: string;
  onApplyTemplate: (type: string, content: string) => void;
}

export default function PromptTemplates({ agentName, onApplyTemplate }: PromptTemplatesProps) {
  const templates = PROMPT_TEMPLATES[agentName.toLowerCase()] || {};

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-gray-900">Quick Templates</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(templates).map(([type, content]) => (
          <button
            key={type}
            onClick={() => onApplyTemplate(type, content)}
            className="p-3 text-left bg-white rounded-lg border hover:border-primary/50 transition-colors"
          >
            <h4 className="font-medium text-gray-900 capitalize mb-1">
              {type.replace('_', ' ')}
            </h4>
            <p className="text-sm text-gray-500 line-clamp-2">
              {typeof content === 'string' ? content : 'Template available'}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}