import React from 'react';
import { Upload, MessageSquare } from 'lucide-react';
import DriveConnect from '../../components/drive/DriveConnect';
import DriveUpload from '../../components/drive/DriveUpload';
import AgentCount from '../../components/agents/AgentCount';
import AgentTeam from '../../components/agents/AgentTeam';
import { checkDriveConnection } from '../../lib/google';

export default function ClientPortal() {
  const [driveConnected, setDriveConnected] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const init = async () => {
      try {
        const isConnected = await checkDriveConnection();
        setDriveConnected(isConnected);
      } catch (err) {
        console.error('Failed to check Drive connection:', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleDriveConnect = () => {
    setDriveConnected(true);
  };

  const handleFileUpload = (fileId: string) => {
    console.log('File uploaded:', fileId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Client Portal</h1>
            <AgentCount />
          </div>

          {/* Agent Team Section */}
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Your Team</h2>
            <AgentTeam />
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <Upload className="h-6 w-6 text-primary" />
                  <h2 className="ml-3 text-lg font-medium text-gray-900">Documents</h2>
                </div>
                <div className="mt-4">
                  {driveConnected ? (
                    <DriveUpload onUpload={handleFileUpload} />
                  ) : (
                    <DriveConnect onConnect={handleDriveConnect} />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h2 className="ml-3 text-lg font-medium text-gray-900">Messages</h2>
                </div>
                <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90">
                    New Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}