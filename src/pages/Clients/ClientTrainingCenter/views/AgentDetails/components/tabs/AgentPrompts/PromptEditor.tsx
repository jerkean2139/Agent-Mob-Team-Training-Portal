import React from 'react';
import { Brain } from 'lucide-react';

interface PromptEditorProps {
  title: string;
  description: string;
  content: string;
  onChange: (value: string) => void;
}

export default function PromptEditor({ title, description, content, onChange }: PromptEditorProps) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Brain className="w-5 h-5 text-primary" />
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary font-mono text-sm"
        placeholder={`Enter ${title.toLowerCase()} prompt...`}
      />
    </div>
  );
}