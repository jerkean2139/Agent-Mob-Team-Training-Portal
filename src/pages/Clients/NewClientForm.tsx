import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, HelpCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface NewClientFormProps {
  onClose: () => void;
  onSuccess: (clientId: string) => void;
}

export default function NewClientForm({ onClose, onSuccess }: NewClientFormProps) {
  const [name, setName] = React.useState('');
  const [apiKey, setApiKey] = React.useState('');
  const [locationId, setLocationId] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create new client in Supabase
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .insert([{
          name,
          status: 'active',
          integration_configs: {
            provider: 'ghl',
            apiKey,
            locationId,
            connected: true
          }
        }])
        .select()
        .single();

      if (clientError) throw clientError;

      // Initialize client team
      const { error: teamError } = await supabase
        .from('client_teams')
        .insert([{
          client_id: client.id,
          team_members: []
        }]);

      if (teamError) throw teamError;
      
      onSuccess(client.id);
    } catch (err) {
      console.error('Error creating client:', err);
      setError('Failed to create client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New Client</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                GHL Subaccount API Key
              </label>
              <button
                type="button"
                onClick={() => window.open('https://highlevel.com/documentation/getting-started/authentication', '_blank')}
                className="text-primary hover:text-primary/80"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
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

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}