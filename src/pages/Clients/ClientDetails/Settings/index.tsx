import React from 'react';
import { useClient } from '../../../../hooks/useClient';
import GeneralSettings from './GeneralSettings';
import GHLIntegration from './GHLIntegration';

interface SettingsProps {
  clientId: string;
}

export default function Settings({ clientId }: SettingsProps) {
  const { client, loading, error } = useClient(clientId);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (error || !client) {
    return <div>Error loading settings</div>;
  }

  return (
    <div className="space-y-8">
      <GeneralSettings
        clientId={clientId}
        settings={client}
        onUpdate={handleUpdate}
      />
      
      <div className="border-t pt-8">
        <GHLIntegration
          clientId={clientId}
          config={client.integration_configs}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}