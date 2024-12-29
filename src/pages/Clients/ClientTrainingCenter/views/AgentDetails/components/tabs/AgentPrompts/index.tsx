import React from 'react';
import { Brain } from 'lucide-react';
import { useAgentPrompts } from '../../../../../../../../hooks/useAgentPrompts';
import PromptBuilder from '../../../../../../../../components/prompts/PromptBuilder';
import PromptEditor from '../../../../../../../../components/prompts/PromptEditor';
import type { PromptData } from '../../../../../../../../lib/prompts/promptBuilder';

interface AgentPromptsProps {
  clientId: string;
  agentId: string;
  agentName: string;
}

export default function AgentPrompts({ clientId, agentId, agentName }: AgentPromptsProps) {
  const { prompts, loading, savePrompt } = useAgentPrompts(agentId);
  const [activePrompts, setActivePrompts] = React.useState<Record<string, string>>({
    personality: '',
    job: '',
    knowledge: ''
  });

  // Load existing prompts
  React.useEffect(() => {
    if (prompts.length > 0) {
      const newActivePrompts = prompts.reduce((acc, prompt) => ({
        ...acc,
        [prompt.type]: prompt.content
      }), {
        personality: '',
        job: '',
        knowledge: ''
      });
      setActivePrompts(newActivePrompts);
    }
  }, [prompts]);

  const handleSavePrompt = async (type: PromptData['type'], content: string) => {
    try {
      await savePrompt(type, content);
      // Update active prompts immediately after saving
      setActivePrompts(prev => ({
        ...prev,
        [type]: content
      }));
    } catch (error) {
      console.error('Error saving prompt:', error);
    }
  };

  const handlePromptEdit = async (type: keyof typeof activePrompts, content: string) => {
    try {
      await savePrompt(type as PromptData['type'], content);
      setActivePrompts(prev => ({ ...prev, [type]: content }));
    } catch (error) {
      console.error('Error updating prompt:', error);
    }
  };

  if (loading) {
    return <div>Loading prompts...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Brain className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-lg font-medium text-gray-900">Agent Prompts</h2>
          <p className="text-sm text-gray-500">
            Define {agentName}'s personality, role, and knowledge base
          </p>
        </div>
      </div>

      <PromptBuilder 
        agentId={agentId}
        onSave={async (type, content) => {
          await handleSavePrompt(type, content);
        }}
      />

      <div className="border-t pt-8">
        <h3 className="text-lg font-medium mb-6">Working Prompts</h3>
        <div className="grid gap-6">
          {Object.entries(activePrompts).map(([type, content]) => (
            <PromptEditor
              key={type}
              type={type as PromptData['type']}
              content={content}
              onChange={(newContent) => handlePromptEdit(type, newContent)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}