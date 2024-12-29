import React from 'react';
import { Agent } from '../../../types';
import { Check } from 'lucide-react';

interface IntegrationsConfigProps {
  data: Partial<Agent>;
  onChange: (data: Partial<Agent>) => void;
  onBack: () => void;
  onSave: () => void;
}

const AVAILABLE_INTEGRATIONS = [
  'Email',
  'Slack',
  'Microsoft Teams',
  'Google Calendar',
  'Jira',
  'GitHub',
];

export default function IntegrationsConfig({ 
  data, 
  onChange, 
  onBack, 
  onSave 
}: IntegrationsConfigProps) {
  const selectedIntegrations = data.integrations || [];

  const toggleIntegration = (integration: string) => {
    const newIntegrations = selectedIntegrations.includes(integration)
      ? selectedIntegrations.filter(i => i !== integration)
      : [...selectedIntegrations, integration];
    onChange({ integrations: newIntegrations });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {AVAILABLE_INTEGRATIONS.map((integration) => (
          <button
            key={integration}
            onClick={() => toggleIntegration(integration)}
            className={`p-4 rounded-lg border flex items-center gap-2 ${
              selectedIntegrations.includes(integration)
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            {selectedIntegrations.includes(integration) && (
              <Check className="w-4 h-4 text-primary" />
            )}
            {integration}
          </button>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onSave}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Save Agent
        </button>
      </div>
    </div>
  );
}