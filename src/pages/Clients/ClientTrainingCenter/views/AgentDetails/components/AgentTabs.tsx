import React from 'react';
import { Brain, MessageSquare, FileText, Settings } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../../../components/ui/Tabs';
import type { Agent } from '../../../../../../types';
import AgentPrompts from './tabs/AgentPrompts';
import AgentQA from './tabs/AgentQA';
import AgentKnowledge from './tabs/AgentKnowledge';
import AgentSettings from './tabs/AgentSettings';

interface AgentTabsProps {
  agent: Agent;
  clientId: string;
}

export default function AgentTabs({ agent, clientId }: AgentTabsProps) {
  return (
    <Tabs defaultValue="prompts">
      <TabsList>
        <TabsTrigger value="prompts" className="flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Prompts
        </TabsTrigger>
        <TabsTrigger value="qa" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Q&A
        </TabsTrigger>
        <TabsTrigger value="knowledge" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Knowledge Base
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="prompts">
        <AgentPrompts 
          clientId={clientId}
          agentId={agent.id}
          agentName={agent.name}
        />
      </TabsContent>
      
      <TabsContent value="qa">
        <AgentQA 
          clientId={clientId} 
          agentId={agent.id} 
        />
      </TabsContent>
      
      <TabsContent value="knowledge">
        <AgentKnowledge 
          clientId={clientId} 
          agentId={agent.id} 
        />
      </TabsContent>
      
      <TabsContent value="settings">
        <AgentSettings 
          clientId={clientId} 
          agentId={agent.id} 
        />
      </TabsContent>
    </Tabs>
  );
}