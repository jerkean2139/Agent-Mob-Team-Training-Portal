import React from 'react';
import { Settings, Brain, FileText, MessageSquare } from 'lucide-react';

interface TrainingSettingsProps {
  clientId: string;
  agentId: string;
}

export default function TrainingSettings({ clientId, agentId }: TrainingSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Training Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure how this agent learns and processes information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Learning Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Continuous Learning</span>
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Allow agent to learn from interactions</p>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Knowledge Sharing</span>
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Share knowledge with other agents</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Resource Processing</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Auto-Categorization</span>
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Automatically categorize new resources</p>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Content Extraction</span>
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Extract key information from documents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}