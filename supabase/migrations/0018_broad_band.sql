/*
  # Training Setup Migration
  
  1. New Tables
    - agent_training_progress: Track training progress for each agent
    - agent_prompts: Store agent-specific prompts
  
  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Create agent training progress table
CREATE TABLE IF NOT EXISTS agent_training_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  stage text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create agent prompts table
CREATE TABLE IF NOT EXISTS agent_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  type text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE agent_training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_prompts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users"
  ON agent_training_progress
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable write access for authenticated users"
  ON agent_training_progress
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON agent_prompts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable write access for authenticated users"
  ON agent_prompts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);