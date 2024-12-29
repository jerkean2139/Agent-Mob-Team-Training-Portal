import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { initGoogleApi, authenticateGoogleDrive } from '../lib/google';
import { uploadToDrive } from '../lib/google/upload';
import { useAuth } from './useAuth';

export function useGoogleDrive(clientId: string) {
  const { user } = useAuth();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && clientId) {
      checkConnection();
    }
  }, [user, clientId]);

  const checkConnection = async () => {
    if (!user || !clientId) return;
    
    try {
      const { data, error } = await supabase
        .from('client_integrations')
        .select('*')
        .eq('client_id', clientId)
        .eq('provider', 'google_drive')
        .maybeSingle();

      if (error) throw error;
      setConnected(!!data);
    } catch (err) {
      console.error('Error checking Drive connection:', err);
      setError('Failed to check Drive connection');
    } finally {
      setLoading(false);
    }
  };

  const connect = async () => {
    if (!user || !clientId) {
      setError('Missing required data');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await initGoogleApi();
      await authenticateGoogleDrive();

      // Save integration record
      const { error: insertError } = await supabase
        .from('client_integrations')
        .insert({
          client_id: clientId,
          user_id: user.id,
          provider: 'google_drive',
          access_token: 'temp_token', // Replace with actual token
          metadata: {}
        });

      if (insertError) throw insertError;
      setConnected(true);
    } catch (err) {
      console.error('Drive connection error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to connect to Google Drive');
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!user || !clientId) {
      throw new Error('Missing required data');
    }

    setLoading(true);
    try {
      const response = await uploadToDrive(file);
      
      // Save file reference
      await supabase
        .from('client_resources')
        .insert({
          client_id: clientId,
          type: 'document',
          name: file.name,
          metadata: {
            drive_file_id: response.fileId,
            drive_web_link: response.webViewLink,
            size: file.size,
            type: file.type
          }
        });

      return response;
    } catch (err) {
      console.error('Upload error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    connected,
    loading,
    error,
    connect,
    uploadFile
  };
}