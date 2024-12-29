import React from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../../../../lib/supabase';
import WorkflowCard from './WorkflowCard';

interface WorkflowsProps {
  clientId: string;
}

export default function Workflows({ clientId }: WorkflowsProps) {
  const [workflows, setWorkflows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchWorkflows() {
      try {
        const { data, error } = await supabase
          .from('workflows')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setWorkflows(data || []);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      } finally {
        setLoading(false);
      }
    }

    if (clientId) {
      fetchWorkflows();
    }
  }, [clientId]);

  const handleEdit = (id: string) => {
    // Implement workflow editing
    console.log('Edit workflow:', id);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workflows')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setWorkflows(workflows.filter(w => w.id !== id));
    } catch (error) {
      console.error('Error deleting workflow:', error);
    }
  };

  const handleRun = (id: string) => {
    // Implement workflow execution
    console.log('Run workflow:', id);
  };

  if (loading) {
    return <div>Loading workflows...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Workflows</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRun={handleRun}
          />
        ))}
        {workflows.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No workflows created yet. Click the button above to create your first workflow.
          </p>
        )}
      </div>
    </div>
  );
}