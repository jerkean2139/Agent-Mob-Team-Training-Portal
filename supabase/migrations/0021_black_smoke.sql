-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Enable read access for authenticated users" ON client_resources;
  DROP POLICY IF EXISTS "Enable insert for authenticated users" ON client_resources;
  DROP POLICY IF EXISTS "Enable update for authenticated users" ON client_resources;
  DROP POLICY IF EXISTS "client_resources_read_policy" ON client_resources;
  DROP POLICY IF EXISTS "client_resources_insert_policy" ON client_resources;
  DROP POLICY IF EXISTS "client_resources_update_policy" ON client_resources;
END $$;

-- Add default name to client_resources
ALTER TABLE client_resources
ALTER COLUMN name SET DEFAULT 'Untitled Resource';

-- Add missing indexes
CREATE INDEX IF NOT EXISTS idx_client_resources_client_id ON client_resources(client_id);
CREATE INDEX IF NOT EXISTS idx_client_resources_type ON client_resources(type);

-- Create new policies with unique names
CREATE POLICY "client_resources_read_policy_v2"
  ON client_resources
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "client_resources_insert_policy_v2"
  ON client_resources
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "client_resources_update_policy_v2"
  ON client_resources
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

-- Create trigger for client_resources if it doesn't exist
DROP TRIGGER IF EXISTS update_client_resources_updated_at ON client_resources;
CREATE TRIGGER update_client_resources_updated_at
  BEFORE UPDATE ON client_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();