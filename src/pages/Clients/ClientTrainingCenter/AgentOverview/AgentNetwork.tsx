import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';
import { Agent } from '../../../../types';

interface AgentNetworkProps {
  agents: Agent[];
  onSelect: (id: string) => void;
}

export default function AgentNetwork({ agents, onSelect }: AgentNetworkProps) {
  return (
    <div className="relative p-8 bg-gray-50 rounded-lg overflow-x-auto">
      <div className="flex items-center justify-start gap-8 min-w-max">
        {agents.map((agent, index) => (
          <div key={agent.id} className="relative">
            <button
              onClick={() => onSelect(agent.id)}
              className="group flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2 text-center">
                <p className="font-medium text-gray-900">{agent.name}</p>
                <p className="text-sm text-gray-500">{agent.role}</p>
              </div>
            </button>
            {index < agents.length - 1 && (
              <ArrowRight className="absolute top-8 -right-6 w-4 h-4 text-primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}