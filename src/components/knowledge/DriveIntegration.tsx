import React from 'react';
import { Cloud, CloudOff } from 'lucide-react';
import { useGoogleDrive } from '../../hooks/useGoogleDrive';
import DriveUpload from './DriveUpload';

interface DriveIntegrationProps {
  clientId: string;
}

export default function DriveIntegration({ clientId }: DriveIntegrationProps) {
  const { connected, loading, error, connect } = useGoogleDrive(clientId);

  if (loading) {
    return <div>Checking Drive connection...</div>;
  }

  if (!connected) {
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
          Connect your Google Drive to manage knowledge base documents
        </p>
        <div className="mt-6">
          <button
            onClick={connect}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Connect Drive
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  return <DriveUpload clientId={clientId} />;
}