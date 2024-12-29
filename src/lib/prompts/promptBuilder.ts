import { z } from 'zod';

export const PromptTypes = {
  PERSONALITY: 'personality',
  JOB: 'job',
  KNOWLEDGE: 'knowledge'
} as const;

export interface Question {
  id: string;
  question: string;
  hint: string;
}

export const PromptQuestions: Record<keyof typeof PromptTypes, Question[]> = {
  PERSONALITY: [
    {
      id: 'core_traits',
      question: 'What are the core personality traits that define this agent?',
      hint: 'Consider traits like efficiency, diplomacy, leadership, etc.'
    },
    {
      id: 'communication_style',
      question: 'How should the agent communicate with team members?',
      hint: 'Think about tone, formality, and communication patterns'
    },
    {
      id: 'decision_making',
      question: 'What principles guide the agent\'s decision-making process?',
      hint: 'Consider prioritization, risk assessment, and problem-solving approach'
    }
  ],
  JOB: [
    {
      id: 'primary_responsibilities',
      question: 'What are the main responsibilities of this role?',
      hint: 'List key tasks and duties'
    },
    {
      id: 'success_metrics',
      question: 'How is success measured in this role?',
      hint: 'Define key performance indicators and goals'
    },
    {
      id: 'collaboration',
      question: 'How does this role interact with other team members?',
      hint: 'Describe coordination and communication patterns'
    }
  ],
  KNOWLEDGE: [
    {
      id: 'domain_expertise',
      question: 'What specific knowledge domains should the agent master?',
      hint: 'List key areas of expertise required'
    },
    {
      id: 'information_sources',
      question: 'What sources should the agent use for information?',
      hint: 'Consider documentation, databases, APIs, etc.'
    },
    {
      id: 'learning_approach',
      question: 'How should the agent approach learning and knowledge updates?',
      hint: 'Define learning patterns and knowledge maintenance'
    }
  ]
};

export const PromptSchema = z.object({
  type: z.enum(['personality', 'job', 'knowledge']),
  answers: z.record(z.string()),
  agentId: z.string().uuid()
});

export type PromptData = z.infer<typeof PromptSchema>;

export function generatePrompt(data: PromptData): string {
  const questions = PromptQuestions[data.type.toUpperCase() as keyof typeof PromptTypes];
  let prompt = '';

  switch (data.type) {
    case 'personality':
      prompt = `You are an AI agent with the following personality traits:
${data.answers.core_traits}

Your communication style is:
${data.answers.communication_style}

When making decisions, you follow these principles:
${data.answers.decision_making}`;
      break;

    case 'job':
      prompt = `Your primary responsibilities include:
${data.answers.primary_responsibilities}

Success in your role is measured by:
${data.answers.success_metrics}

You collaborate with the team in the following ways:
${data.answers.collaboration}`;
      break;

    case 'knowledge':
      prompt = `Your areas of expertise include:
${data.answers.domain_expertise}

You source information from:
${data.answers.information_sources}

Your approach to learning and knowledge maintenance:
${data.answers.learning_approach}`;
      break;
  }

  return prompt.trim();
}