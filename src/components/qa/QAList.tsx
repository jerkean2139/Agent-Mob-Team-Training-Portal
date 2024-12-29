import React from 'react';
import { MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { QA } from '../../types';

interface QAListProps {
  items: QA[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QAList({ items, onEdit, onDelete }: QAListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No Q&A items yet. Click the button above to add your first question.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.question}</h4>
              <p className="mt-1 text-gray-600">{item.answer}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => onEdit(item.id)}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}