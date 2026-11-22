-- ========================================================================
-- Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
-- Fix Supabase Permissions & RLS for Direct Dashboard Access
-- ========================================================================

-- 1. Grant table & schema permissions to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated;

-- 2. Enable RLS
ALTER TABLE core_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_modules ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing restrictive policies
DROP POLICY IF EXISTS "Public Read Team" ON core_team;
DROP POLICY IF EXISTS "Admin Full Access Team" ON core_team;
DROP POLICY IF EXISTS "Anon Full Access Team" ON core_team;

DROP POLICY IF EXISTS "Public Read Learning Paths" ON learning_paths;
DROP POLICY IF EXISTS "Admin Full Access Paths" ON learning_paths;
DROP POLICY IF EXISTS "Anon Full Access Paths" ON learning_paths;

DROP POLICY IF EXISTS "Public Read Modules" ON learning_path_modules;
DROP POLICY IF EXISTS "Admin Full Access Modules" ON learning_path_modules;
DROP POLICY IF EXISTS "Anon Full Access Modules" ON learning_path_modules;

-- 4. Create Full CRUD Policies for both anon (Dashboard) and authenticated roles
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
