-- 20260527_add_storage_policies.sql

-- Enable RLS on storage objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- READ policies (approved users)
CREATE POLICY study_materials_read ON storage.objects
  FOR SELECT USING (
    bucket_id = 'study_materials' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_approved = true)
  );

CREATE POLICY class_videos_read ON storage.objects
  FOR SELECT USING (
    bucket_id = 'class_videos' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_approved = true)
  );

-- WRITE policies (admin only)
CREATE POLICY study_materials_write ON storage.objects
  FOR INSERT, UPDATE, DELETE USING (
    bucket_id = 'study_materials' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    bucket_id = 'study_materials' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY class_videos_write ON storage.objects
  FOR INSERT, UPDATE, DELETE USING (
    bucket_id = 'class_videos' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    bucket_id = 'class_videos' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
