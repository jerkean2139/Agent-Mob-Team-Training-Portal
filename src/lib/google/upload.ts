import { supabase } from '../supabase/client';

export interface UploadResponse {
  fileId: string;
  webViewLink: string;
}

export async function uploadToDrive(file: File): Promise<UploadResponse> {
  try {
    // Validate file size (max 10MB for example)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit');
    }

    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });

    // Call Supabase REST endpoint instead of Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/upload_to_drive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        name: file.name,
        type: file.type,
        content: base64
      })
    });

    if (!response.ok) {
      throw new Error('Failed to upload file to Drive');
    }

    const data = await response.json();
    if (!data || !data.fileId) {
      throw new Error('Invalid response from upload service');
    }

    return data;
  } catch (err) {
    console.error('Upload error:', err);
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Failed to upload file');
  }
}