import React from 'react';
import { ExternalLink } from 'lucide-react';
import { connectGHL } from '../../../../lib/ghl';

interface GHLIntegrationProps {
  clientId: string;
  config: any;
  onUpdate: () => void;
}

export default function GHLIntegration({ clientId, config, onUpdate }: GHLIntegrationProps) {
  const [apiKey, setApiKey] = React.useState(config?.apiKey || '');
  const [locationId, setLocationId] = React.useState(config?.locationId || '');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await connectGHL(clientId, { apiKey, locationId });
      onUpdate();
    } catch (error) {
      console.error('Error connecting GHL:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Go High Level Integration</h3>
        <a
          href="https://highlevel.com/documentation/api"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          API Documentation
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="locationId" className="block text-sm font-medium text-gray-700">
            Location ID
          </label>
          <input
            type="text"
            id="locationId"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Connecting...' : 'Connect GHL'}
        </button>
      </form>
    </div>
  );
}