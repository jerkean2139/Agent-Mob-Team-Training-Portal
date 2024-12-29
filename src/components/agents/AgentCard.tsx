import React from 'react';
import type { Agent } from '../../types';
import AgentAvatar from './AgentAvatar';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
  return (
    <button
      onClick={onClick}
      className="text-left p-6 rounded-lg border hover:border-primary/50 transition-all group bg-white hover:shadow-lg w-full"
    >
      <div className="flex items-center gap-4 mb-4">
        <AgentAvatar agent={agent} size="lg" />
        <div>
          <h3 className="font-medium text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {agent.primary_skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </button>
  );
}