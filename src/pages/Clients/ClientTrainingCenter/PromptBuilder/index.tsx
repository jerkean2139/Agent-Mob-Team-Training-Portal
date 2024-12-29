import React from 'react';
import { Plus, Wand2 } from 'lucide-react';
import { supabase } from '../../../../lib/supabase';
import PromptForm from './PromptForm';

interface PromptBuilderProps {
  clientId: string;
}

export default function PromptBuilder({ clientId }: PromptBuilderProps) {
  const [prompts, setPrompts] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchPrompts();
  }, [clientId]);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('client_resources')
        .select('*')
        .eq('client_id', clientId)
        .eq('type', 'prompt')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: { title: string; content: string; type: string }) => {
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
            type: 'prompt',
            metadata: { ...data }
          }]);
      }
      
      setShowForm(false);
      setEditingId(null);
      fetchPrompts();
    } catch (error) {
      console.error('Error saving prompt:', error);
    }
  };

  if (loading) return <div>Loading prompts...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Prompt Builder</h2>
          <p className="text-sm text-gray-500">
            Create and manage prompts for personality, job descriptions, and knowledge instructions
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          New Prompt
        </button>
      </div>

      {showForm ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <PromptForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingId(null);
            }}
          />
        </div>
      ) : (
        <div className="grid gap-4">
          {prompts.map((prompt: any) => (
            <div key={prompt.id} className="bg-white p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <Wand2 className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{prompt.metadata.title}</h4>
                    <span className="text-sm text-primary">{prompt.metadata.type}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{prompt.metadata.content}</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingId(prompt.id);
                        setShowForm(true);
                      }}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await supabase
                            .from('client_resources')
                            .delete()
                            .eq('id', prompt.id);
                          fetchPrompts();
                        } catch (error) {
                          console.error('Error deleting prompt:', error);
                        }
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}