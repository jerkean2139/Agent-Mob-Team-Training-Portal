import React from 'react';
import { FileText, Upload } from 'lucide-react';
import DriveUpload from '../../../../components/drive/DriveUpload';
import { useClientResources } from '../../../../hooks/useClientResources';

interface KnowledgeBaseProps {
  clientId: string;
}

export default function KnowledgeBase({ clientId }: KnowledgeBaseProps) {
  const { resources, loading } = useClientResources(clientId, 'document');

  const handleFileUpload = async (fileId: string) => {
    // Handle file upload logic
    console.log('File uploaded:', fileId);
  };

  if (loading) {
    return <div>Loading knowledge base...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Knowledge Base</h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload and manage training materials for your agents
          </p>
        </div>
        <DriveUpload onUpload={handleFileUpload} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="p-4 bg-white rounded-lg border">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium text-gray-900">{resource.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(resource.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}