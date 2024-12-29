import React from 'react';
import { Plus } from 'lucide-react';
import { useClientResources } from '../../../../../hooks/useClientResources';
import { supabase } from '../../../../../lib/supabase';
import PromptCard from './PromptCard';
import PromptForm from './PromptForm';

interface PromptsProps {
  clientId: string;
}

export default function Prompts({ clientId }: PromptsProps) {
  const { resources: prompts, loading, error } = useClientResources(clientId, 'prompt');
  const [showForm, setShowForm] = React.useState(false);
  const [editingPrompt, setEditingPrompt] = React.useState<any>(null);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_resources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      // Resource list will automatically refresh via the hook
    } catch (error) {
      console.error('Error deleting prompt:', error);
    }
  };

  const handleEdit = (id: string) => {
    const prompt = prompts.find(p => p.id === id);
    setEditingPrompt(prompt);
    setShowForm(true);
  };

  if (loading) return <div>Loading prompts...</div>;
  if (error) return <div>Error loading prompts</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Prompt Library</h3>
        <button
          onClick={() => {
            setEditingPrompt(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          New Prompt
        </button>
      </div>

      {showForm ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <PromptForm
            clientId={clientId}
            prompt={editingPrompt}
            onSave={() => {
              setShowForm(false);
              setEditingPrompt(null);
            }}
          />
        </div>
      ) : (
        <div className="grid gap-4">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {prompts.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No prompts created yet. Click the button above to create your first prompt.
            </p>
          )}
        </div>
      )}
    </div>
  );
}