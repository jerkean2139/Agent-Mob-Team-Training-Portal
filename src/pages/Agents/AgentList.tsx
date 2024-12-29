import React from 'react';
import { Bot } from 'lucide-react';
import { Agent } from '../../types';
import { useAgents } from '../../hooks/useAgents';
import AgentCard from './AgentCard';

interface AgentListProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export default function AgentList({ onSelect, selectedId }: AgentListProps) {
  const { agents, loading } = useAgents();

  if (loading) {
    return <div className="p-4">Loading agents...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Active Agents
        </h2>
      </div>
      <div className="divide-y">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            selected={agent.id === selectedId}
            onClick={() => onSelect(agent.id)}
          />
        ))}
      </div>
    </div>
  );
}