import React from 'react';
import { z } from 'zod';

const qaSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required')
});

interface QAFormProps {
  onSubmit: (data: { question: string; answer: string }) => void;
  initialData?: { question: string; answer: string };
  onCancel?: () => void;
}

export default function QAForm({ onSubmit, initialData, onCancel }: QAFormProps) {
  const [question, setQuestion] = React.useState(initialData?.question || '');
  const [answer, setAnswer] = React.useState(initialData?.answer || '');
  const [errors, setErrors] = React.useState<{ question?: string; answer?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const data = qaSchema.parse({ question, answer });
      onSubmit(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.reduce((acc, error) => ({
          ...acc,
          [error.path[0]]: error.message
        }), {});
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary ${
            errors.question ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.question && (
          <p className="mt-1 text-sm text-red-600">{errors.question}</p>
        )}
      </div>

      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
          Answer
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary ${
            errors.answer ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.answer && (
          <p className="mt-1 text-sm text-red-600">{errors.answer}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Save
        </button>
      </div>
    </form>
  );
}