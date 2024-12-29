import React from 'react';
import { useClient } from '../../../hooks/useClient';
import { Clock, Users, FileText, Workflow } from 'lucide-react';

interface OverviewProps {
  clientId: string;
}

export default function Overview({ clientId }: OverviewProps) {
  const { client, loading } = useClient(clientId);

  if (loading) return <div>Loading...</div>;
  if (!client) return <div>Client not found</div>;

  const stats = [
    { name: 'Team Members', value: client.client_teams?.[0]?.team_members?.length || 0, icon: Users },
    { name: 'Documents', value: client.resources?.filter(r => r.type === 'document').length || 0, icon: FileText },
    { name: 'Active Workflows', value: client.workflows?.length || 0, icon: Workflow },
    { name: 'Last Activity', value: '2 hours ago', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <stat.icon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-4">Recent Activity</h3>
          {/* Activity feed will be implemented later */}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          {/* Quick actions will be implemented later */}
        </div>
      </div>
    </div>
  );
}