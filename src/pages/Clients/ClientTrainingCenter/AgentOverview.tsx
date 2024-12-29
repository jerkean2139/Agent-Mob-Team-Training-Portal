import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { useAgents } from '../../../hooks/useAgents';

interface AgentOverviewProps {
  clientId: string;
}

export default function AgentOverview({ clientId }: AgentOverviewProps) {
  const navigate = useNavigate();
  const { agents, loading } = useAgents(clientId);

  const handleAgentClick = (agentId: string) => {
    navigate(`agent/${agentId}`);
  };

  if (loading) return <div>Loading agents...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => handleAgentClick(agent.id)}
          className="text-left p-4 rounded-lg border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {agent.primary_skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}