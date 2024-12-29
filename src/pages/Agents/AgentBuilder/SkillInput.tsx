import React from 'react';
import { X } from 'lucide-react';

interface SkillInputProps {
  label: string;
  value: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillInput({ label, value, onChange }: SkillInputProps) {
  const [input, setInput] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add"
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="p-0.5 hover:bg-primary/20 rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}