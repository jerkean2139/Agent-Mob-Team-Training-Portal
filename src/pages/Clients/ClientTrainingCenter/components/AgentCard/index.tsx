import React from 'react';
import type { Agent } from '../../../../../types';
import { getAvatarConfig } from './utils';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
  const avatarConfig = getAvatarConfig(agent.name);
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.name}&hair=${avatarConfig.hair}&hairColor=${avatarConfig.hairColor}&eyes=default&mouth=smile&skin=light${avatarConfig.accessories ? `&accessories=${avatarConfig.accessories}` : ''}`;
  
  return (
    <button
      onClick={onClick}
      className="text-left p-6 rounded-lg border hover:border-primary/50 transition-all group bg-white hover:shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-primary/60 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            <img 
              src={avatarUrl}
              alt={agent.name}
              className="w-12 h-12"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {agent.primary_skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </button>
  );
}