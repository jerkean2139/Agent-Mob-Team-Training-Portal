import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/Tabs';
import Documents from './Documents';
import Sheets from './Sheets';
import Prompts from './Prompts';

interface ResourcesProps {
  clientId: string;
}

export default function Resources({ clientId }: ResourcesProps) {
  return (
    <Tabs defaultValue="documents">
      <TabsList>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="sheets">Google Sheets</TabsTrigger>
        <TabsTrigger value="prompts">Prompts</TabsTrigger>
      </TabsList>
      
      <TabsContent value="documents">
        <Documents clientId={clientId} />
      </TabsContent>
      <TabsContent value="sheets">
        <Sheets clientId={clientId} />
      </TabsContent>
      <TabsContent value="prompts">
        <Prompts clientId={clientId} />
      </TabsContent>
    </Tabs>
  );
}