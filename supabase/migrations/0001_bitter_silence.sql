/*
  # Create agents table and related schemas

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `department` (text)
      - `specialization` (text array)
      - `primary_skills` (text array)
      - `secondary_skills` (text array)
      - `integrations` (text array)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `agents` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  department text NOT NULL,
  specialization text[] DEFAULT '{}',
  primary_skills text[] DEFAULT '{}',
  secondary_skills text[] DEFAULT '{}',
  integrations text[] DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Allow users to read all agents
CREATE POLICY "Users can read all agents"
  ON agents
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to create agents
CREATE POLICY "Users can create agents"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own agents
CREATE POLICY "Users can update own agents"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Allow users to delete their own agents
CREATE POLICY "Users can delete own agents"
  ON agents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);