-- Create demo gym admin account
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  'demo-00000000-0000-0000-0000-000000000000',
  'demo@repzgym.local',
  crypt('demo-password-do-not-use', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"demo":true}',
  false,
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Create corresponding member record
INSERT INTO members (
  id,
  user_id,
  name,
  email,
  phone,
  status,
  is_admin,
  created_at,
  updated_at
) VALUES (
  'member-demo-0000-0000-0000-000000000000',
  'demo-00000000-0000-0000-0000-000000000000',
  'Demo Gym',
  'demo@repzgym.local',
  '+12696851493',
  'active',
  true,
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;
