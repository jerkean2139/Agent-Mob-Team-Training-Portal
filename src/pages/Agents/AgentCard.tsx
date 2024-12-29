import React from 'react';
import { Agent } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface AgentCardProps {
  agent: Agent;
  selected: boolean;
  onClick: () => void;
}

export default function AgentCard({ agent, selected, onClick }: AgentCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors ${
        selected ? 'bg-primary/10' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
        <span className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(agent.created_at), { addSuffix: true })}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {agent.primary_skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}