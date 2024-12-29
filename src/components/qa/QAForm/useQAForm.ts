import React from 'react';
import { type QAFormData, validateQAForm } from './validation';

interface UseQAFormProps {
  initialData?: QAFormData;
  onSubmit: (data: QAFormData) => Promise<void>;
}

export function useQAForm({ initialData, onSubmit }: UseQAFormProps) {
  const [formData, setFormData] = React.useState<QAFormData>({
    question: initialData?.question || '',
    answer: initialData?.answer || ''
  });
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateQAForm(formData);
    if (validation.error) {
      setError(validation.error);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(validation.data!);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save Q&A');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    error,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}