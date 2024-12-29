-- Drop existing tables if they exist
DROP TABLE IF EXISTS agent_qa CASCADE;
DROP TABLE IF EXISTS client_integrations CASCADE;

-- Create agent_qa table with correct schema
CREATE TABLE agent_qa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  name text NOT NULL DEFAULT 'Q&A Entry',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_question_per_agent UNIQUE (agent_id, question)
);

-- Create client_integrations table
CREATE TABLE client_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  provider text NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_client_provider UNIQUE (client_id, provider)
);

-- Enable RLS
ALTER TABLE agent_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_integrations ENABLE ROW LEVEL SECURITY;

-- Create policies for agent_qa
CREATE POLICY "agent_qa_select_policy"
  ON agent_qa
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "agent_qa_insert_policy"
  ON agent_qa
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "agent_qa_update_policy"
  ON agent_qa
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "agent_qa_delete_policy"
  ON agent_qa
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for client_integrations
CREATE POLICY "client_integrations_select_policy"
  ON client_integrations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = client_integrations.client_id 
      AND auth.uid() = ANY(team_members)
    )
  );

CREATE POLICY "client_integrations_insert_policy"
  ON client_integrations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = client_integrations.client_id 
      AND auth.uid() = ANY(team_members)
    )
  );

CREATE POLICY "client_integrations_update_policy"
  ON client_integrations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = client_integrations.client_id 
      AND auth.uid() = ANY(team_members)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = client_integrations.client_id 
      AND auth.uid() = ANY(team_members)
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agent_qa_agent_id ON agent_qa(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_qa_status ON agent_qa(status);
CREATE INDEX IF NOT EXISTS idx_agent_qa_created_at ON agent_qa(created_at);
CREATE INDEX IF NOT EXISTS idx_client_integrations_client_id ON client_integrations(client_id);
CREATE INDEX IF NOT EXISTS idx_client_integrations_provider ON client_integrations(provider);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_agent_qa_updated_at ON agent_qa;
CREATE TRIGGER update_agent_qa_updated_at
  BEFORE UPDATE ON agent_qa
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_integrations_updated_at ON client_integrations;
CREATE TRIGGER update_client_integrations_updated_at
  BEFORE UPDATE ON client_integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();