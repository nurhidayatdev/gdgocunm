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

-- ------------------------------------------------------------------------
-- 6. Table: activity_gallery & Full CRUD Policies
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activity_gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    image_url TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    date VARCHAR(100),
    location VARCHAR(255),
    description TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE activity_gallery ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE activity_gallery ADD COLUMN IF NOT EXISTS date VARCHAR(100);
ALTER TABLE activity_gallery ADD COLUMN IF NOT EXISTS location VARCHAR(255);
ALTER TABLE activity_gallery ALTER COLUMN image_url DROP NOT NULL;
ALTER TABLE activity_gallery DROP COLUMN IF EXISTS category;
ALTER TABLE activity_gallery DROP COLUMN IF EXISTS color;

GRANT ALL ON TABLE activity_gallery TO anon, authenticated;

ALTER TABLE activity_gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon Full Access Gallery" ON activity_gallery;

CREATE POLICY "Anon Full Access Gallery" ON activity_gallery
    FOR ALL TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------
-- 7. Table: events & Full CRUD Policies
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(250) NOT NULL,
    category VARCHAR(100) DEFAULT 'Weekly Class',
    poster_url TEXT,
    location VARCHAR(200) NOT NULL,
    date VARCHAR(100) NOT NULL,
    time VARCHAR(100) NOT NULL,
    raw_date VARCHAR(50),
    raw_time VARCHAR(50),
    speaker VARCHAR(150) NOT NULL,
    speaker_role VARCHAR(100) DEFAULT 'Speaker',
    moderator VARCHAR(150) NOT NULL,
    moderator_role VARCHAR(100) DEFAULT 'Moderator',
    registration_url TEXT DEFAULT '#',
    status VARCHAR(50) DEFAULT 'Upcoming',
    badge_color VARCHAR(20) DEFAULT 'blue',
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- In case table already exists without raw_date / raw_time / speakers
ALTER TABLE events ADD COLUMN IF NOT EXISTS raw_date VARCHAR(50);
ALTER TABLE events ADD COLUMN IF NOT EXISTS raw_time VARCHAR(50);
ALTER TABLE events ADD COLUMN IF NOT EXISTS speakers JSONB DEFAULT '[]'::jsonb;

GRANT ALL ON TABLE events TO anon, authenticated;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon Full Access Events" ON events;
CREATE POLICY "Anon Full Access Events" ON events
    FOR ALL TO anon, authenticated
    USING (true)
    WITH CHECK (true);


