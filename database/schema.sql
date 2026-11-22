-- ========================================================================
-- Google Developer Groups On Campus - Universitas Negeri Makassar (GDGoC UNM)
-- Supabase PostgreSQL Database Schema
-- Tables: core_team, learning_paths, learning_path_modules
-- ========================================================================

-- Enable pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------
-- 1. Table: core_team
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS core_team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,              -- e.g. 'Front-End Tech Lead', 'Lead'
    division VARCHAR(100) NOT NULL,          -- 'Organizer', 'Research & Development', etc.
    sub_role VARCHAR(50) DEFAULT 'Member',   -- 'Lead', 'Co-Lead', 'Track Lead', 'Member'
    badge_color VARCHAR(20) DEFAULT 'blue',  -- 'blue', 'green', 'yellow', 'red', 'white'
    image_url TEXT,                          -- Local asset or Supabase Storage public URL
    is_lead BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0,               -- Display ordering
    socials JSONB DEFAULT '{"linkedin": "#", "github": "#", "instagram": "#"}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_core_team_division ON core_team(division);
CREATE INDEX IF NOT EXISTS idx_core_team_active ON core_team(is_active);
CREATE INDEX IF NOT EXISTS idx_core_team_order ON core_team(order_index);

-- ------------------------------------------------------------------------
-- 2. Table: learning_paths
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS learning_paths (
    id VARCHAR(50) PRIMARY KEY,              -- 'uiux', 'frontend', 'backend', etc.
    title VARCHAR(150) NOT NULL,             -- 'UI/UX Design', 'Front-End Web Development'
    short_title VARCHAR(80) NOT NULL,
    category VARCHAR(50) NOT NULL,           -- 'Design', 'Web & Apps', 'Intelligence', etc.
    color VARCHAR(20) NOT NULL,              -- 'blue', 'green', 'yellow', 'red'
    image_url TEXT,
    whatsapp_url TEXT DEFAULT 'https://chat.whatsapp.com/',
    description TEXT,                        -- Short card summary
    objective TEXT,                          -- Learning goal
    long_description TEXT,                   -- Complete track overview
    tech_stack TEXT[] DEFAULT '{}',          -- e.g. ARRAY['Figma', 'FigJam', 'Whimsical']
    capstone_title TEXT,
    capstone_description TEXT,
    outcomes_learn TEXT,
    outcomes_prereq TEXT,
    spec_sessions VARCHAR(50) DEFAULT '5 Sessions',
    spec_level VARCHAR(50) DEFAULT 'Beginner Friendly',
    spec_duration VARCHAR(50) DEFAULT '5 Weeks',
    spec_cohort VARCHAR(50) DEFAULT 'Cohort 2026/2027',
    instructor_name VARCHAR(150),
    instructor_role VARCHAR(100),
    instructor_division VARCHAR(100),
    instructor_image_url TEXT,
    instructor_quote TEXT,
    instructor_socials JSONB DEFAULT '{"linkedin": "#", "github": "#", "instagram": "#"}'::jsonb,
    order_index INT DEFAULT 0,               -- 1: UI/UX, 2: Front-End, etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_learning_paths_order ON learning_paths(order_index);
CREATE INDEX IF NOT EXISTS idx_learning_paths_active ON learning_paths(is_active);

-- ------------------------------------------------------------------------
-- 3. Table: learning_path_modules
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS learning_path_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track_id VARCHAR(50) REFERENCES learning_paths(id) ON DELETE CASCADE,
    session_num VARCHAR(10) NOT NULL,        -- '01', '02', etc.
    title VARCHAR(250) NOT NULL,
    objectives TEXT,
    materials TEXT,
    assignment TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_modules_track_id ON learning_path_modules(track_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON learning_path_modules(order_index);

-- ------------------------------------------------------------------------
-- Row Level Security (RLS) Policies
-- ------------------------------------------------------------------------
ALTER TABLE core_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_modules ENABLE ROW LEVEL SECURITY;

-- Drop policies if re-running
DROP POLICY IF EXISTS "Public Read Team" ON core_team;
DROP POLICY IF EXISTS "Public Read Learning Paths" ON learning_paths;
DROP POLICY IF EXISTS "Public Read Modules" ON learning_path_modules;
DROP POLICY IF EXISTS "Admin Full Access Team" ON core_team;
DROP POLICY IF EXISTS "Admin Full Access Paths" ON learning_paths;
DROP POLICY IF EXISTS "Admin Full Access Modules" ON learning_path_modules;

-- PUBLIC READ (Anonymous visitors can read active records)
CREATE POLICY "Public Read Team" ON core_team 
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public Read Learning Paths" ON learning_paths 
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public Read Modules" ON learning_path_modules 
    FOR SELECT USING (true);

-- ADMIN FULL ACCESS (Authenticated users in Supabase Studio / Auth)
CREATE POLICY "Admin Full Access Team" ON core_team 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin Full Access Paths" ON learning_paths 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin Full Access Modules" ON learning_path_modules 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
