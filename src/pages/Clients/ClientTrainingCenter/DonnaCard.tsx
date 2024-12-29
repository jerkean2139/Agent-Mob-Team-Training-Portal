import React from 'react';
import { Star } from 'lucide-react';
import type { Agent } from '../../../types';

interface DonnaCardProps {
  agent: Agent;
  onClick: () => void;
}

export default function DonnaCard({ agent, onClick }: DonnaCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-8 rounded-xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all group hover:shadow-xl"
    >
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Donna&hair=long&hairColor=red&eyes=default&mouth=smile&skin=light&accessories=none&top=longHair&topChance=100&hairColor=red"
              alt={agent.name}
              className="w-28 h-28"
            />
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white bg-green-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{agent.name}</h3>
          <p className="text-lg text-gray-600 mb-4">{agent.role}</p>
          <div className="flex flex-wrap gap-2">
            {agent.primary_skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-1.5 text-sm rounded-full bg-primary/15 text-primary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}