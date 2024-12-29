/*
  # Add file upload endpoint

  1. New Tables
    - `files` table for tracking uploaded files
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `size` (bigint)
      - `drive_file_id` (text)
      - `drive_web_link` (text)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `files` table
    - Add policies for authenticated users
*/

-- Create files table
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  size bigint NOT NULL,
  drive_file_id text,
  drive_web_link text,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own files"
  ON files
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own files"
  ON files
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create upload function
CREATE OR REPLACE FUNCTION upload_file(
  file_name text,
  file_type text,
  file_size bigint,
  file_content text
) RETURNS json AS $$
DECLARE
  _user_id uuid;
  _file_id uuid;
BEGIN
  -- Get current user ID
  SELECT auth.uid() INTO _user_id;
  
  -- Insert file record
  INSERT INTO files (name, type, size, user_id)
  VALUES (file_name, file_type, file_size, _user_id)
  RETURNING id INTO _file_id;
  
  -- Return file info
  RETURN json_build_object(
    'id', _file_id,
    'name', file_name,
    'type', file_type,
    'size', file_size
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;