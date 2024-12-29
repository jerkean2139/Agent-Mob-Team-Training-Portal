import { apiClient } from './client';
import { ENDPOINTS } from './config';

export interface TrainingStatus {
  completed: boolean;
  progress: number;
  currentStage: string;
}

export async function startTraining(agentId: string) {
  const response = await apiClient.post<{ id: string }>(
    `${ENDPOINTS.training}/${agentId}/start`,
    {}
  );
  return response.data;
}

export async function getTrainingStatus(agentId: string) {
  const response = await apiClient.get<TrainingStatus>(
    `${ENDPOINTS.training}/${agentId}/status`
  );
  return response.data;
}