import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgents } from '../../hooks/useAgents';
import AgentCard from './AgentCard';

export default function AgentTeam() {
  const { agents, loading } = useAgents();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-48"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onClick={() => navigate('/agent/' + agent.id)}
        />
      ))}
    </div>
  );
}