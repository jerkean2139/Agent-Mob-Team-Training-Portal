import { apiClient } from '../client';
import { ENDPOINTS } from '../config';
import type { AgentMessage } from '../types';
import { withRetry } from '../utils/retry';

export async function sendMessage(agentId: string, content: string): Promise<AgentMessage> {
  return withRetry(async () => {
    const response = await apiClient.post<AgentMessage>(
      `${ENDPOINTS.agents}/${agentId}/messages`,
      { content }
    );
    return response.data;
  });
}

export async function getMessageHistory(agentId: string): Promise<AgentMessage[]> {
  const response = await apiClient.get<AgentMessage[]>(
    `${ENDPOINTS.agents}/${agentId}/messages`
  );
  return response.data;
}