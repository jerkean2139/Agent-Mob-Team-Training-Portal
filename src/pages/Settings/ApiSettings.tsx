import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function ApiSettings() {
  const [copied, setCopied] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = async () => {
    setLoading(true);
    // Implement key regeneration logic
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-medium text-gray-900 mb-4">API Keys</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="text"
                value="sk_test_51Hb3q2DKs8kK8K8kK8K8kK8K8"
                readOnly
                className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCopy('sk_test_51Hb3q2DKs8kK8K8kK8K8kK8K8')}
              className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <Copy className="h-4 w-4" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div>
          <button
            onClick={handleRegenerateKey}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {loading ? 'Regenerating...' : 'Regenerate Key'}
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Regenerating your API key will invalidate your existing key.
          </p>
        </div>
      </div>
    </div>
  );
}