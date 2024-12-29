import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export default function SettingsCard({ icon: Icon, title, children }: SettingsCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}