import React from 'react';
import { useAgents } from '../../../../hooks/useAgents';
import AgentLineup from '../components/AgentLineup';

interface AgentOverviewProps {
  clientId: string;
}

export default function AgentOverview({ clientId }: AgentOverviewProps) {
  const { agents, loading } = useAgents(clientId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">Loading Agent Mob...</div>
      </div>
    );
  }

  // Sort agents by display order
  const sortedAgents = [...agents].sort((a, b) => 
    (a.display_order || 0) - (b.display_order || 0)
  );

  return (
    <div className="space-y-12">
      <AgentLineup clientId={clientId} agents={sortedAgents} />
    </div>
  );
}