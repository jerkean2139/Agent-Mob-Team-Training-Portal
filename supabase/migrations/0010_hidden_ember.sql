/*
  # Add Donna logs table and functions

  1. New Tables
    - `donna_logs` - Stores initial user questions and metadata
  2. Functions
    - `log_donna_question` - Logs a new question
*/

-- Create donna_logs table
CREATE TABLE IF NOT EXISTS donna_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  user_id uuid REFERENCES auth.users(id),
  question text NOT NULL,
  session_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE donna_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read their client logs"
  ON donna_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_teams 
      WHERE client_id = donna_logs.client_id 
      AND auth.uid() = ANY(team_members)
    )
  );

-- Create logging function
CREATE OR REPLACE FUNCTION log_donna_question(
  p_client_id uuid,
  p_question text,
  p_session_id uuid
) RETURNS uuid AS $$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO donna_logs (client_id, user_id, question, session_id)
  VALUES (p_client_id, auth.uid(), p_question, p_session_id)
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;