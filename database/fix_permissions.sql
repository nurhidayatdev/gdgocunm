-- ========================================================================
-- Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
-- Fix Supabase Permissions & Storage for Direct Dashboard Access
-- ========================================================================

-- 1. Grant table & schema permissions to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated;

-- 2. Enable RLS on public tables
ALTER TABLE core_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_modules ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing restrictive policies on public tables
DROP POLICY IF EXISTS "Public Read Team" ON core_team;
DROP POLICY IF EXISTS "Admin Full Access Team" ON core_team;
DROP POLICY IF EXISTS "Anon Full Access Team" ON core_team;

DROP POLICY IF EXISTS "Public Read Learning Paths" ON learning_paths;
DROP POLICY IF EXISTS "Admin Full Access Paths" ON learning_paths;
DROP POLICY IF EXISTS "Anon Full Access Paths" ON learning_paths;

DROP POLICY IF EXISTS "Public Read Modules" ON learning_path_modules;
DROP POLICY IF EXISTS "Admin Full Access Modules" ON learning_path_modules;
DROP POLICY IF EXISTS "Anon Full Access Modules" ON learning_path_modules;

-- 4. Create Full CRUD Policies for public tables
CREATE POLICY "Anon Full Access Team" ON core_team 
    FOR ALL TO anon, authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Anon Full Access Paths" ON learning_paths 
    FOR ALL TO anon, authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Anon Full Access Modules" ON learning_path_modules 
    FOR ALL TO anon, authenticated 
    USING (true) 
    WITH CHECK (true);

-- ------------------------------------------------------------------------
-- 5. Supabase Storage Setup: team-avatars Bucket & Policies
-- ------------------------------------------------------------------------
-- Insert public bucket team-avatars if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team-avatars', 'team-avatars', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage object policies for team-avatars bucket
DROP POLICY IF EXISTS "Public Select Objects" ON storage.objects;
DROP POLICY IF EXISTS "Anon Insert Objects" ON storage.objects;
DROP POLICY IF EXISTS "Anon Update Objects" ON storage.objects;
DROP POLICY IF EXISTS "Anon Delete Objects" ON storage.objects;

CREATE POLICY "Public Select Objects" ON storage.objects 
    FOR SELECT TO anon, authenticated 
    USING (bucket_id = 'team-avatars');

CREATE POLICY "Anon Insert Objects" ON storage.objects 
    FOR INSERT TO anon, authenticated 
    WITH CHECK (bucket_id = 'team-avatars');

CREATE POLICY "Anon Update Objects" ON storage.objects 
    FOR UPDATE TO anon, authenticated 
    USING (bucket_id = 'team-avatars');

CREATE POLICY "Anon Delete Objects" ON storage.objects 
    FOR DELETE TO anon, authenticated 
    USING (bucket_id = 'team-avatars');
