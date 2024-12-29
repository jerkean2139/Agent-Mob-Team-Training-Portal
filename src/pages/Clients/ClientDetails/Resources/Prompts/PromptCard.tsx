import React from 'react';
import { MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    content: string;
    category: string;
    created_at: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PromptCard({ prompt, onEdit, onDelete }: PromptCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <div>
            <h4 className="font-medium">{prompt.title}</h4>
            <p className="text-sm text-gray-500">{prompt.category}</p>
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(prompt.id)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(prompt.id)}
            className="p-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{prompt.content}</p>
    </div>
  );
}