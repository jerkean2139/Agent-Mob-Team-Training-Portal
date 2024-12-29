import React from 'react';
import { Brain, Briefcase, BookOpen } from 'lucide-react';

interface PromptEditorProps {
  type: 'personality' | 'job' | 'knowledge';
  content: string;
  onChange: (content: string) => void;
}

export default function PromptEditor({ type, content, onChange }: PromptEditorProps) {
  const config = {
    personality: {
      icon: Brain,
      title: 'Personality & Style',
      description: 'Define personality traits and communication style'
    },
    job: {
      icon: Briefcase,
      title: 'Job Description',
      description: 'Specify role, responsibilities, and objectives'
    },
    knowledge: {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Define knowledge domains and learning approach'
    }
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-primary" />
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-48 p-4 font-mono text-sm bg-gray-50 border rounded-lg focus:ring-primary focus:border-primary"
        placeholder={`Enter ${title.toLowerCase()} prompt...`}
      />
    </div>
  );
}