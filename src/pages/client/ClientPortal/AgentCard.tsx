import React from 'react';
import { Bot } from 'lucide-react';
import type { Agent } from '../../../types';
import AgentDocuments from './AgentDocuments';

interface AgentCardProps {
  agent: Agent;
  clientId: string;
}

export default function AgentCard({ agent, clientId }: AgentCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="p-4 border-t bg-gray-50">
          <AgentDocuments agent={agent} clientId={clientId} />
        </div>
      )}
    </div>
  );
}