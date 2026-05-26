-- Production schema for Rane's Sanskar Classes.
-- This migration is intentionally additive/compatible with the earlier prototype migrations.

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;

DO $$
BEGIN
  CREATE TYPE public.student_role AS ENUM ('student', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.enquiry_status AS ENUM ('new', 'contacted', 'enrolled', 'archived');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'archived';

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  role public.student_role NOT NULL DEFAULT 'student',
  is_approved BOOLEAN NOT NULL DEFAULT false,
  current_batch TEXT,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_approved BOOLEAN;

UPDATE public.profiles
SET is_approved = false
WHERE is_approved IS NULL;

ALTER TABLE public.profiles
  ALTER COLUMN is_approved SET DEFAULT false,
  ALTER COLUMN is_approved SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  student_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  standard TEXT NOT NULL,
  board TEXT NOT NULL,
  stream_selected TEXT NOT NULL,
  message TEXT,
  status public.enquiry_status NOT NULL DEFAULT 'new'
);

ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS stream_selected TEXT;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS board TEXT;

UPDATE public.enquiries
SET stream_selected = standard
WHERE stream_selected IS NULL;

UPDATE public.enquiries
SET standard = CASE standard
  WHEN '8th' THEN 'Class VIII (SSC)'
  WHEN '9th (SSC)' THEN 'Class IX (SSC)'
  WHEN '9th (ICSE)' THEN 'Class IX (ICSE)'
  WHEN '10th (SSC)' THEN 'Class X (SSC)'
  WHEN '10th (ICSE)' THEN 'Class X (ICSE)'
  WHEN '11th Commerce' THEN 'Class XI Commerce'
  WHEN '11th Science' THEN 'Class XI Science'
  WHEN '12th Commerce' THEN 'Class XII Commerce'
  WHEN '12th Science' THEN 'Class XII Science'
  ELSE standard
END;

UPDATE public.enquiries
SET board = 'Maharashtra SSC / HSC'
WHERE board IS NULL;

UPDATE public.enquiries
SET board = CASE board
  WHEN 'SSC' THEN 'Maharashtra SSC / HSC'
  WHEN 'HSC' THEN 'Maharashtra SSC / HSC'
  WHEN 'ICSE' THEN 'ICSE / ISC Board'
  WHEN 'CBSE' THEN 'CBSE Board'
  WHEN '' THEN 'Maharashtra SSC / HSC'
  ELSE board
END;

UPDATE public.enquiries
SET stream_selected = standard
WHERE stream_selected NOT IN (
  'Class VIII (SSC)',
  'Class VIII (ICSE)',
  'Class IX (SSC)',
  'Class IX (ICSE)',
  'Class X (SSC)',
  'Class X (ICSE)',
  'Class XI Commerce',
  'Class XI Science',
  'Class XII Commerce',
  'Class XII Science',
  'CA Foundation Prep',
  'CMA Foundation Prep',
  'Vocational Computer Courses'
);

ALTER TABLE public.enquiries DROP CONSTRAINT IF EXISTS enquiries_status_check;
ALTER TABLE public.enquiries DROP CONSTRAINT IF EXISTS enquiries_standard_allowed;
ALTER TABLE public.enquiries DROP CONSTRAINT IF EXISTS enquiries_board_allowed;
ALTER TABLE public.enquiries DROP CONSTRAINT IF EXISTS enquiries_stream_selected_allowed;

UPDATE public.enquiries
SET status = 'archived'
WHERE status::text = 'closed';

ALTER TABLE public.enquiries
  ALTER COLUMN status DROP DEFAULT,
  ALTER COLUMN status TYPE public.enquiry_status
    USING (
      CASE
        WHEN status::text = 'closed' THEN 'archived'
        ELSE status::text
      END
    )::public.enquiry_status,
  ALTER COLUMN status SET DEFAULT 'new'::public.enquiry_status,
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN board SET NOT NULL,
  ALTER COLUMN stream_selected SET NOT NULL;

