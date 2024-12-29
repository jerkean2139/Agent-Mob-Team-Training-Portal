import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function SupabaseError() {
  return (
    <div className="p-4 bg-red-50 rounded-lg flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-red-800">Supabase Connection Error</h3>
        <p className="mt-1 text-sm text-red-600">
          Please click the "Connect to Supabase" button in the top right corner to set up your database connection.
        </p>
      </div>
    </div>
  );
}