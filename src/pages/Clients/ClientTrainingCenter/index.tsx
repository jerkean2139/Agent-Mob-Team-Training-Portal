import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { useAgents } from '../../../hooks/useAgents';
import AgentOverview from './views/AgentOverview';
import AgentDetails from './views/AgentDetails';

export default function ClientTrainingCenter() {
  const { clientId } = useParams<{ clientId: string }>();
  const { agents, loading } = useAgents(clientId);

  if (!clientId) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading agent data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 -mx-6 -mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Bot className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Agent Training Center</h1>
              <p className="mt-1 text-white/80">
                Train and manage your AI workforce ({agents.length} agents)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6">
        <Routes>
          <Route index element={<AgentOverview clientId={clientId} />} />
          <Route path="agent/:agentId/*" element={<AgentDetails />} />
        </Routes>
      </div>
    </div>
  );
}