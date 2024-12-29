import React from 'react';
import { Building2, Users, FileText } from 'lucide-react';
import { formatRelativeTime } from '../../lib/utils/date';
import type { Client } from '../../types';

interface ClientCardProps {
  client: Client;
  selected: boolean;
  onClick: () => void;
}

export default function ClientCard({ client, selected, onClick }: ClientCardProps) {
  const teamCount = client.client_teams?.[0]?.team_members?.length || 0;
  const resourceCount = client.client_resources?.length || 0;

  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors ${
        selected ? 'bg-primary/10' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-medium text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500">
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {formatRelativeTime(client.created_at)}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{teamCount} members</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4" />
          <span>{resourceCount} resources</span>
        </div>
      </div>
    </div>
  );
}