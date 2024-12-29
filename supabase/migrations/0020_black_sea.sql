-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Enable read access for authenticated users" ON agent_qa;
  DROP POLICY IF EXISTS "Enable insert for authenticated users" ON agent_qa;
  DROP POLICY IF EXISTS "Enable update for authenticated users" ON agent_qa;
END $$;

-- Create agent_qa table if it doesn't exist
CREATE TABLE IF NOT EXISTS agent_qa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  name text NOT NULL DEFAULT 'Q&A Entry',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
ALTER TABLE agent_qa ENABLE ROW LEVEL SECURITY;

-- Create new policies with unique names
CREATE POLICY "agent_qa_read_policy"
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

-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS update_agent_qa_updated_at ON agent_qa;
CREATE TRIGGER update_agent_qa_updated_at
  BEFORE UPDATE ON agent_qa
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();