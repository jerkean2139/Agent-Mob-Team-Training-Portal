import React from 'react';
import type { Agent } from '../../../types';
import AgentCard from './AgentCard';

interface AgentGridProps {
  agents: Agent[];
  onSelectAgent: (id: string) => void;
}

export default function AgentGrid({ agents, onSelectAgent }: AgentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onClick={() => onSelectAgent(agent.id)}
        />
      ))}
    </div>
  );
}