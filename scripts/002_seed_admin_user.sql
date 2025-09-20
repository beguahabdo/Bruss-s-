-- Seed script to create default admin user for local development
-- WARNING: Change or remove this admin account before deploying to production!

-- First, create the auth user (this will be handled by the application)
-- The auth user creation must be done through Supabase Auth API, not directly in SQL

-- Insert admin user record into admin_users table
-- This will be linked to the auth user created by the application
INSERT INTO public.admin_users (id, email, role, created_at, updated_at)
SELECT 
  auth.uid(),
  'bank.dz07@gmail.com',
  'super_admin',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM public.admin_users WHERE email = 'bank.dz07@gmail.com'
);

-- Note: The actual auth user with email/password must be created through the application
-- using Supabase Auth API, as we cannot directly insert into auth.users table
