import React from 'react';
import { MessageSquare } from 'lucide-react';
import SettingsCard from './SettingsCard';
import SettingToggle from './SettingToggle';

interface QASettingsProps {
  progress: any[];
  onUpdate: (stage: string, completed: boolean) => Promise<void>;
}

export default function QASettings({ progress, onUpdate }: QASettingsProps) {
  return (
    <SettingsCard
      icon={MessageSquare}
      title="Q&A Settings"
    >
      <div className="space-y-4">
        <SettingToggle
          label="Auto-Response"
          description="Enable automatic responses to common questions"
          checked={progress.some(p => p.stage === 'auto_response' && p.completed)}
          onChange={(checked) => onUpdate('auto_response', checked)}
        />
        <SettingToggle
          label="Learning from Q&A"
          description="Use Q&A interactions for training"
          checked={progress.some(p => p.stage === 'qa_learning' && p.completed)}
          onChange={(checked) => onUpdate('qa_learning', checked)}
        />
      </div>
    </SettingsCard>
  );
}