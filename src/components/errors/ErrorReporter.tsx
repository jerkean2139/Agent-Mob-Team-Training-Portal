import React from 'react';
import { Camera } from 'lucide-react';
import { addErrorScreenshot } from '../../lib/logging/errorLogger';

interface ErrorReporterProps {
  errorId: string;
  onScreenshotAdded: () => void;
}

export default function ErrorReporter({ errorId, onScreenshotAdded }: ErrorReporterProps) {
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await addErrorScreenshot(errorId, file);
      onScreenshotAdded();
    } catch (error) {
      console.error('Failed to upload screenshot:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleScreenshotUpload}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        <Camera className="w-4 h-4" />
        {uploading ? 'Uploading...' : 'Add Screenshot'}
      </button>
    </div>
  );
}