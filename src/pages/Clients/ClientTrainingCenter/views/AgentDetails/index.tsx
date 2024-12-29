import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';
import { useAgents } from '../../../../../hooks/useAgents';
import { Tabs } from '../../../../../components/ui/Tabs';
import AgentHeader from './components/AgentHeader';
import AgentTabs from './components/AgentTabs';

export default function AgentDetails() {
  const { clientId, agentId } = useParams<{ clientId: string; agentId: string }>();
  const { agents, loading } = useAgents(clientId);
  const agent = agents.find(a => a.id === agentId);

  if (loading) {
    return <div>Loading agent details...</div>;
  }

  if (!agent || !clientId) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="space-y-8">
      <AgentHeader 
        agent={agent}
        backLink={`/clients/${clientId}/training`}
      />
      <AgentTabs 
        agent={agent}
        clientId={clientId}
      />
    </div>
  );
}