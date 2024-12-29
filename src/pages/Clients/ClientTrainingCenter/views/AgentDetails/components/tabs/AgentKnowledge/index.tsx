import React from 'react';
import { FileText } from 'lucide-react';
import { useDocuments } from '../../../../../../../../hooks/useDocuments';
import DocumentList from '../../../../../../../../components/documents/DocumentList';
import DocumentUpload from '../../../../../../../../components/documents/DocumentUpload';
import DatabaseError from '../../../../../../../../components/errors/DatabaseError';
import { useToast } from '../../../../../../../../hooks/useToast';

interface AgentKnowledgeProps {
  clientId: string;
  agentId: string;
}

export default function AgentKnowledge({ clientId, agentId }: AgentKnowledgeProps) {
  const { documents, loading, error, uploadDocument, deleteDocument } = useDocuments(agentId);
  const { showToast } = useToast();

  if (!agentId) {
    return <DatabaseError message="Agent ID is required" />;
  }

  if (error) {
    return <DatabaseError message={error.message} />;
  }

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

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id);
      showToast('Document deleted successfully', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete document';
      showToast(message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-lg font-medium text-gray-900">Knowledge Base</h2>
            <p className="text-sm text-gray-500">
              Upload and manage training materials
            </p>
          </div>
        </div>
        <DocumentUpload onUpload={handleUpload} />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading documents...</div>
      ) : (
        <DocumentList 
          documents={documents}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}