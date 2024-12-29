import React from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatFileSize } from '../../lib/utils/date';
import type { Document } from '../../lib/documents/types';

interface DocumentListProps {
  documents: Document[];
  onDelete?: (id: string) => void;
  className?: string;
}

export default function DocumentList({ documents, onDelete, className = '' }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No documents uploaded yet
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {documents.map((doc) => (
        <div key={doc.id} className="p-4 bg-white rounded-lg border group hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                {onDelete && (
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <span>{formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}</span>
                <span>•</span>
                <span>{formatFileSize(doc.size)}</span>
              </div>
              {doc.url && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-primary hover:text-primary/80"
                >
                  View Document
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}