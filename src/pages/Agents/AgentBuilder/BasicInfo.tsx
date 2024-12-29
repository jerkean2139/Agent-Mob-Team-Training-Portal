import React from 'react';
import { Agent } from '../../../types';

interface BasicInfoProps {
  data: Partial<Agent>;
  onChange: (data: Partial<Agent>) => void;
  onNext: () => void;
}

export default function BasicInfo({ data, onChange, onNext }: BasicInfoProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Agent Name
        </label>
        <input
          type="text"
          id="name"
          value={data.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <input
          type="text"
          id="role"
          value={data.role || ''}
          onChange={(e) => onChange({ role: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <input
          type="text"
          id="department"
          value={data.department || ''}
          onChange={(e) => onChange({ department: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Next Step
        </button>
      </div>
    </form>
  );
}