import React from 'react';
import { Upload } from 'lucide-react';
import { ACCEPTED_FILE_TYPES } from '../../lib/documents/types';

interface DocumentUploadProps {
  onUpload: (file: File) => Promise<void>;
  disabled?: boolean;
  className?: string;
}

export default function DocumentUpload({ onUpload, disabled, className = '' }: DocumentUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await onUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const acceptedTypes = Object.values(ACCEPTED_FILE_TYPES).join(',');

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || uploading}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />
        {uploading ? 'Uploading...' : 'Upload Document'}
      </button>
    </div>
  );
}