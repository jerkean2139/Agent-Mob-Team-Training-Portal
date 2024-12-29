export const getAvatarConfig = (name: string) => {
  const configs: Record<string, { hair: string; hairColor: string; accessories?: string }> = {
    Marcus: { hair: 'short', hairColor: 'black', accessories: 'round' },
    Sarah: { hair: 'long', hairColor: 'blonde' },
    Alex: { hair: 'short', hairColor: 'brown', accessories: 'tiny' },
    Emma: { hair: 'long', hairColor: 'auburn' },
    James: { hair: 'short', hairColor: 'gray', accessories: 'prescription02' },
    Maya: { hair: 'long', hairColor: 'black' },
    Lucas: { hair: 'short', hairColor: 'blonde' },
    Sophia: { hair: 'long', hairColor: 'brown' },
    Oliver: { hair: 'short', hairColor: 'brown', accessories: 'prescription01' }
  };
  return configs[name] || { hair: 'short', hairColor: 'brown' };
};