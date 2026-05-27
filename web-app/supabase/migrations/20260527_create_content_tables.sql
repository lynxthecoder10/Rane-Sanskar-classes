-- 20260527_create_content_tables.sql

CREATE TABLE public.study_materials (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text,
  bucket_id   text NOT NULL DEFAULT 'study_materials',
  created_at  timestamp with time zone NOT NULL DEFAULT timezone('utc', now()),
  created_by  uuid NOT NULL REFERENCES public.profiles(id)
);

CREATE TABLE public.class_videos (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text,
  bucket_id   text NOT NULL DEFAULT 'class_videos',
  created_at  timestamp with time zone NOT NULL DEFAULT timezone('utc', now()),
  created_by  uuid NOT NULL REFERENCES public.profiles(id)
);
