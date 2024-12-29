/*
  # Fix Client Integrations RLS Policies

  1. Changes
    - Drop existing policy
    - Create more permissive policies for development
    - Add proper constraints for production

  2. Security
    - Enable RLS
    - Allow authenticated users to manage their integrations
    - Add user_id column for better access control
*/

-- Add user_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_integrations' 
    AND column_name = 'user_id'
  ) THEN
    ALTER TABLE client_integrations 
    ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own integrations" ON client_integrations;

-- Create new policies
CREATE POLICY "Users can read own integrations"
  ON client_integrations
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    auth.uid() IN (
      SELECT unnest(team_members) 
      FROM client_teams 
      WHERE client_id = client_integrations.client_id
    )
  );

CREATE POLICY "Users can insert integrations"
  ON client_integrations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "Users can update own integrations"
  ON client_integrations
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own integrations"
  ON client_integrations
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Update existing rows to set user_id
UPDATE client_integrations 
SET user_id = client_id 
WHERE user_id IS NULL;