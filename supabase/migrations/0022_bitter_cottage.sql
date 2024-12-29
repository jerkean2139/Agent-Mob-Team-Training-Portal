-- Drop existing agent_qa table and recreate with correct schema
DROP TABLE IF EXISTS agent_qa CASCADE;

CREATE TABLE agent_qa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  name text NOT NULL DEFAULT 'Q&A Entry',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE agent_qa ENABLE ROW LEVEL SECURITY;

-- Create new policies with unique names
CREATE POLICY "agent_qa_read_policy_v2"
  ON agent_qa
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "agent_qa_insert_policy_v2"
  ON agent_qa
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "agent_qa_update_policy_v2"
  ON agent_qa
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_agent_qa_agent_id ON agent_qa(agent_id);
CREATE INDEX idx_agent_qa_status ON agent_qa(status);

-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for agent_qa
DROP TRIGGER IF EXISTS update_agent_qa_updated_at ON agent_qa;
CREATE TRIGGER update_agent_qa_updated_at
  BEFORE UPDATE ON agent_qa
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();