import React from 'react';
import { Settings } from 'lucide-react';
import { useTrainingProgress } from '../../../../../../../../hooks/useTrainingProgress';
import LearningSettings from './LearningSettings';
import ProcessingSettings from './ProcessingSettings';
import QASettings from './QASettings';
import AdvancedSettings from './AdvancedSettings';

interface AgentSettingsProps {
  clientId: string;
  agentId: string;
}

export default function AgentSettings({ clientId, agentId }: AgentSettingsProps) {
  const { progress, loading, updateProgress } = useTrainingProgress(agentId);

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-lg font-medium text-gray-900">Training Settings</h2>
          <p className="text-sm text-gray-500">
            Configure how this agent learns and processes information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LearningSettings progress={progress} onUpdate={updateProgress} />
        <ProcessingSettings progress={progress} onUpdate={updateProgress} />
        <QASettings progress={progress} onUpdate={updateProgress} />
        <AdvancedSettings progress={progress} onUpdate={updateProgress} />
      </div>
    </div>
  );
}