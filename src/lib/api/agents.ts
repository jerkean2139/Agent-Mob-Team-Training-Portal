import { apiClient } from './client';
import { ENDPOINTS } from './config';
import type { Agent } from '../../types';

export async function getAgents(): Promise<Agent[]> {
  const response = await apiClient.get<Agent[]>(ENDPOINTS.agents);
  return response.data;
}

export async function getAgentStatus(agentId: string) {
  const response = await apiClient.get<{ status: string }>(
    `${ENDPOINTS.agents}/${agentId}/status`
  );
  return response.data;
}

export async function sendMessage(agentId: string, message: string) {
  const response = await apiClient.post<{ id: string }>(
    `${ENDPOINTS.agents}/${agentId}/messages`,
    { message }
  );
  return response.data;
}