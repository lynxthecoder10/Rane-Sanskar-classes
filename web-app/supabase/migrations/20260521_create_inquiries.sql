-- Create the admission_inquiries table
CREATE TABLE admission_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    parent_name TEXT,
    phone_number TEXT NOT NULL,
    course_interest TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (CRITICAL STEP)
ALTER TABLE admission_inquiries ENABLE ROW LEVEL SECURITY;

-- Create an INSERT ONLY policy for the public (anon role)
-- This allows anyone to submit an inquiry from the website, but they CANNOT read, update, or delete any data.
CREATE POLICY "Allow public inserts for inquiries"
    ON admission_inquiries
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- (Optional) Create a policy for authenticated admins to read/manage the data later
-- CREATE POLICY "Allow authenticated admins to read inquiries"
--     ON admission_inquiries
--     FOR SELECT
--     TO authenticated
--     USING (true);
