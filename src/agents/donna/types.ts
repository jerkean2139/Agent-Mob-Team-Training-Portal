export interface Task {
  id: string;
  type: 'research' | 'content' | 'analysis' | 'support';
  priority: 'low' | 'medium' | 'high';
  description: string;
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  status: 'active' | 'completed' | 'paused';
  created_at: string;
  updated_at: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed';
  dependencies?: string[];
}

export interface TeamCoordination {
  teamId: string;
  members: string[];
  workload: Record<string, number>;
  availability: Record<string, boolean>;
}