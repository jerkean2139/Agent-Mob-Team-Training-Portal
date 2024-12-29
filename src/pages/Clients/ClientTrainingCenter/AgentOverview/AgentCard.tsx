import React from 'react';
import { Bot, Star } from 'lucide-react';
import { Agent } from '../../../../types';
import { clsx } from 'clsx';

interface AgentCardProps {
  agent: Agent;
  isPrimary?: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

export default function AgentCard({ agent, isPrimary, onSelect, className }: AgentCardProps) {
  return (
    <div 
      onClick={() => onSelect(agent.id)}
      className={clsx(
        'relative p-4 rounded-lg border transition-all cursor-pointer',
        isPrimary ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5' : 'border-gray-200 hover:border-primary/50',
        className
      )}
    >
      {isPrimary && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={clsx(
          'w-12 h-12 rounded-full flex items-center justify-center',
          isPrimary ? 'bg-primary/20' : 'bg-gray-100'
        )}>
          <Bot className={clsx('w-6 h-6', isPrimary ? 'text-primary' : 'text-gray-600')} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {agent.primary_skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className={clsx(
                  'px-2 py-1 text-xs rounded-full',
                  isPrimary ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}