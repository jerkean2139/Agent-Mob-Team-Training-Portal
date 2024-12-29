import React from 'react';
import { Plus } from 'lucide-react';
import { useClientResources } from '../../../../../hooks/useClientResources';
import { supabase } from '../../../../../lib/supabase';
import SheetCard from './SheetCard';
import ConnectSheet from './ConnectSheet';

interface SheetsProps {
  clientId: string;
}

export default function Sheets({ clientId }: SheetsProps) {
  const { resources: sheets, loading, error } = useClientResources(clientId, 'sheet');
  const [showConnect, setShowConnect] = React.useState(false);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_resources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      // Resource list will automatically refresh via the hook
    } catch (error) {
      console.error('Error deleting sheet:', error);
    }
  };

  if (loading) return <div>Loading sheets...</div>;
  if (error) return <div>Error loading sheets</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Connected Sheets</h3>
        <button
          onClick={() => setShowConnect(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Connect Sheet
        </button>
      </div>

      {showConnect ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <ConnectSheet
            clientId={clientId}
            onConnect={() => setShowConnect(false)}
          />
        </div>
      ) : (
        <div className="grid gap-4">
          {sheets.map((sheet) => (
            <SheetCard
              key={sheet.id}
              sheet={sheet}
              onDelete={handleDelete}
            />
          ))}
          {sheets.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No sheets connected yet. Click the button above to connect your first sheet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}