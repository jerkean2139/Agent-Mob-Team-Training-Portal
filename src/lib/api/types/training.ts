export interface TrainingInput {
  agentId: string;
  type: 'personality' | 'job' | 'knowledge';
  content: string;
}

export interface TrainingProgress {
  id: string;
  agentId: string;
  stage: string;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
}

export interface TrainingResponse {
  data: TrainingProgress;
  status: number;
}