import React from 'react';
import { getAgentAvatarUrl } from '../../lib/utils/avatars';
import type { Agent } from '../../types';

interface AgentAvatarProps {
  agent: Agent;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

export default function AgentAvatar({ 
  agent, 
  size = 'md', 
  showStatus = true,
  className = ''
}: AgentAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-32 h-32'
  };

  const containerClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-36 h-36'
  };

  const statusClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
  };

  const avatarUrl = getAgentAvatarUrl(agent);

  return (
    <div className={`relative ${className}`}>
      <div className={`${containerClasses[size]} rounded-full bg-gradient-to-br from-primary/80 to-primary/60 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
        <img 
          src={avatarUrl}
          alt={agent.name}
          className={`${sizeClasses[size]}`}
        />
      </div>
      {showStatus && (
        <div className={`absolute -bottom-1 -right-1 ${statusClasses[size]} rounded-full border-2 border-white bg-green-500`} />
      )}
    </div>
  );
}