/*
  # Add client_id to agents table

  1. Changes
    - Add client_id column to agents table
    - Add foreign key constraint
    - Update RLS policies
*/

-- Add client_id column
ALTER TABLE agents
ADD COLUMN client_id uuid REFERENCES clients(id);

-- Update RLS policies
CREATE POLICY "Users can read agents for their clients"
  ON agents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = agents.client_id 
      AND auth.uid() = ANY(team_members)
    )
  );

CREATE POLICY "Users can create agents for their clients"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = agents.client_id 
      AND auth.uid() = ANY(team_members)
    )
  );