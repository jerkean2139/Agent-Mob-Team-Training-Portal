import type { Agent } from '../../../types';
import type { AgentResponse, AgentListResponse } from '../types/agents';
import type { TrainingProgress, TrainingResponse } from '../types/training';

export function transformAgentResponse(response: AgentResponse): Agent {
  const { data } = response;
  return {
    ...data,
    created_at: new Date(data.created_at).toISOString(),
    updated_at: new Date(data.updated_at).toISOString()
  };
}

export function transformAgentListResponse(response: AgentListResponse): Agent[] {
  return response.data.map(agent => ({
    ...agent,
    created_at: new Date(agent.created_at).toISOString(),
    updated_at: new Date(agent.updated_at).toISOString()
  }));
}

export function transformTrainingResponse(response: TrainingResponse): TrainingProgress {
  const { data } = response;
  return {
    ...data,
    completedAt: data.completedAt ? new Date(data.completedAt).toISOString() : null,
    createdAt: new Date(data.createdAt).toISOString()
  };
}