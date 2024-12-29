import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Question } from '../../../lib/prompts/promptBuilder';

interface QuestionFormProps {
  questions: Question[];
  type: 'personality' | 'job' | 'knowledge';
  onSubmit: (answers: Record<string, string>) => void;
  onBack: () => void;
}

export default function QuestionForm({ questions = [], type, onSubmit, onBack }: QuestionFormProps) {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const titles = {
    personality: 'Personality & Style Questions',
    job: 'Job Description Questions',
    knowledge: 'Knowledge Base Questions'
  };

  if (!questions.length) {
    return <div>No questions available for this prompt type.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to prompt types
        </button>
        <h3 className="text-lg font-medium text-gray-900">{titles[type]}</h3>
      </div>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="space-y-2">
            <label className="block font-medium">
              {index + 1}. {q.question}
            </label>
            <p className="text-sm text-gray-500">{q.hint}</p>
            <textarea
              value={answers[q.id] || ''}
              onChange={(e) => setAnswers(prev => ({
                ...prev,
                [q.id]: e.target.value
              }))}
              className="w-full h-32 p-3 border rounded-md focus:ring-primary focus:border-primary"
              placeholder="Enter your answer..."
              required
            />
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Generate Prompt
        </button>
      </div>
    </form>
  );
}