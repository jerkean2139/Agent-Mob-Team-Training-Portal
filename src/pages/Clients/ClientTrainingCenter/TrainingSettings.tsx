import React from 'react';
import { Settings, Bot, FileText, MessageSquare } from 'lucide-react';

interface TrainingSettingsProps {
  clientId: string;
}

export default function TrainingSettings({ clientId }: TrainingSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Training Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure how your agents learn and process information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Agent Learning</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Continuous Learning</span>
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Allow agents to learn from interactions</p>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Knowledge Sharing</span>
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Enable knowledge sharing between agents</p>
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

        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Q&A Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Auto-Response</span>
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Enable automatic responses to common questions</p>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Learning from Q&A</span>
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Use Q&A interactions for training</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-900">Advanced Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Learning Rate</label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Response Confidence Threshold</label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}