import React from 'react';
import { Agent } from '../../../types';
import SkillInput from './SkillInput';

interface SkillsConfigProps {
  data: Partial<Agent>;
  onChange: (data: Partial<Agent>) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function SkillsConfig({ data, onChange, onBack, onNext }: SkillsConfigProps) {
  return (
    <div className="space-y-6">
      <SkillInput
        label="Primary Skills"
        value={data.primary_skills || []}
        onChange={(skills) => onChange({ primary_skills: skills })}
      />

      <SkillInput
        label="Secondary Skills"
        value={data.secondary_skills || []}
        onChange={(skills) => onChange({ secondary_skills: skills })}
      />

      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}