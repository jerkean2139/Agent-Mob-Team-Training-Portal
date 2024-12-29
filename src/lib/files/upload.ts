import { supabase } from '../supabase/client';

export interface UploadResponse {
  id: string;
  name: string;
  type: string;
  size: number;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  try {
    // Validate file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit');
    }

    // Call the upload_file function
    const { data, error } = await supabase
      .rpc('upload_file', {
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        file_content: await fileToBase64(file)
      });

    if (error) throw error;
    return data as UploadResponse;
  } catch (err) {
    console.error('Upload error:', err);
    throw new Error('Failed to upload file');
  }
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}