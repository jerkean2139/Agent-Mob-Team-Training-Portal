import React from 'react';
import { Agent } from '../../../types';
import BasicInfo from './BasicInfo';
import SkillsConfig from './SkillsConfig';
import IntegrationsConfig from './IntegrationsConfig';

interface AgentBuilderProps {
  agentId: string | null;
}

export default function AgentBuilder({ agentId }: AgentBuilderProps) {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<Partial<Agent>>({});

  const updateFormData = (data: Partial<Agent>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">
          {agentId ? 'Edit Agent' : 'Create New Agent'}
        </h2>
        
        <div className="space-y-6">
          {step === 1 && (
            <BasicInfo
              data={formData}
              onChange={updateFormData}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <SkillsConfig
              data={formData}
              onChange={updateFormData}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <IntegrationsConfig
              data={formData}
              onChange={updateFormData}
              onBack={() => setStep(2)}
              onSave={() => {
                // Save agent logic will be implemented
                console.log('Saving agent:', formData);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}