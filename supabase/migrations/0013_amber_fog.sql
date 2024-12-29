/*
  # Update Agent Overview Display

  1. Add display_order column to agents table
  2. Add status column to agents table
  3. Update existing agents with display order and status
*/

-- Add new columns
ALTER TABLE agents 
ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Update display order for existing agents
UPDATE agents SET display_order = 1, status = 'active' WHERE name = 'Donna';
UPDATE agents SET display_order = 2, status = 'active' WHERE name = 'Marcus';
UPDATE agents SET display_order = 3, status = 'active' WHERE name = 'Sarah';
UPDATE agents SET display_order = 4, status = 'active' WHERE name = 'Alex';
UPDATE agents SET display_order = 5, status = 'active' WHERE name = 'Emma';
UPDATE agents SET display_order = 6, status = 'active' WHERE name = 'James';
UPDATE agents SET display_order = 7, status = 'active' WHERE name = 'Maya';
UPDATE agents SET display_order = 8, status = 'active' WHERE name = 'Lucas';
UPDATE agents SET display_order = 9, status = 'active' WHERE name = 'Sophia';
UPDATE agents SET display_order = 10, status = 'active' WHERE name = 'Oliver';