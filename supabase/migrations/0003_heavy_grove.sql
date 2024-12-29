/*
  # Update client management policies

  1. Changes
    - Add policies for client CRUD operations
    - Add policy for client team creation
  
  2. Security
    - Allow authenticated users to create new clients
    - Restrict client updates and deletions to team members
    - Enable client team creation for initial setup
    - Ensure proper access control based on team membership

  3. Implementation Notes
    - Uses safe policy creation with DO blocks
    - Implements team-based access control
    - Enables proper client creation workflow
*/

-- Create policies for client management
DO $$ 
BEGIN
  -- Client creation policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'clients' 
    AND policyname = 'Users can create clients'
  ) THEN
    CREATE POLICY "Users can create clients"
      ON clients
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  -- Client update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'clients' 
    AND policyname = 'Users can update own client data'
  ) THEN
    CREATE POLICY "Users can update own client data"
      ON clients
      FOR UPDATE
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM client_teams 
          WHERE client_id = clients.id 
          AND auth.uid() = ANY(team_members)
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM client_teams 
          WHERE client_id = clients.id 
          AND auth.uid() = ANY(team_members)
        )
      );
  END IF;

  -- Client deletion policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'clients' 
    AND policyname = 'Users can delete own client data'
  ) THEN
    CREATE POLICY "Users can delete own client data"
      ON clients
      FOR DELETE
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM client_teams 
          WHERE client_id = clients.id 
          AND auth.uid() = ANY(team_members)
        )
      );
  END IF;

  -- Client teams creation policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'client_teams' 
    AND policyname = 'Users can create client teams'
  ) THEN
    CREATE POLICY "Users can create client teams"
      ON client_teams
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;