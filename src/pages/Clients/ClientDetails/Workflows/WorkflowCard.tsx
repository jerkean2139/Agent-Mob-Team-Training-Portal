import React from 'react';
import { Play, Edit2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface WorkflowCardProps {
  workflow: {
    id: string;
    name: string;
    description: string;
    created_at: string;
    steps: any[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRun: (id: string) => void;
}

export default function WorkflowCard({ workflow, onEdit, onDelete, onRun }: WorkflowCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-900">{workflow.name}</h3>
          <p className="text-sm text-gray-500">{workflow.description}</p>
        </div>
        <span className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(workflow.created_at), { addSuffix: true })}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => onRun(workflow.id)}
          className="flex items-center gap-1 px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-md"
        >
          <Play className="w-4 h-4" />
          Run
        </button>
        <button
          onClick={() => onEdit(workflow.id)}
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(workflow.id)}
          className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md ml-auto"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}