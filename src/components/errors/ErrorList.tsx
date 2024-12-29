import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { ErrorLog } from '../../lib/logging/errorLogger';

interface ErrorListProps {
  errors: ErrorLog[];
  onStatusChange: (errorId: string, status: ErrorLog['status']) => void;
}

export default function ErrorList({ errors, onStatusChange }: ErrorListProps) {
  const getStatusIcon = (status: ErrorLog['status']) => {
    switch (status) {
      case 'new':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {errors.map((error) => (
        <div key={error.id} className="bg-white p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            {getStatusIcon(error.status)}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{error.error_message}</h3>
                <select
                  value={error.status}
                  onChange={(e) => onStatusChange(error.id, e.target.value as ErrorLog['status'])}
                  className="text-sm border-gray-300 rounded-md"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              {error.component && (
                <p className="mt-1 text-sm text-gray-500">
                  Component: {error.component}
                </p>
              )}
              {error.stack_trace && (
                <pre className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600 overflow-x-auto">
                  {error.stack_trace}
                </pre>
              )}
              {error.screenshot_url && (
                <a
                  href={error.screenshot_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-primary hover:text-primary/80"
                >
                  View Screenshot
                </a>
              )}
              <div className="mt-2 text-xs text-gray-400">
                {new Date(error.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}