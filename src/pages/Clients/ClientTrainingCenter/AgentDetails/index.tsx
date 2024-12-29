import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bot, ArrowLeft, Brain, MessageSquare, FileText, Settings } from 'lucide-react';
import { useAgents } from '../../../../hooks/useAgents';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../components/ui/Tabs';
import KnowledgeBase from './KnowledgeBase';
import QASection from './QASection';
import PromptBuilder from './PromptBuilder';
import TrainingSettings from './TrainingSettings';

export default function AgentDetails() {
  const { clientId, agentId } = useParams<{ clientId: string; agentId: string }>();
  const { agents } = useAgents(clientId);
  const agent = agents.find(a => a.id === agentId);

  if (!agent) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-6 pb-6 border-b">
        <Link
          to={`/clients/${clientId}/training`}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
            <p className="text-gray-500">{agent.role}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="knowledge">
        <TabsList>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="qa" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Q&A Management
          </TabsTrigger>
          <TabsTrigger value="prompts" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Prompt Builder
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="knowledge">
          <KnowledgeBase clientId={clientId} agentId={agentId} />
        </TabsContent>
        
        <TabsContent value="qa">
          <QASection clientId={clientId} />
        </TabsContent>
        
        <TabsContent value="prompts">
          <PromptBuilder clientId={clientId} />
        </TabsContent>
        
        <TabsContent value="settings">
          <TrainingSettings clientId={clientId} agentId={agentId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}