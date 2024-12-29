import React from 'react';
import { Brain, Briefcase, BookOpen, Check } from 'lucide-react';
import type { PromptData } from '../../../lib/prompts/promptBuilder';

interface PromptProgressProps {
  currentType: PromptData['type'] | null;
}

export default function PromptProgress({ currentType }: PromptProgressProps) {
  const steps = [
    { type: 'personality', icon: Brain, label: 'Personality' },
    { type: 'job', icon: Briefcase, label: 'Job' },
    { type: 'knowledge', icon: BookOpen, label: 'Knowledge' }
  ];

  const currentIndex = currentType ? steps.findIndex(s => s.type === currentType) : -1;

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <React.Fragment key={step.type}>
            {index > 0 && (
              <div className={`h-px w-8 ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
            <div className={`flex items-center gap-1 ${
              isCurrent ? 'text-primary' : isCompleted ? 'text-green-500' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCurrent ? 'bg-primary/10' : isCompleted ? 'bg-green-50' : 'bg-gray-50'
              }`}>
                {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className="text-sm font-medium">{step.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}