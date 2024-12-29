import React from 'react';
import { Star, ArrowRight, CheckCircle } from 'lucide-react';
import type { Agent } from '../../../../../types';
import AgentAvatar from '../../../../../components/agents/AgentAvatar';

interface DonnaCardProps {
  agent: Agent;
  onClick: () => void;
}

export default function DonnaCard({ agent, onClick }: DonnaCardProps) {
  const keyFeatures = [
    'Workflow Management',
    'Team Coordination',
    'Process Optimization',
    'Quality Control'
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-xl" />

      <button
        onClick={onClick}
        className="relative w-full text-left p-8 rounded-xl border-2 border-primary hover:border-primary/80 transition-all group hover:shadow-xl"
      >
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <Star className="w-6 h-6 text-white" />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Avatar Section */}
          <div className="relative">
            <AgentAvatar agent={agent} size="xl" />
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{agent.name}</h3>
              <p className="text-lg text-gray-600">{agent.role}</p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                As your Traffic Controller, I coordinate the AI workforce, ensuring smooth operations
                and optimal performance across all tasks and projects.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {keyFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {agent.primary_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full bg-primary/15 text-primary font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow Indicator */}
          <div className="hidden md:flex items-center text-primary group-hover:translate-x-2 transition-transform">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </button>
    </div>
  );
}