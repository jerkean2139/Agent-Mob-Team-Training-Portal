import { GOOGLE_CONFIG, isDevelopment, getDriveIntegrationStatus } from './config';
import { supabase } from '../supabase/client';
import { getCurrentUser } from '../supabase/auth';

export async function authenticateGoogleDrive() {
  // In development, simulate successful authentication
  if (isDevelopment()) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('client_integrations')
      .upsert({
        provider: 'google_drive',
        access_token: 'dev_access_token',
        refresh_token: 'dev_refresh_token',
        expires_at: new Date(Date.now() + 3600000).toISOString(),
        user_id: user.id
      });

    if (error) throw error;
    return true;
  }

  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const auth = gapi.auth2.getAuthInstance();
    const googleUser = await auth.signIn({
      prompt: 'select_account'
    });
    
    const authResponse = googleUser.getAuthResponse(true);
    
    const { error } = await supabase
      .from('client_integrations')
      .upsert({
        provider: 'google_drive',
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_at: new Date(authResponse.expires_at).toISOString(),
        user_id: user.id
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Google Drive authentication failed:', error);
    throw error;
  }
}