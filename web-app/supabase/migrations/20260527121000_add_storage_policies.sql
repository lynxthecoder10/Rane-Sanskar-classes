-- 20260527121000_add_storage_policies.sql

-- Allow read access to approved users for both buckets
CREATE POLICY "public_read_approved" ON storage.objects
FOR SELECT TO public
USING (
  bucket_id IN ('study_materials', 'class_videos')
  AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.is_approved = true
  )
);

-- Allow write (INSERT, UPDATE, DELETE) only for admins
CREATE POLICY "admin_write" ON storage.objects
FOR ALL TO public
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role = 'admin'::student_role
  )
);
