import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/Tabs';
import Overview from './Overview';
import Resources from './Resources';
import Workflows from './Workflows';
import Settings from './Settings';

interface ClientDetailsProps {
  clientId: string | null;
}

export default function ClientDetails({ clientId }: ClientDetailsProps) {
  if (!clientId) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Select a client or create a new one</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Tabs defaultValue="overview">
        <TabsList className="border-b px-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <div className="p-6">
          <TabsContent value="overview">
            <Overview clientId={clientId} />
          </TabsContent>
          <TabsContent value="resources">
            <Resources clientId={clientId} />
          </TabsContent>
          <TabsContent value="workflows">
            <Workflows clientId={clientId} />
          </TabsContent>
          <TabsContent value="settings">
            <Settings clientId={clientId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}