import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';
import type { Agent } from '../../../../../../types';

interface AgentHeaderProps {
  agent: Agent;
  backLink: string;
}

export default function AgentHeader({ agent, backLink }: AgentHeaderProps) {
  return (
    <div className="flex items-center gap-6 pb-6 border-b">
      <Link
        to={backLink}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Overview
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
          <p className="text-gray-500">{agent.role}</p>
        </div>
      </div>
    </div>
  );
}