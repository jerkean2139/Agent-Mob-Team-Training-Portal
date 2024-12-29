import type { Agent } from '../../../types';

export interface AgentFilters {
  status?: 'active' | 'learning' | 'idle';
  clientId?: string;
  department?: string;
}

export interface AgentUpdateInput {
  name?: string;
  role?: string;
  department?: string;
  status?: string;
  primary_skills?: string[];
  secondary_skills?: string[];
  display_order?: number;
}

export interface AgentResponse {
  data: Agent;
  status: number;
}

export interface AgentListResponse {
  data: Agent[];
  status: number;
}