ALTER TABLE public.enquiries
  ADD CONSTRAINT enquiries_standard_allowed CHECK (standard IN (
    'Class VIII (SSC)',
    'Class VIII (ICSE)',
    'Class IX (SSC)',
    'Class IX (ICSE)',
    'Class X (SSC)',
    'Class X (ICSE)',
    'Class XI Commerce',
    'Class XI Science',
    'Class XII Commerce',
    'Class XII Science',
    'CA Foundation Prep',
    'CMA Foundation Prep',
    'Vocational Computer Courses'
  )),
  ADD CONSTRAINT enquiries_board_allowed CHECK (board IN (
    'Maharashtra SSC / HSC',
    'ICSE / ISC Board',
    'CBSE Board',
    'University of Mumbai'
  )),
  ADD CONSTRAINT enquiries_stream_selected_allowed CHECK (stream_selected IN (
    'Class VIII (SSC)',
    'Class VIII (ICSE)',
    'Class IX (SSC)',
    'Class IX (ICSE)',
    'Class X (SSC)',
    'Class X (ICSE)',
    'Class XI Commerce',
    'Class XI Science',
    'Class XII Commerce',
    'Class XII Science',
    'CA Foundation Prep',
    'CMA Foundation Prep',
    'Vocational Computer Courses'
  ));

CREATE TABLE IF NOT EXISTS public.toppers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  score_percentage NUMERIC(5,2) NOT NULL CHECK (score_percentage >= 0 AND score_percentage <= 100),
  year INTEGER NOT NULL CHECK (year >= 2000),
  stream TEXT NOT NULL,
  avatar_url TEXT,
  rank_position INTEGER NOT NULL CHECK (rank_position > 0),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (year, stream, rank_position)
);

CREATE TABLE IF NOT EXISTS public.study_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  minutes_studied INTEGER NOT NULL DEFAULT 0 CHECK (minutes_studied >= 0),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (student_id, activity_date)
);

CREATE TABLE IF NOT EXISTS public.test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  marks_obtained NUMERIC(5,2) NOT NULL CHECK (marks_obtained >= 0),
  total_marks NUMERIC(5,2) NOT NULL CHECK (total_marks > 0),
  percentage NUMERIC(5,2) GENERATED ALWAYS AS ((marks_obtained / total_marks) * 100) STORED,
  xp_earned INTEGER NOT NULL DEFAULT 0 CHECK (xp_earned >= 0),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CHECK (marks_obtained <= total_marks)
);

CREATE TABLE IF NOT EXISTS public.student_rank_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rank_position INTEGER NOT NULL CHECK (rank_position > 0),
  total_xp INTEGER NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
  calculated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.notification_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'::public.student_role
  );
$$;

CREATE OR REPLACE FUNCTION private.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, is_approved, current_batch)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1), 'New Student'),
    'student'::public.student_role,
    false,
    'Unassigned Batch'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION private.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION private.handle_new_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.is_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.handle_new_user() TO service_role;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION private.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.toppers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_rank_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow admins full profile access" ON public.profiles;
DROP POLICY IF EXISTS "Allow public to submit enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow public inserts into enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow admin to manage enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow admins full access to enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow public read access to toppers" ON public.toppers;
DROP POLICY IF EXISTS "Allow students to view own activity" ON public.study_activity_logs;
DROP POLICY IF EXISTS "Allow students to view own marks" ON public.test_results;
DROP POLICY IF EXISTS "Allow students to view own ranks" ON public.student_rank_snapshots;
DROP POLICY IF EXISTS "Allow admins full activity access" ON public.study_activity_logs;
DROP POLICY IF EXISTS "Allow admins full test access" ON public.test_results;
DROP POLICY IF EXISTS "Allow admins full rank access" ON public.student_rank_snapshots;
DROP POLICY IF EXISTS "Allow admins full notification access" ON public.notification_events;
DROP POLICY IF EXISTS "Allow admins full toppers access" ON public.toppers;

