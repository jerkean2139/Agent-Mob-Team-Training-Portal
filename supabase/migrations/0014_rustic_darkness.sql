/*
  # Update Agent Table and Add Test Data

  1. Schema Changes
    - Add client_id, display_order, and status columns to agents table
    - Set default values for new columns

  2. Data Changes
    - Insert test agents with proper relationships and metadata
*/

-- Add missing columns to agents table if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'agents' AND column_name = 'client_id'
  ) THEN
    ALTER TABLE agents ADD COLUMN client_id uuid REFERENCES clients(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'agents' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE agents ADD COLUMN display_order integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'agents' AND column_name = 'status'
  ) THEN
    ALTER TABLE agents ADD COLUMN status text DEFAULT 'active';
  END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read all agents" ON agents;
DROP POLICY IF EXISTS "Users can create agents" ON agents;
DROP POLICY IF EXISTS "Users can update agents" ON agents;

-- Create new policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agents' AND policyname = 'Enable read access for agents'
  ) THEN
    CREATE POLICY "Enable read access for agents"
      ON agents
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agents' AND policyname = 'Enable insert for agents'
  ) THEN
    CREATE POLICY "Enable insert for agents"
      ON agents
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agents' AND policyname = 'Enable update for agents'
  ) THEN
    CREATE POLICY "Enable update for agents"
      ON agents
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Insert test agents if they don't exist
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  display_order,
  status,
  created_at,
  updated_at
)
SELECT
  'Donna', 'Traffic Controller', 'Operations', 
  ARRAY['Workflow Management', 'Team Coordination'],
  ARRAY['Task Distribution', 'Process Optimization', 'Communication'],
  ARRAY['Project Management', 'Quality Assurance'],
  1, 'active', NOW(), NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM agents WHERE name = 'Donna'
);

INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  display_order,
  status,
  created_at,
  updated_at
)
SELECT
  'Marcus', 'Data Analyst', 'Analytics',
  ARRAY['Data Analysis', 'Business Intelligence'],
  ARRAY['Statistical Analysis', 'Data Visualization', 'Reporting'],
  ARRAY['Machine Learning', 'Data Mining'],
  2, 'active', NOW(), NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM agents WHERE name = 'Marcus'
);

INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  display_order,
  status,
  created_at,
  updated_at
)
SELECT
  'Sarah', 'Content Writer', 'Marketing',
  ARRAY['Content Creation', 'SEO'],
  ARRAY['Content Writing', 'SEO Optimization', 'Brand Voice'],
  ARRAY['Social Media', 'Content Planning'],
  3, 'active', NOW(), NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM agents WHERE name = 'Sarah'
);