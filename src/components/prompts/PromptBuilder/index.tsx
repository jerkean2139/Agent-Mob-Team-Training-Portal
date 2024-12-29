import React from 'react';
import { Wand2 } from 'lucide-react';
import { PromptQuestions, generatePrompt } from '../../../lib/prompts/promptBuilder';
import type { PromptData } from '../../../lib/prompts/promptBuilder';
import PromptTypeSelector from './PromptTypeSelector';
import QuestionForm from './QuestionForm';
import PromptPreview from './PromptPreview';
import PromptProgress from './PromptProgress';

interface PromptBuilderProps {
  agentId: string;
  onSave: (type: PromptData['type'], prompt: string) => Promise<void>;
}

export default function PromptBuilder({ agentId, onSave }: PromptBuilderProps) {
  const [step, setStep] = React.useState(1);
  const [selectedType, setSelectedType] = React.useState<PromptData['type']>('personality');
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const handleTypeSelect = (type: PromptData['type']) => {
    setSelectedType(type);
    setStep(2);
    setAnswers({});
    setGeneratedPrompt('');
    setSaved(false);
  };

  const handleAnswerSubmit = (newAnswers: Record<string, string>) => {
    setAnswers(newAnswers);
    const prompt = generatePrompt({
      type: selectedType,
      answers: newAnswers,
      agentId
    });
    setGeneratedPrompt(prompt);
    setStep(3);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!generatedPrompt) return;
    
    setSaving(true);
    try {
      await onSave(selectedType, generatedPrompt);
      setSaved(true);
    } catch (error) {
      console.error('Error saving prompt:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleContinue = () => {
    const types: PromptData['type'][] = ['personality', 'job', 'knowledge'];
    const currentIndex = types.indexOf(selectedType);
    if (currentIndex < types.length - 1) {
      const nextType = types[currentIndex + 1];
      setSelectedType(nextType);
      setStep(2);
      setAnswers({});
      setGeneratedPrompt('');
      setSaved(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Wand2 className="w-5 h-5" />
          <h2 className="text-lg font-medium">Prompt Builder</h2>
        </div>
        <PromptProgress currentType={selectedType} />
      </div>

      {step === 1 && (
        <PromptTypeSelector
          onSelect={handleTypeSelect}
          currentType={selectedType}
        />
      )}

      {step === 2 && (
        <QuestionForm
          questions={getQuestionsForType(selectedType)}
          onSubmit={handleAnswerSubmit}
          onBack={() => setStep(1)}
          type={selectedType}
        />
      )}

      {step === 3 && (
        <PromptPreview
          prompt={generatedPrompt}
          type={selectedType}
          onEdit={() => setStep(2)}
          onSave={handleSave}
          onContinue={handleContinue}
          saving={saving}
          saved={saved}
        />
      )}
    </div>
  );
}

function getQuestionsForType(type: PromptData['type']) {
  const key = type.toUpperCase() as keyof typeof PromptQuestions;
  return PromptQuestions[key] || [];
}