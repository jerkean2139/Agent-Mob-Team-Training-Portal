export const GOOGLE_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
};

export function isDevelopment() {
  return import.meta.env.DEV || isWebContainer();
}

export function isWebContainer() {
  return typeof window !== 'undefined' && window.location.hostname.includes('webcontainer');
}