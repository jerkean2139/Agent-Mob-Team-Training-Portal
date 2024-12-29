/*
  # Client Management System

  1. New Tables
    - `clients`: Store client information and settings
    - `client_teams`: Manage team member access to clients
    - `client_resources`: Store documents, sheets, and prompts
    - `workflows`: Define client workflows
    - `prompt_library`: Store reusable prompts

  2. Security
    - Enable RLS on all tables
    - Add policies for client data isolation
    - Team-based access control
*/

-- Client management
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  subscription_tier text NOT NULL DEFAULT 'standard',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  settings jsonb DEFAULT '{}'::jsonb,
  integration_configs jsonb DEFAULT '{}'::jsonb
);

-- Team management
CREATE TABLE IF NOT EXISTS client_teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  team_members uuid[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Resource management
CREATE TABLE IF NOT EXISTS client_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'document', 'sheet', 'prompt'
  name text NOT NULL,
  content text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workflow management
CREATE TABLE IF NOT EXISTS workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prompt library
CREATE TABLE IF NOT EXISTS prompt_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_library ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients
CREATE POLICY "Users can read own client data"
  ON clients
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = clients.id 
      AND auth.uid() = ANY(team_members)
    )
  );

-- RLS Policies for client_teams
CREATE POLICY "Users can view their teams"
  ON client_teams
  FOR SELECT
  TO authenticated
  USING (auth.uid() = ANY(team_members));

-- RLS Policies for client_resources
CREATE POLICY "Users can read client resources"
  ON client_resources
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = client_resources.client_id 
      AND auth.uid() = ANY(team_members)
    )
  );

-- RLS Policies for workflows
CREATE POLICY "Users can read workflows"
  ON workflows
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = workflows.client_id 
      AND auth.uid() = ANY(team_members)
    )
  );

-- RLS Policies for prompt_library
CREATE POLICY "All users can read prompts"
  ON prompt_library
  FOR SELECT
  TO authenticated
  USING (true);