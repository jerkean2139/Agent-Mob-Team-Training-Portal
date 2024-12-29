import React from 'react';
import type { QA } from '../../../types';
import QAListItem from './QAListItem';

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
        <QAListItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}