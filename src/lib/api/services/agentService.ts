import { apiClient } from '../client';
import { ENDPOINTS } from '../config';
import type { Agent } from '../../../types';
import type { PaginationParams, PaginatedResponse, AgentCommand } from '../types';
import { withRetry } from '../utils/retry';

export async function getAgents(params?: PaginationParams): Promise<PaginatedResponse<Agent>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());

  const response = await apiClient.get<PaginatedResponse<Agent>>(
    `${ENDPOINTS.agents}?${queryParams}`
  );
  return response.data;
}

export async function getAgentById(agentId: string): Promise<Agent> {
  const response = await apiClient.get<Agent>(`${ENDPOINTS.agents}/${agentId}`);
  return response.data;
}

export async function sendAgentCommand(
  agentId: string,
  command: AgentCommand
): Promise<void> {
  return withRetry(async () => {
    await apiClient.post(`${ENDPOINTS.agents}/${agentId}/commands`, command);
  });
}