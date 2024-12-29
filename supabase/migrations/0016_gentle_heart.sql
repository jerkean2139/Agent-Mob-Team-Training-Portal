-- Create error_logs table
CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  error_message text NOT NULL,
  stack_trace text,
  component text,
  user_id uuid REFERENCES auth.users(id),
  screenshot_url text,
  status text NOT NULL DEFAULT 'new',
  priority text NOT NULL DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users"
  ON error_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON error_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
  ON error_logs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create error_logs bucket for screenshots
INSERT INTO storage.buckets (id, name)
VALUES ('error-logs', 'error-logs')
ON CONFLICT DO NOTHING;

-- Enable public access to error-logs bucket
CREATE POLICY "Public Access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'error-logs');

-- Allow authenticated users to upload to error-logs bucket
CREATE POLICY "Allow uploads"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'error-logs');