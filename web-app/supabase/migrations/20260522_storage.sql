-- Create a new bucket for study materials
INSERT INTO storage.buckets (id, name, public)
VALUES ('study_materials', 'study_materials', false)
ON CONFLICT (id) DO NOTHING;

-- Set up fail-closed RLS until production_schema.sql installs the
-- approval-gated student and admin policies after public.profiles exists.
CREATE POLICY "Allow authenticated users to read study materials"
ON storage.objects FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "Allow admin to manage study materials"
ON storage.objects FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);
