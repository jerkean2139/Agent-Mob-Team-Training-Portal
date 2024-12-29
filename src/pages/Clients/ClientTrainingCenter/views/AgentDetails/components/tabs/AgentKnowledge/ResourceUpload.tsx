import React from 'react';
import { Upload } from 'lucide-react';

interface ResourceUploadProps {
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
}

export default function ResourceUpload({ onUpload, uploading }: ResourceUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await onUpload(file);
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
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />
        {uploading ? 'Uploading...' : 'Upload Document'}
      </button>
    </div>
  );
}