import React from 'react';
import { Upload } from 'lucide-react';
import { useGoogleDrive } from '../../hooks/useGoogleDrive';

interface DriveUploadProps {
  clientId: string;
}

export default function DriveUpload({ clientId }: DriveUploadProps) {
  const { uploadFile, loading } = useGoogleDrive(clientId);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
      >
        <Upload className="mr-2 h-4 w-4" />
        {loading ? 'Uploading...' : 'Upload Document'}
      </button>
    </div>
  );
}