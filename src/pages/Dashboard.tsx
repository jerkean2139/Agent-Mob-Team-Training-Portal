import React from 'react';
import { BarChart2, Users, Bot, Briefcase, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { useAgents } from '../hooks/useAgents';
import { supabase } from '../lib/supabase';
import ErrorList from '../components/errors/ErrorList';
import type { ErrorLog } from '../lib/logging/errorLogger';

const stats = [
  { name: 'Active Projects', value: '12', icon: Briefcase, change: '+2.5%', changeType: 'increase' },
  { name: 'Team Members', value: '24', icon: Users, change: '+3.2%', changeType: 'increase' },
  { name: 'Active Agents', value: '36', icon: Bot, change: '+14%', changeType: 'increase' },
  { name: 'Performance', value: '96%', icon: BarChart2, change: '+1.2%', changeType: 'increase' },
];

export default function Dashboard() {
  const { agents } = useAgents();
  const [errors, setErrors] = React.useState<ErrorLog[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchErrors();
  }, []);

  const fetchErrors = async () => {
    try {
      const { data, error } = await supabase
        .from('error_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setErrors(data || []);
    } catch (err) {
      console.error('Failed to fetch errors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (errorId: string, status: ErrorLog['status']) => {
    try {
      const { error } = await supabase
        .from('error_logs')
        .update({ status })
        .eq('id', errorId);

      if (error) throw error;
      fetchErrors();
    } catch (err) {
      console.error('Failed to update error status:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-[#6A6A4B] p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            {/* Activity feed content */}
          </div>
        </div>

        {/* Error Monitoring */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-medium text-gray-900">Recent Errors</h2>
              </div>
              <span className="text-sm text-gray-500">
                Last {errors.length} errors
              </span>
            </div>

            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading errors...</div>
            ) : errors.length > 0 ? (
              <ErrorList errors={errors} onStatusChange={handleStatusChange} />
            ) : (
              <div className="text-center py-4 text-gray-500">
                No errors to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}