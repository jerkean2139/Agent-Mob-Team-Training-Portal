import React from 'react';
import { Database } from 'lucide-react';

interface DatabaseErrorProps {
  message?: string;
}

export default function DatabaseError({ message }: DatabaseErrorProps) {
  return (
    <div className="p-4 bg-red-50 rounded-lg flex items-start gap-3">
      <Database className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-red-800">Database Connection Error</h3>
        <p className="mt-1 text-sm text-red-600">
          {message || 'Please check your database connection settings and try again.'}
        </p>
      </div>
    </div>
  );
}