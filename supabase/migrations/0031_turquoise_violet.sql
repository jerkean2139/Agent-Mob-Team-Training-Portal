-- Drop existing client_integrations table and recreate with correct schema
DROP TABLE IF EXISTS client_integrations CASCADE;

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
ALTER TABLE client_integrations ENABLE ROW LEVEL SECURITY;

-- Create more permissive policies for client_integrations
CREATE POLICY "client_integrations_select_policy"
  ON client_integrations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "client_integrations_insert_policy"
  ON client_integrations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "client_integrations_update_policy"
  ON client_integrations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_client_integrations_client_id ON client_integrations(client_id);
CREATE INDEX IF NOT EXISTS idx_client_integrations_provider ON client_integrations(provider);
CREATE INDEX IF NOT EXISTS idx_client_integrations_user_id ON client_integrations(user_id);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_client_integrations_updated_at ON client_integrations;
CREATE TRIGGER update_client_integrations_updated_at
  BEFORE UPDATE ON client_integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();