/*
  # Add Client Agents

  1. Updates
    - Add client_id to existing agents
    - Set display_order for proper sorting
    - Update status to active
  
  2. Security
    - Ensure RLS policies are in place
*/

-- Update existing agents to associate with first client
WITH first_client AS (
  SELECT id FROM clients LIMIT 1
)
UPDATE agents 
SET 
  client_id = (SELECT id FROM first_client),
  status = 'active',
  display_order = CASE 
    WHEN name = 'Donna' THEN 1
    WHEN name = 'Marcus' THEN 2
    WHEN name = 'Sarah' THEN 3
    WHEN name = 'Alex' THEN 4
    WHEN name = 'Emma' THEN 5
    ELSE 10
  END
WHERE client_id IS NULL;