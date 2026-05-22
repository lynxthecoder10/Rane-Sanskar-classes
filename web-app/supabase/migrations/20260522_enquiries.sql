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

-- Allow anonymous users to INSERT only (submit the form)
CREATE POLICY "Allow public to submit enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated (admin) users can read/update enquiries
CREATE POLICY "Allow admin to manage enquiries"
  ON public.enquiries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
