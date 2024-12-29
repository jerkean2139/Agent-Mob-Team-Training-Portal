import React from 'react';
import { Wand2 } from 'lucide-react';

interface PromptListProps {
  prompts: Array<{
    id: string;
    metadata: {
      title: string;
      content: string;
      type: string;
    };
    created_at: string;
  }>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PromptList({ prompts, onEdit, onDelete }: PromptListProps) {
  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <div key={prompt.id} className="bg-white p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            <Wand2 className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{prompt.metadata.title}</h4>
                <span className="text-sm text-primary">{prompt.metadata.type}</span>
              </div>
              <p className="mt-2 text-gray-600">{prompt.metadata.content}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => onEdit(prompt.id)}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(prompt.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}