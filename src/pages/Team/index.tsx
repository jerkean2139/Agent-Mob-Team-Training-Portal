import React from 'react';
import { useAgents } from '../../hooks/useAgents';
import AgentTeam from '../../components/agents/AgentTeam';
import AgentCount from '../../components/agents/AgentCount';

export default function TeamPage() {
  const { agents, loading } = useAgents();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team of AI agents and their capabilities
          </p>
        </div>
        <AgentCount />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900">Active Agents</h2>
          <p className="text-sm text-gray-500">
            Click on an agent to view their details and manage their settings
          </p>
        </div>

        <AgentTeam />
      </div>
    </div>
  );
}