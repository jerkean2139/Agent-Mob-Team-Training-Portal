import React from 'react';
import { Brain, Briefcase, BookOpen } from 'lucide-react';

interface PromptTypeSelectorProps {
  onSelect: (type: 'personality' | 'job' | 'knowledge') => void;
}

export default function PromptTypeSelector({ onSelect }: PromptTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Which type of prompt would you like to build?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onSelect('personality')}
          className="p-6 text-left border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors group"
        >
          <Brain className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="font-medium mb-2">Personality & Style</h4>
          <p className="text-sm text-gray-600">Define the agent's personality traits and communication style</p>
        </button>

        <button
          onClick={() => onSelect('job')}
          className="p-6 text-left border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors group"
        >
          <Briefcase className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="font-medium mb-2">Job Description</h4>
          <p className="text-sm text-gray-600">Specify the agent's role, responsibilities, and objectives</p>
        </button>

        <button
          onClick={() => onSelect('knowledge')}
          className="p-6 text-left border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors group"
        >
          <BookOpen className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="font-medium mb-2">Knowledge Base</h4>
          <p className="text-sm text-gray-600">Define the agent's knowledge domains and learning approach</p>
        </button>
      </div>
    </div>
  );
}