import React from 'react';

interface SettingToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingToggle({ label, description, checked, onChange }: SettingToggleProps) {
  return (
    <div>
      <label className="flex items-center justify-between">
        <span className="text-sm text-gray-700">{label}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
      </label>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}