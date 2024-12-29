// This would normally be loaded from environment variables
export const SERVICE_ACCOUNT = {
  type: 'service_account',
  project_id: import.meta.env.VITE_GOOGLE_PROJECT_ID,
  private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY,
  client_email: import.meta.env.VITE_GOOGLE_CLIENT_EMAIL,
  token_uri: 'https://oauth2.googleapis.com/token'
};