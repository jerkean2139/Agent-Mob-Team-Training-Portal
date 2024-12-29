import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'learning' | 'idle';
}

interface AgentNetworkProps {
  agents: AgentNode[];
  onSelectAgent: (id: string) => void;
}

export default function AgentNetwork({ agents, onSelectAgent }: AgentNetworkProps) {
  return (
    <div className="relative p-8 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-center flex-wrap gap-8">
        {agents.map((agent, index) => (
          <div key={agent.id} className="relative">
            <button
              onClick={() => onSelectAgent(agent.id)}
              className="group relative flex flex-col items-center"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all
                ${agent.status === 'active' ? 'bg-green-100' : 
                  agent.status === 'learning' ? 'bg-blue-100' : 'bg-gray-100'}
              `}>
                <Bot className={`w-8 h-8 
                  ${agent.status === 'active' ? 'text-green-600' : 
                    agent.status === 'learning' ? 'text-blue-600' : 'text-gray-600'}
                `} />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full 
                  ${agent.status === 'active' ? 'bg-green-500' : 
                    agent.status === 'learning' ? 'bg-blue-500' : 'bg-gray-500'}
                "/>
              </div>
              <div className="mt-2 text-center">
                <p className="font-medium text-gray-900">{agent.name}</p>
                <p className="text-sm text-gray-500">{agent.role}</p>
              </div>
            </button>
            {index < agents.length - 1 && (
              <ArrowRight className="absolute top-1/2 -right-6 w-4 h-4 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}