import React from 'react';
import { Brain } from 'lucide-react';
import SettingsCard from './SettingsCard';
import SettingToggle from './SettingToggle';

interface LearningSettingsProps {
  progress: any[];
  onUpdate: (stage: string, completed: boolean) => Promise<void>;
}

export default function LearningSettings({ progress, onUpdate }: LearningSettingsProps) {
  return (
    <SettingsCard
      icon={Brain}
      title="Learning Settings"
    >
      <div className="space-y-4">
        <SettingToggle
          label="Continuous Learning"
          description="Allow agent to learn from interactions"
          checked={progress.some(p => p.stage === 'continuous_learning' && p.completed)}
          onChange={(checked) => onUpdate('continuous_learning', checked)}
        />
        <SettingToggle
          label="Knowledge Sharing"
          description="Share knowledge with other agents"
          checked={progress.some(p => p.stage === 'knowledge_sharing' && p.completed)}
          onChange={(checked) => onUpdate('knowledge_sharing', checked)}
        />
      </div>
    </SettingsCard>
  );
}