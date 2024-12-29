import React from 'react';
import { Bot, Check } from 'lucide-react';

interface StarterAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  primary_skills: string[];
}

interface AgentSelectionProps {
  requiredCount: number;
  onComplete: (selectedAgents: StarterAgent[]) => void;
}

const DONNA: StarterAgent = {
  id: 'donna',
  name: 'Donna',
  role: 'Traffic Controller',
  description: 'Manages and coordinates the Agent Mob workflow',
  primary_skills: ['Workflow Management', 'Task Coordination', 'Team Communication']
};

const ADDITIONAL_AGENTS: StarterAgent[] = [
  {
    id: 'researcher',
    name: 'Alex',
    role: 'Research Specialist',
    description: 'Conducts in-depth research and data analysis',
    primary_skills: ['Research Methods', 'Data Analysis', 'Information Synthesis']
  },
  {
    id: 'writer',
    name: 'Sarah',
    role: 'Content Writer',
    description: 'Creates engaging and informative content',
    primary_skills: ['Content Writing', 'SEO', 'Brand Voice']
  },
  {
    id: 'analyst',
    name: 'Marcus',
    role: 'Data Analyst',
    description: 'Analyzes data and provides actionable insights',
    primary_skills: ['Data Analysis', 'Reporting', 'Visualization']
  },
  {
    id: 'social',
    name: 'Emma',
    role: 'Social Media Expert',
    description: 'Manages social media strategy and engagement',
    primary_skills: ['Social Media', 'Community Management', 'Content Planning']
  },
  {
    id: 'support',
    name: 'James',
    role: 'Support Specialist',
    description: 'Provides customer support and issue resolution',
    primary_skills: ['Customer Support', 'Problem Solving', 'Communication']
  }
];

export default function AgentSelection({ requiredCount, onComplete }: AgentSelectionProps) {
  const [selectedAgents, setSelectedAgents] = React.useState<StarterAgent[]>([DONNA]);

  const toggleAgent = (agent: StarterAgent) => {
    if (selectedAgents.find(a => a.id === agent.id)) {
      setSelectedAgents(selectedAgents.filter(a => a.id !== agent.id));
    } else if (selectedAgents.length < requiredCount + 1) { // +1 for Donna
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Build Your Agent Mob</h2>
        <p className="mt-2 text-gray-600">
          Select {requiredCount} additional agents to work with Donna
        </p>
      </div>

      {/* Donna Card - Always shown and selected */}
      <div className="mb-6">
        <div className="p-4 rounded-lg border border-primary bg-primary/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium text-gray-900">{DONNA.name}</h3>
                <p className="text-sm text-gray-500">{DONNA.role}</p>
              </div>
            </div>
            <Check className="w-5 h-5 text-primary" />
          </div>
          <p className="mt-2 text-sm text-gray-600">{DONNA.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DONNA.primary_skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ADDITIONAL_AGENTS.map((agent) => {
          const isSelected = selectedAgents.find(a => a.id === agent.id);
          const isDisabled = !isSelected && selectedAgents.length >= requiredCount + 1;

          return (
            <button
              key={agent.id}
              onClick={() => toggleAgent(agent)}
              disabled={isDisabled}
              className={`p-4 rounded-lg border text-left transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/10 ring-2 ring-primary'
                  : 'border-gray-200 hover:border-primary/50'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.role}</p>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{agent.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {agent.primary_skills.map((skill) => (
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
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onComplete(selectedAgents)}
          disabled={selectedAgents.length !== requiredCount + 1}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          Create Agent Mob ({selectedAgents.length - 1}/{requiredCount})
        </button>
      </div>
    </div>
  );
}