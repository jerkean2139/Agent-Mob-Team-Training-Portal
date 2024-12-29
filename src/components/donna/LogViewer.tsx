import React from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';
import { syncDonnaLogsToSheets } from '../../lib/sheets/donnaLogs';

interface LogViewerProps {
  clientId: string;
  logs: Array<{
    id: string;
    question: string;
    created_at: string;
    user: { email: string };
  }>;
}

export default function LogViewer({ clientId, logs }: LogViewerProps) {
  const [syncing, setSyncing] = React.useState(false);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncDonnaLogsToSheets(clientId);
    } catch (error) {
      console.error('Error syncing logs:', error);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Question Logs</h3>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          <FileSpreadsheet className="w-4 h-4" />
          {syncing ? 'Syncing...' : 'Sync to Sheets'}
        </button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(log.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {log.question}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}