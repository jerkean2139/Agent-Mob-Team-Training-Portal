/*
  # Initialize Zenoflo Agent Mob

  1. New Data
    - Create Donna and her specialized team
    - Set up initial agent configurations
    - Define primary and secondary skills

  2. Security
    - Maintain existing RLS policies
*/

-- Insert Donna (Traffic Controller)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Donna',
  'Traffic Controller',
  'Operations',
  ARRAY['Workflow Management', 'Team Coordination'],
  ARRAY['Task Distribution', 'Process Optimization', 'Communication'],
  ARRAY['Project Management', 'Quality Assurance'],
  NOW()
);

-- Insert Marcus (Data Intelligence)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Marcus',
  'Data Intelligence Specialist',
  'Analytics',
  ARRAY['Data Analysis', 'Business Intelligence'],
  ARRAY['Statistical Analysis', 'Data Visualization', 'Predictive Modeling'],
  ARRAY['Machine Learning', 'Data Mining'],
  NOW()
);

-- Insert Sarah (Content Strategist)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Sarah',
  'Content Strategist',
  'Marketing',
  ARRAY['Content Creation', 'SEO'],
  ARRAY['Content Writing', 'SEO Optimization', 'Brand Voice'],
  ARRAY['Social Media', 'Content Planning'],
  NOW()
);

-- Insert Alex (Research Lead)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Alex',
  'Research Lead',
  'Research',
  ARRAY['Market Research', 'Competitive Analysis'],
  ARRAY['Research Methods', 'Data Collection', 'Analysis'],
  ARRAY['Trend Analysis', 'Report Writing'],
  NOW()
);

-- Insert Emma (Customer Success)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Emma',
  'Customer Success Manager',
  'Support',
  ARRAY['Customer Support', 'Client Relations'],
  ARRAY['Problem Solving', 'Communication', 'Client Management'],
  ARRAY['Training', 'Documentation'],
  NOW()
);

-- Insert James (Technical Expert)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'James',
  'Technical Expert',
  'Engineering',
  ARRAY['Technical Support', 'System Integration'],
  ARRAY['Troubleshooting', 'Technical Documentation', 'Integration'],
  ARRAY['API Development', 'Testing'],
  NOW()
);

-- Insert Maya (Process Optimizer)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Maya',
  'Process Optimization Specialist',
  'Operations',
  ARRAY['Process Improvement', 'Workflow Design'],
  ARRAY['Process Mapping', 'Efficiency Analysis', 'Automation'],
  ARRAY['Change Management', 'Training'],
  NOW()
);

-- Insert Lucas (Innovation Lead)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Lucas',
  'Innovation Lead',
  'R&D',
  ARRAY['Innovation Strategy', 'Product Development'],
  ARRAY['Ideation', 'Prototyping', 'Market Analysis'],
  ARRAY['Design Thinking', 'User Research'],
  NOW()
);

-- Insert Sophia (Quality Assurance)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Sophia',
  'Quality Assurance Lead',
  'Quality',
  ARRAY['Quality Control', 'Standards Compliance'],
  ARRAY['Testing', 'Documentation', 'Process Validation'],
  ARRAY['Auditing', 'Training'],
  NOW()
);

-- Insert Oliver (Integration Specialist)
INSERT INTO agents (
  name,
  role,
  department,
  specialization,
  primary_skills,
  secondary_skills,
  created_at
) VALUES (
  'Oliver',
  'Integration Specialist',
  'Technology',
  ARRAY['System Integration', 'API Management'],
  ARRAY['API Development', 'Data Migration', 'System Architecture'],
  ARRAY['Security', 'Documentation'],
  NOW()
);