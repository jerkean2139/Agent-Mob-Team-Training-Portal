import React from 'react';
import { FileText, Trash2, ExternalLink } from 'lucide-react';
import { formatRelativeTime, formatFileSize } from '../../../../../../../../lib/utils/date';

interface Resource {
  id: string;
  name: string;
  type: string;
  created_at: string;
  metadata?: {
    url?: string;
    size?: number;
  };
}

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((resource) => (
        <div key={resource.id} className="p-4 bg-white rounded-lg border group hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-gray-900 truncate">{resource.name}</h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {resource.metadata?.url && (
                    <a
                      href={resource.metadata.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <span>{formatRelativeTime(resource.created_at)}</span>
                {resource.metadata?.size && (
                  <>
                    <span>•</span>
                    <span>{formatFileSize(resource.metadata.size)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {resources.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No documents uploaded yet
        </div>
      )}
    </div>
  );
}