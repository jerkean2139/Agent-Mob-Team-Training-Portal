// Add QA type definition
export interface QA {
  id: string;
  agent_id: string;
  question: string;
  answer: string;
  name: string;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  department: string;
  specialization: string[];
  primary_skills: string[];
  secondary_skills: string[];
  client_id?: string;
  display_order?: number;
  status: 'active' | 'learning' | 'idle';
  created_at: string;
  updated_at: string;
}