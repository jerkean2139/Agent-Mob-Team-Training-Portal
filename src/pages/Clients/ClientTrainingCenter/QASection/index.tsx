import React from 'react';
import { Plus } from 'lucide-react';
import QAList from './QAList';
import QAForm from './QAForm';
import { supabase } from '../../../../lib/supabase';

interface QASectionProps {
  clientId: string;
}

export default function QASection({ clientId }: QASectionProps) {
  const [items, setItems] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchQAs();
  }, [clientId]);

  const fetchQAs = async () => {
    try {
      const { data, error } = await supabase
        .from('client_resources')
        .select('*')
        .eq('client_id', clientId)
        .eq('type', 'qa')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching QAs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: { question: string; answer: string }) => {
    try {
      if (editingId) {
        await supabase
          .from('client_resources')
          .update({
            metadata: { ...data }
          })
          .eq('id', editingId);
      } else {
        await supabase
          .from('client_resources')
          .insert([{
            client_id: clientId,
            type: 'qa',
            metadata: { ...data }
          }]);
      }
      
      setShowForm(false);
      setEditingId(null);
      fetchQAs();
    } catch (error) {
      console.error('Error saving QA:', error);
    }
  };

  if (loading) return <div>Loading Q&A...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Q&A Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Q&A
        </button>
      </div>

      {showForm ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <QAForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingId(null);
            }}
          />
        </div>
      ) : (
        <QAList
          items={items}
          onEdit={(id) => {
            setEditingId(id);
            setShowForm(true);
          }}
          onDelete={async (id) => {
            try {
              await supabase
                .from('client_resources')
                .delete()
                .eq('id', id);
              fetchQAs();
            } catch (error) {
              console.error('Error deleting QA:', error);
            }
          }}
        />
      )}
    </div>
  );
}