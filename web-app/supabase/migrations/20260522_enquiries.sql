-- Create the enquiries table for admission leads
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  student_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  standard TEXT NOT NULL,
  board TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'closed'))
);

-- Enable Row Level Security
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  is_allowed BOOLEAN;
BEGIN
  IF to_regclass('public.profiles') IS NULL THEN
    RETURN false;
  END IF;

  EXECUTE 'SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role::text = ''admin''
  )'
  INTO is_allowed;

  RETURN COALESCE(is_allowed, false);
END;
$$;

REVOKE ALL ON FUNCTION private.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.is_admin() TO authenticated, service_role;

-- Allow anonymous users to INSERT only (submit the form)
DROP POLICY IF EXISTS "Allow public to submit enquiries" ON public.enquiries;
CREATE POLICY "Allow public to submit enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon
  WITH CHECK (status = 'new');

-- Only authenticated (admin) users can read/update enquiries
DROP POLICY IF EXISTS "Allow admin to manage enquiries" ON public.enquiries;
CREATE POLICY "Allow admin to manage enquiries"
  ON public.enquiries
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());