CREATE POLICY "Allow users to read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow admins full profile access"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

CREATE POLICY "Allow public inserts into enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon
  WITH CHECK (status = 'new'::public.enquiry_status);

CREATE POLICY "Allow admins full access to enquiries"
  ON public.enquiries
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

CREATE POLICY "Allow public read access to toppers"
  ON public.toppers
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow admins full toppers access"
  ON public.toppers
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

CREATE POLICY "Allow students to view own activity"
  ON public.study_activity_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Allow students to view own marks"
  ON public.test_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Allow students to view own ranks"
  ON public.student_rank_snapshots
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Allow admins full activity access"
  ON public.study_activity_logs
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

CREATE POLICY "Allow admins full test access"
  ON public.test_results
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

CREATE POLICY "Allow admins full rank access"
  ON public.student_rank_snapshots
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

CREATE POLICY "Allow admins full notification access"
  ON public.notification_events
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

DO $$
BEGIN
  IF to_regclass('public.admission_inquiries') IS NOT NULL THEN
    ALTER TABLE public.admission_inquiries ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Allow public inserts for inquiries" ON public.admission_inquiries;
    DROP POLICY IF EXISTS "Allow public inserts for pending inquiries" ON public.admission_inquiries;
    DROP POLICY IF EXISTS "Allow admins to read inquiries" ON public.admission_inquiries;

    CREATE POLICY "Allow public inserts for pending inquiries"
      ON public.admission_inquiries
      FOR INSERT
      TO anon
      WITH CHECK (status = 'pending');

    CREATE POLICY "Allow admins to read inquiries"
      ON public.admission_inquiries
      FOR SELECT
      TO authenticated
      USING (private.is_admin());

    REVOKE ALL ON public.admission_inquiries FROM anon, authenticated;
    GRANT INSERT (student_name, parent_name, phone_number, course_interest, message)
      ON public.admission_inquiries TO anon;
    GRANT SELECT ON public.admission_inquiries TO authenticated;
  END IF;
END $$;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
REVOKE ALL ON public.profiles FROM anon, authenticated;
REVOKE ALL ON public.enquiries FROM anon, authenticated;
REVOKE ALL ON public.toppers FROM anon, authenticated;
REVOKE ALL ON public.study_activity_logs FROM anon, authenticated;
REVOKE ALL ON public.test_results FROM anon, authenticated;
REVOKE ALL ON public.student_rank_snapshots FROM anon, authenticated;
REVOKE ALL ON public.notification_events FROM anon, authenticated;

GRANT SELECT ON public.toppers TO anon, authenticated;
GRANT INSERT (student_name, parent_name, phone, email, standard, board, stream_selected, message)
  ON public.enquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_activity_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.test_results TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_rank_snapshots TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notification_events TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.toppers TO authenticated;

INSERT INTO public.toppers (name, score_percentage, year, stream, avatar_url, rank_position)
VALUES
  ('Smith Patel', 96.40, 2026, 'SYJC Commerce', NULL, 1),
  ('Janhavi Naik', 95.20, 2026, 'SYJC Commerce', NULL, 2),
  ('Tejas More', 94.80, 2026, 'SYJC Commerce', NULL, 3)
ON CONFLICT (year, stream, rank_position) DO NOTHING;

DROP POLICY IF EXISTS "Allow authenticated users to read study materials" ON storage.objects;
DROP POLICY IF EXISTS "Allow approved users to read study materials" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin to manage study materials" ON storage.objects;

CREATE POLICY "Allow approved users to read study materials"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'study_materials'
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE id = auth.uid()
        AND is_approved = true
    )
  );

CREATE POLICY "Allow admins to manage study materials"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'study_materials' AND private.is_admin())
  WITH CHECK (bucket_id = 'study_materials' AND private.is_admin());

DO $$
BEGIN
  IF to_regprocedure('public.rls_auto_enable()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon, authenticated, PUBLIC;
  END IF;
END $$;
