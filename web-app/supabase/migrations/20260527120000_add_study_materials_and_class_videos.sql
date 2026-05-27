-- Migration: create study_materials and class_videos tables
CREATE TABLE IF NOT EXISTS public.study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  file_url text NOT NULL,
  batch_category text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.class_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  video_url text NOT NULL,
  batch_category text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);
