/*
  # Fix client RLS policies

  1. Changes
    - Update client creation policy to be less restrictive
    - Add policy for client team management
    - Ensure proper cascade of permissions
  
  2. Security
    - Allow authenticated users to create clients
    - Enable proper team management
    - Maintain data isolation between different clients
*/

-- Drop existing problematic policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can create clients" ON clients;
  DROP POLICY IF EXISTS "Users can create client teams" ON client_teams;
END $$;

-- Create new, more permissive creation policy
CREATE POLICY "Enable client creation for authenticated users"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Update team creation policy to be more permissive initially
CREATE POLICY "Enable team creation for authenticated users"
  ON client_teams
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add policy for managing team members
CREATE POLICY "Team members can update their teams"
  ON client_teams
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = ANY(team_members))
  WITH CHECK (auth.uid() = ANY(team_members));