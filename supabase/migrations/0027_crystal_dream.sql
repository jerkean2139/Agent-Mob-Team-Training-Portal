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

-- Create policies with unique names
CREATE POLICY "agent_qa_read_policy_v7"
  ON agent_qa
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "agent_qa_insert_policy_v7"
  ON agent_qa
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "agent_qa_update_policy_v7"
  ON agent_qa
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agent_qa_agent_id_v5 ON agent_qa(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_qa_status_v5 ON agent_qa(status);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_agent_qa_updated_at ON agent_qa;
CREATE TRIGGER update_agent_qa_updated_at
  BEFORE UPDATE ON agent_qa
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();