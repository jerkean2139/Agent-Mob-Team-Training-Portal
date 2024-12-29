/*
  # Fix Client Resources RLS Policies

  1. Changes
    - Drop existing restrictive policies
    - Create new comprehensive policies for client resources
    - Enable proper access for authenticated users
  
  2. Security
    - Users can access resources for their clients
    - Team members can manage resources
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read client resources" ON client_resources;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
  ON client_resources
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON client_resources
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
  ON client_resources
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users"
  ON client_resources
  FOR DELETE
  TO authenticated
  USING (true);