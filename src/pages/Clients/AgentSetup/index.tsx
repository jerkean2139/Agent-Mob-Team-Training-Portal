import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import AgentCount from './AgentCount';
import AgentSelection from './AgentSelection';

interface AgentSetupProps {
  clientId: string;
}

export default function AgentSetup({ clientId }: AgentSetupProps) {
  const [step, setStep] = React.useState(1);
  const [agentCount, setAgentCount] = React.useState(0);
  const navigate = useNavigate();

  const handleAgentCountNext = (count: number) => {
    setAgentCount(count);
    setStep(2);
  };

  const handleAgentSelection = async (selectedAgents: any[]) => {
    try {
      // Create agents for the client with proper client_id and display_order
      const { error } = await supabase
        .from('agents')
        .insert(
          selectedAgents.map((agent, index) => ({
            name: agent.name,
            role: agent.role,
            department: agent.role,
            primary_skills: agent.primary_skills,
            secondary_skills: agent.secondary_skills || [],
            specialization: agent.specialization || [],
            client_id: clientId,
            display_order: index + 1,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }))
        );

      if (error) throw error;

      // Navigate to client training center
      navigate(`/clients/${clientId}/training`);
    } catch (error) {
      console.error('Error creating agents:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      {step === 1 ? (
        <AgentCount onNext={handleAgentCountNext} />
      ) : (
        <AgentSelection
          requiredCount={agentCount}
          onComplete={handleAgentSelection}
        />
      )}
    </div>
  );
}