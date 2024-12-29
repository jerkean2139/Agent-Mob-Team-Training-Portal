import React from 'react';
import AgentList from './AgentList';
import AgentBuilder from './AgentBuilder';

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = React.useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Agent Management</h1>
        <button 
          onClick={() => setSelectedAgent(null)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Create New Agent
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AgentList onSelect={setSelectedAgent} selectedId={selectedAgent} />
        <div className="lg:col-span-2">
          <AgentBuilder agentId={selectedAgent} />
        </div>
      </div>
    </div>
  );
}