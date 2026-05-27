CREATE TABLE IF NOT EXISTS public.study_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL CHECK (char_length(title) >= 2),
  description TEXT,
  subject TEXT NOT NULL CHECK (char_length(subject) >= 2),
  batch_category TEXT NOT NULL CHECK (char_length(batch_category) >= 2),
  material_type TEXT NOT NULL DEFAULT 'PDF',
  file_url TEXT NOT NULL,
  file_size TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.class_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL CHECK (char_length(title) >= 2),
  description TEXT,
  subject TEXT NOT NULL CHECK (char_length(subject) >= 2),
  batch_category TEXT NOT NULL CHECK (char_length(batch_category) >= 2),
  lecture_type TEXT NOT NULL DEFAULT 'Lecture',
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_minutes INTEGER CHECK (duration_minutes IS NULL OR duration_minutes >= 0),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS study_materials_batch_published_idx
  ON public.study_materials (batch_category, published_at DESC)
  WHERE is_published = true;

CREATE INDEX IF NOT EXISTS study_materials_subject_idx
  ON public.study_materials (subject);

CREATE INDEX IF NOT EXISTS class_videos_batch_published_idx
  ON public.class_videos (batch_category, published_at DESC)
  WHERE is_published = true;

CREATE INDEX IF NOT EXISTS class_videos_subject_idx
  ON public.class_videos (subject);

ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Approved students can read own batch study materials" ON public.study_materials;
DROP POLICY IF EXISTS "Admins can manage study materials" ON public.study_materials;
DROP POLICY IF EXISTS "Approved students can read own batch class videos" ON public.class_videos;
DROP POLICY IF EXISTS "Admins can manage class videos" ON public.class_videos;

CREATE POLICY "Approved students can read own batch study materials"
  ON public.study_materials
  FOR SELECT
  TO authenticated
  USING (
    is_published = true
    AND published_at <= timezone('utc'::text, now())
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE profiles.id = (SELECT auth.uid())
        AND profiles.is_approved = true
        AND (
          public.study_materials.batch_category = profiles.current_batch
          OR public.study_materials.batch_category IN ('All', 'All Batches', 'Common')
        )
    )
  );

CREATE POLICY "Admins can manage study materials"
  ON public.study_materials
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

CREATE POLICY "Approved students can read own batch class videos"
  ON public.class_videos
  FOR SELECT
  TO authenticated
  USING (
    is_published = true
    AND published_at <= timezone('utc'::text, now())
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE profiles.id = (SELECT auth.uid())
        AND profiles.is_approved = true
        AND (
          public.class_videos.batch_category = profiles.current_batch
          OR public.class_videos.batch_category IN ('All', 'All Batches', 'Common')
        )
    )
  );

CREATE POLICY "Admins can manage class videos"
  ON public.class_videos
  FOR ALL
  TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

REVOKE ALL ON public.study_materials FROM anon, authenticated;
REVOKE ALL ON public.class_videos FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_materials TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.class_videos TO authenticated;
