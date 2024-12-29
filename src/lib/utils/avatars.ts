import type { Agent } from '../../types';

// Avatar configurations for each agent
export const AGENT_AVATARS = {
  Donna: {
    hair: 'long',
    hairColor: 'red',
    eyes: 'default',
    mouth: 'smile',
    clothes: 'blazer'
  },
  Marcus: {
    hair: 'short',
    hairColor: 'black',
    accessories: 'round',
    clothes: 'hoodie'
  },
  Sarah: {
    hair: 'long',
    hairColor: 'blonde',
    clothes: 'blazerAndShirt'
  },
  Alex: {
    hair: 'short',
    hairColor: 'brown',
    accessories: 'tiny',
    clothes: 'shirt'
  },
  Emma: {
    hair: 'long',
    hairColor: 'auburn',
    clothes: 'blazerSweater'
  },
  James: {
    hair: 'short',
    hairColor: 'gray',
    accessories: 'prescription02',
    clothes: 'shirt'
  },
  Maya: {
    hair: 'long',
    hairColor: 'black',
    clothes: 'blazer'
  },
  Lucas: {
    hair: 'short',
    hairColor: 'blonde',
    clothes: 'hoodie'
  },
  Sophia: {
    hair: 'long',
    hairColor: 'brown',
    clothes: 'blazerShirt'
  },
  Oliver: {
    hair: 'short',
    hairColor: 'brown',
    accessories: 'prescription01',
    clothes: 'shirt'
  }
} as const;

export function getAgentAvatarUrl(agent: Agent): string {
  const config = AGENT_AVATARS[agent.name as keyof typeof AGENT_AVATARS] || {
    hair: 'short',
    hairColor: 'brown',
    clothes: 'shirt'
  };

  const params = new URLSearchParams({
    seed: agent.name,
    hair: config.hair,
    hairColor: config.hairColor,
    eyes: config.eyes || 'default',
    mouth: config.mouth || 'smile',
    skin: 'light',
    clothes: config.clothes || 'blazer'
  });

  if (config.accessories) {
    params.append('accessories', config.accessories);
  }

  return `https://api.dicebear.com/7.x/avataaars/svg?${params.toString()}`;
}