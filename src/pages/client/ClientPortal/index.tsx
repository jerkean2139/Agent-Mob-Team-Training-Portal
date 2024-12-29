import React from 'react';
import { useParams } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { useAgents } from '../../../hooks/useAgents';
import AgentCard from './AgentCard';

export default function ClientPortal() {
  const { clientId } = useParams<{ clientId: string }>();
  const { agents, loading, error } = useAgents(clientId);

  if (!clientId) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading agent team...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 p-4 rounded-lg text-red-700">
            <p>Failed to load agents: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Sort agents to ensure Donna is first
  const sortedAgents = [...agents].sort((a, b) => {
    if (a.name === 'Donna') return -1;
    if (b.name === 'Donna') return 1;
    return (a.display_order || 0) - (b.display_order || 0);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <Bot className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Agent Team</h1>
            <p className="text-gray-600">
              Upload documents and interact with your AI workforce
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {sortedAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              clientId={clientId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}