import React from 'react';
import { useClientResources } from '../../../../hooks/useClientResources';
import { uploadDocument } from '../../../../lib/documentManager';
import { FileText, Upload, Trash2 } from 'lucide-react';

interface DocumentsProps {
  clientId: string;
}

export default function Documents({ clientId }: DocumentsProps) {
  const { resources, loading, error } = useClientResources(clientId, 'document');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadDocument(clientId, file);
      // Refresh resources
    } catch (error) {
      console.error('Failed to upload document:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Documents</h3>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
      </div>

      {loading ? (
        <div>Loading documents...</div>
      ) : error ? (
        <div>Error loading documents</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((doc) => (
            <div key={doc.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}