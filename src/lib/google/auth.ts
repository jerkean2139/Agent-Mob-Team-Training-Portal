import { supabase } from '../supabase/client';
import { getCurrentUser } from '../auth/service';
import { isDevelopment } from './config';

export async function authenticateGoogleDrive() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  // In development, simulate successful authentication
  if (isDevelopment()) {
    const { error } = await supabase
      .from('client_integrations')
      .insert({
        user_id: user.id,
        provider: 'google_drive',
        access_token: 'dev_access_token',
        refresh_token: 'dev_refresh_token',
        expires_at: new Date(Date.now() + 3600000).toISOString()
      });

    if (error) throw error;
    return true;
  }

  try {
    const auth2 = gapi.auth2.getAuthInstance();
    
    // Force the Google Account Chooser
    const googleUser = await auth2.signIn({
      prompt: 'select_account',
      ux_mode: 'popup'
    });
    
    const authResponse = googleUser.getAuthResponse(true);
    
    const { error } = await supabase
      .from('client_integrations')
      .insert({
        user_id: user.id,
        provider: 'google_drive',
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_at: new Date(authResponse.expires_at).toISOString()
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Google Drive authentication failed:', error);
    throw error;
  }
}