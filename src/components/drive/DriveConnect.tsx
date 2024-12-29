import React from 'react';
import { CloudOff, Cloud } from 'lucide-react';
import { authenticateGoogleDrive } from '../../lib/google';
import { initGoogleApi } from '../../lib/google/api';

interface DriveConnectProps {
  onConnect: () => void;
}

export default function DriveConnect({ onConnect }: DriveConnectProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      await initGoogleApi();
      await authenticateGoogleDrive();
      onConnect();
    } catch (err: any) {
      console.error('Drive connection error:', err);
      if (err.error === 'popup_blocked_by_browser') {
        setError('Please allow popups and try again');
      } else if (err.error === 'access_denied') {
        setError('Access denied. Please grant the necessary permissions.');
      } else if (err.message?.includes('origin_mismatch')) {
        setError('This domain is not authorized. Please check the Google Cloud Console configuration.');
      } else {
        setError('Failed to connect to Google Drive. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-6 border-2 border-dashed rounded-lg">
      {error ? (
        <CloudOff className="mx-auto h-12 w-12 text-gray-400" />
      ) : (
        <Cloud className="mx-auto h-12 w-12 text-gray-400" />
      )}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        Connect Google Drive
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Connect your Google Drive to easily manage your documents
      </p>
      <div className="mt-6">
        <button
          onClick={handleConnect}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {loading ? 'Connecting...' : 'Connect Drive'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}