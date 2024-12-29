import React from 'react';
import { Bot } from 'lucide-react';
import { useAgentCount } from '../../hooks/useAgentCount';

export default function AgentCount() {
  const { count, loading } = useAgentCount();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Bot className="w-5 h-5" />
        <span>Loading agents...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Bot className="w-5 h-5 text-primary" />
      <span className="font-medium">
        {count === 1 ? '1 Agent' : `${count} Agent Mob`}
      </span>
    </div>
  );
}