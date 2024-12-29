import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { getAgents } from '../../lib/api/services/agentService';
import type { Agent } from '../../types';

export default function AgentList() {
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await getAgents();
        setAgents(response.data);
      } catch (err) {
        setError('Failed to load agents');
        console.error('Error fetching agents:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  if (loading) return <div>Loading agents...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <div 
          key={agent.id}
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <Bot className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-medium">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}