import { supabase } from '../supabase/client';
import { getCurrentUser } from '../auth/service';
import { GOOGLE_CONFIG } from './config';

let apiInitialized = false;

export async function initGoogleApi() {
  if (apiInitialized) return;

  return new Promise<void>((resolve, reject) => {
    if (typeof gapi === 'undefined') {
      reject(new Error('Google API not loaded'));
      return;
    }

    try {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: GOOGLE_CONFIG.apiKey,
            clientId: GOOGLE_CONFIG.clientId,
            scope: GOOGLE_CONFIG.scope,
            discoveryDocs: GOOGLE_CONFIG.discoveryDocs
          });

          // Initialize auth2 explicitly
          const auth2 = await gapi.auth2.init({
            client_id: GOOGLE_CONFIG.clientId,
            scope: GOOGLE_CONFIG.scope
          });

          // Handle initial sign-in state
          if (auth2.isSignedIn.get()) {
            const googleUser = auth2.currentUser.get();
            await handleAuthResponse(googleUser.getAuthResponse(true));
          }

          apiInitialized = true;
          resolve();
        } catch (error: any) {
          console.error('Failed to initialize Google API:', error);
          reject(error);
        }
      });
    } catch (error) {
      reject(new Error('Failed to load Google API client'));
    }
  });
}

async function handleAuthResponse(authResponse: any) {
  const user = await getCurrentUser();
  if (!user) return;

  try {
    await supabase.from('client_integrations').upsert({
      user_id: user.id,
      provider: 'google_drive',
      access_token: authResponse.access_token,
      refresh_token: authResponse.refresh_token,
      expires_at: new Date(authResponse.expires_at).toISOString()
    });
  } catch (error) {
    console.error('Failed to save auth response:', error);
    throw error;
  }
}

export async function checkDriveConnection() {
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('client_integrations')
      .select('*')
      .eq('provider', 'google_drive')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Failed to check Drive connection:', error);
    return false;
  }
}