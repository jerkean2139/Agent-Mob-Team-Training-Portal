import React from 'react';
import { FileText } from 'lucide-react';
import { useDocuments } from '../../../hooks/useDocuments';
import DocumentList from '../../../components/documents/DocumentList';
import DocumentUpload from '../../../components/documents/DocumentUpload';
import { useToast } from '../../../hooks/useToast';
import type { Agent } from '../../../types';

interface AgentDocumentsProps {
  agent: Agent;
  clientId: string;
}

export default function AgentDocuments({ agent, clientId }: AgentDocumentsProps) {
  const { documents, loading, error, uploadDocument } = useDocuments(agent.id);
  const { showToast } = useToast();

  const handleUpload = async (file: File) => {
    try {
      await uploadDocument(file, clientId);
      showToast('Document uploaded successfully', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to upload document';
      showToast(message, 'error');
      throw error;
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg text-red-700">
        <p>Failed to load documents: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {agent.name}'s Knowledge Base
            </h2>
            <p className="text-sm text-gray-500">
              Upload documents for {agent.name} to learn from
            </p>
          </div>
        </div>
        <DocumentUpload onUpload={handleUpload} />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading documents...</div>
      ) : (
        <DocumentList documents={documents} />
      )}
    </div>
  );
}