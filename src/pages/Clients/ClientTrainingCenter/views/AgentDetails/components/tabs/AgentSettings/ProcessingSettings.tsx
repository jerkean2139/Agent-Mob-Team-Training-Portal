import React from 'react';
import { FileText } from 'lucide-react';
import SettingsCard from './SettingsCard';
import SettingToggle from './SettingToggle';

interface ProcessingSettingsProps {
  progress: any[];
  onUpdate: (stage: string, completed: boolean) => Promise<void>;
}

export default function ProcessingSettings({ progress, onUpdate }: ProcessingSettingsProps) {
  return (
    <SettingsCard
      icon={FileText}
      title="Resource Processing"
    >
      <div className="space-y-4">
        <SettingToggle
          label="Auto-Categorization"
          description="Automatically categorize new resources"
          checked={progress.some(p => p.stage === 'auto_categorization' && p.completed)}
          onChange={(checked) => onUpdate('auto_categorization', checked)}
        />
        <SettingToggle
          label="Content Extraction"
          description="Extract key information from documents"
          checked={progress.some(p => p.stage === 'content_extraction' && p.completed)}
          onChange={(checked) => onUpdate('content_extraction', checked)}
        />
      </div>
    </SettingsCard>
  );
}