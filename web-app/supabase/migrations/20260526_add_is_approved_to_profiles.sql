-- Add is_approved column to profiles table for zero-trust security sandbox
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false NOT NULL;
