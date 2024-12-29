import React from 'react';
import { connectGoogleSheet } from '../../../../../lib/googleSheets';

interface ConnectSheetProps {
  clientId: string;
  onConnect: () => void;
}

export default function ConnectSheet({ clientId, onConnect }: ConnectSheetProps) {
  const [spreadsheetId, setSpreadsheetId] = React.useState('');
  const [ranges, setRanges] = React.useState(['']);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await connectGoogleSheet(clientId, {
        spreadsheetId,
        ranges: ranges.filter(Boolean),
        mappings: {}
      });
      onConnect();
      setSpreadsheetId('');
      setRanges(['']);
    } catch (error) {
      console.error('Error connecting sheet:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRange = () => setRanges([...ranges, '']);
  const removeRange = (index: number) => {
    setRanges(ranges.filter((_, i) => i !== index));
  };

  const updateRange = (index: number, value: string) => {
    setRanges(ranges.map((r, i) => i === index ? value : r));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="spreadsheetId" className="block text-sm font-medium text-gray-700">
          Spreadsheet ID
        </label>
        <input
          type="text"
          id="spreadsheetId"
          value={spreadsheetId}
          onChange={(e) => setSpreadsheetId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Sheet Ranges
        </label>
        {ranges.map((range, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={range}
              onChange={(e) => updateRange(index, e.target.value)}
              placeholder="e.g., Sheet1!A1:D10"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => removeRange(index)}
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRange}
          className="text-sm text-primary hover:text-primary/80"
        >
          + Add Range
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? 'Connecting...' : 'Connect Sheet'}
      </button>
    </form>
  );
}