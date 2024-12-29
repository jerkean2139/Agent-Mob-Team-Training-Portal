import { apiClient } from '../client';
import { ENDPOINTS } from '../config';
import type { TrainingStatus } from '../training';
import { withRetry } from '../utils/retry';

export async function initiateTraining(
  agentId: string,
  options?: {
    mode?: 'full' | 'incremental';
    customData?: Record<string, unknown>;
  }
): Promise<{ trainingId: string }> {
  return withRetry(async () => {
    const response = await apiClient.post<{ trainingId: string }>(
      `${ENDPOINTS.training}/${agentId}/start`,
      options
    );
    return response.data;
  });
}

export async function monitorTraining(
  agentId: string,
  trainingId: string
): Promise<TrainingStatus> {
  const response = await apiClient.get<TrainingStatus>(
    `${ENDPOINTS.training}/${agentId}/status/${trainingId}`
  );
  return response.data;
}