import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { useAgentQA } from '../../hooks/useAgentQA';
import QAList from './QAList';
import QAForm from './QAForm';
import DatabaseError from '../errors/DatabaseError';
import { useToast } from '../../hooks/useToast';

interface QASectionProps {
  agentId: string;
}

export default function QASection({ agentId }: QASectionProps) {
  const { items, loading, error, addQA, editQA, removeQA } = useAgentQA(agentId);
  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const { showToast } = useToast();

  if (error) {
    return <DatabaseError message={error.message} />;
  }

  const handleSubmit = async (data: { question: string; answer: string }) => {
    try {
      if (editingId) {
        await editQA(editingId, data);
        showToast('Q&A updated successfully', 'success');
      } else {
        await addQA(data.question, data.answer);
        showToast('Q&A added successfully', 'success');
      }
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save Q&A';
      showToast(message, 'error');
      throw error; // Re-throw to be handled by the form
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
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingId(null);
            }}
          />
        </div>
      ) : loading ? (
        <div className="text-center py-8 text-gray-500">Loading Q&A...</div>
      ) : (
        <QAList
          items={items}
          onEdit={(id) => {
            setEditingId(id);
            setShowForm(true);
          }}
          onDelete={removeQA}
        />
      )}
    </div>
  );
}