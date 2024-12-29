import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { useAgentQA } from '../../../../../../../../hooks/useAgentQA';
import QAList from '../../../../../../../../components/qa/QAList';
import QAForm from '../../../../../../../../components/qa/QAForm';
import DatabaseError from '../../../../../../../../components/errors/DatabaseError';

interface AgentQAProps {
  clientId: string;
  agentId: string;
}

export default function AgentQA({ clientId, agentId }: AgentQAProps) {
  const { items, loading, error, addQA, editQA, removeQA } = useAgentQA(agentId);
  const [showForm, setShowForm] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<{ id: string; question: string; answer: string } | null>(null);

  if (!agentId) {
    return <DatabaseError message="Agent ID is required" />;
  }

  if (error) {
    return <DatabaseError message={error.message} />;
  }

  const handleSubmit = async (data: { question: string; answer: string }) => {
    try {
      if (editingItem) {
        await editQA(editingItem.id, data);
      } else {
        await addQA(data.question, data.answer);
      }
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving QA:', error);
      throw error; // Let the form handle the error display
    }
  };

  const handleEdit = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setEditingItem({
        id: item.id,
        question: item.question,
        answer: item.answer
      });
      setShowForm(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-lg font-medium text-gray-900">Q&A Management</h2>
            <p className="text-sm text-gray-500">
              Create and manage common questions and answers
            </p>
          </div>
        </div>
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
            initialData={editingItem ? { 
              question: editingItem.question, 
              answer: editingItem.answer 
            } : undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
          />
        </div>
      ) : loading ? (
        <div className="text-center py-8 text-gray-500">Loading Q&A...</div>
      ) : (
        <QAList
          items={items}
          onEdit={handleEdit}
          onDelete={removeQA}
        />
      )}
    </div>
  );
}