import React from 'react';
import { Bot } from 'lucide-react';

interface AgentCountProps {
  onNext: (count: number) => void;
}

export default function AgentCount({ onNext }: AgentCountProps) {
  const [additionalCount, setAdditionalCount] = React.useState(0);

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900">Build Your Agent Mob</h2>
        <p className="mt-2 text-gray-600">
          Your team starts with Donna, the Traffic Controller. How many additional agents would you like?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="agentCount" className="block text-sm font-medium text-gray-700">
            Additional Agents
          </label>
          <input
            type="number"
            id="agentCount"
            min="0"
            max="9"
            value={additionalCount}
            onChange={(e) => setAdditionalCount(parseInt(e.target.value, 10))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
          <p className="mt-1 text-sm text-gray-500">
            You can add up to 9 additional agents to work with Donna
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-medium text-gray-900">Donna - Traffic Controller</h3>
              <p className="text-sm text-gray-600">Always included as your core team member</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNext(additionalCount)}
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Continue to Agent Selection
        </button>
      </div>
    </div>
  );
}