-- Drop existing policies
DROP POLICY IF EXISTS "client_integrations_select_policy" ON client_integrations;
DROP POLICY IF EXISTS "client_integrations_insert_policy" ON client_integrations;
DROP POLICY IF EXISTS "client_integrations_update_policy" ON client_integrations;

-- Create new, more permissive policies
CREATE POLICY "allow_select_client_integrations"
  ON client_integrations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_insert_client_integrations"
  ON client_integrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "allow_update_client_integrations"
  ON client_integrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);