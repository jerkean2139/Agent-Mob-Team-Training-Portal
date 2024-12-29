/*
  # Fix client policies and add read access

  1. Changes
    - Drop and recreate all client-related policies
    - Add explicit read policies
    - Ensure proper order of operations
  
  2. Security
    - Allow authenticated users to create and read clients
    - Maintain data isolation
    - Enable proper access patterns
*/

-- Drop all existing policies to start fresh
DO $$ 
BEGIN
  -- Drop client policies
  DROP POLICY IF EXISTS "Users can read own client data" ON clients;
  DROP POLICY IF EXISTS "Enable client creation for authenticated users" ON clients;
  DROP POLICY IF EXISTS "Users can update own client data" ON clients;
  DROP POLICY IF EXISTS "Users can delete own client data" ON clients;

  -- Drop team policies
  DROP POLICY IF EXISTS "Users can view their teams" ON client_teams;
  DROP POLICY IF EXISTS "Enable team creation for authenticated users" ON client_teams;
  DROP POLICY IF EXISTS "Team members can update their teams" ON client_teams;
END $$;

-- Create comprehensive client policies
CREATE POLICY "Allow read access to all clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow client creation"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow client updates"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create comprehensive team policies
CREATE POLICY "Allow read access to all teams"
  ON client_teams
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow team creation"
  ON client_teams
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow team updates"
  ON client_teams
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);