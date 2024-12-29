import { useState, useEffect } from 'react';
import { Document } from '../lib/documents/types';
import { validateFile } from '../lib/documents/validation';
import * as documentsApi from '../lib/documents/queries';

export function useDocuments(agentId: string) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (agentId) {
      fetchDocuments();
    }
  }, [agentId]);

  const fetchDocuments = async () => {
    try {
      const data = await documentsApi.getDocuments(agentId);
      setDocuments(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch documents'));
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, clientId: string) => {
    try {
      validateFile(file);
      const doc = await documentsApi.uploadDocument(file, agentId, clientId);
      setDocuments(prev => [doc, ...prev]);
      return doc;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to upload document');
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await documentsApi.deleteDocument(id);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete document');
    }
  };

  return {
    documents,
    loading,
    error,
    uploadDocument,
    deleteDocument,
    refresh: fetchDocuments
  };
}