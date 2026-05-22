-- Create a new bucket for study materials
INSERT INTO storage.buckets (id, name, public)
VALUES ('study_materials', 'study_materials', false)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS for the storage bucket
-- 1. Allow authenticated users to SELECT (read/download) files
CREATE POLICY "Allow authenticated users to read study materials"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'study_materials');

-- 2. Allow only admin (or specific role) to INSERT/UPDATE/DELETE (manage) files
-- Assuming you have an 'admin' role or you can just use service_role for backend uploads.
-- For simplicity, allowing service_role or users with a specific metadata claim.
-- This policy allows anyone authenticated to insert for now, you should refine this for real admin only.
CREATE POLICY "Allow admin to manage study materials"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'study_materials' AND auth.jwt() ->> 'role' = 'admin')
WITH CHECK (bucket_id = 'study_materials' AND auth.jwt() ->> 'role' = 'admin');
