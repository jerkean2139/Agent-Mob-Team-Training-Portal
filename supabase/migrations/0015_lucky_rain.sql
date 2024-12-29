-- Add display_order and status columns if they don't exist
ALTER TABLE agents 
ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Add client_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'agents' AND column_name = 'client_id'
  ) THEN
    ALTER TABLE agents ADD COLUMN client_id uuid REFERENCES clients(id);
  END IF;
END $$;

-- Update RLS policies
DROP POLICY IF EXISTS "Enable read access for agents" ON agents;
DROP POLICY IF EXISTS "Enable insert for agents" ON agents;
DROP POLICY IF EXISTS "Enable update for agents" ON agents;

CREATE POLICY "Enable read access for agents"
  ON agents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for agents"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for agents"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);