import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Agent } from '../../../types';
import DonnaCard from './DonnaCard';
import AgentGrid from './AgentGrid';

interface AgentLineupProps {
  clientId: string;
  agents: Agent[];
}

export default function AgentLineup({ clientId, agents }: AgentLineupProps) {
  const navigate = useNavigate();
  
  // Separate Donna from other agents
  const donna = agents.find(agent => agent.name === 'Donna');
  const teamAgents = agents.filter(agent => agent.name !== 'Donna');

  const handleAgentClick = (agentId: string) => {
    navigate(`/clients/${clientId}/training/agent/${agentId}`);
  };

  return (
    <div className="space-y-16">
      {/* Donna's Special Section */}
      {donna && (
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Meet Your Traffic Controller</h2>
            <p className="text-gray-600">Coordinating your AI workforce for optimal performance</p>
          </div>
          <DonnaCard agent={donna} onClick={() => handleAgentClick(donna.id)} />
        </div>
      )}

      {/* Team Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Agent Team</h3>
            <p className="text-gray-600 mt-1">Your specialized AI workforce</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{teamAgents.length} Agents</span>
          </div>
        </div>
        <AgentGrid agents={teamAgents} onSelectAgent={handleAgentClick} />
      </div>
    </div>
  );
}