import React from 'react';
import { FileSpreadsheet, ExternalLink, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SheetCardProps {
  sheet: {
    id: string;
    name: string;
    metadata: {
      spreadsheetId: string;
      ranges: string[];
    };
    created_at: string;
  };
  onDelete: (id: string) => void;
}

export default function SheetCard({ sheet, onDelete }: SheetCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="w-5 h-5 text-primary" />
          <div>
            <h4 className="font-medium">{sheet.name}</h4>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(sheet.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://docs.google.com/spreadsheets/d/${sheet.metadata.spreadsheetId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => onDelete(sheet.id)}
            className="p-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}