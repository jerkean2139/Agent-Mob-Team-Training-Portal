import React from 'react';
import { Settings } from 'lucide-react';
import SettingsCard from './SettingsCard';

interface AdvancedSettingsProps {
  progress: any[];
  onUpdate: (stage: string, completed: boolean) => Promise<void>;
}

export default function AdvancedSettings({ progress, onUpdate }: AdvancedSettingsProps) {
  return (
    <SettingsCard
      icon={Settings}
      title="Advanced Settings"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Learning Rate</label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress.find(p => p.stage === 'learning_rate')?.completed ? 100 : 50}
            onChange={(e) => onUpdate('learning_rate', Number(e.target.value) > 50)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Response Confidence Threshold</label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress.find(p => p.stage === 'confidence_threshold')?.completed ? 100 : 50}
            onChange={(e) => onUpdate('confidence_threshold', Number(e.target.value) > 50)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </SettingsCard>
  );
}