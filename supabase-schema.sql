-- SubPilot Cloud Sync - Supabase Database Schema
-- Run this in your Supabase SQL Editor after creating a project

-- 1. Create the user_data table
CREATE TABLE IF NOT EXISTS public.user_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  data_type TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, data_type)
);

-- 2. Enable Row Level Security
ALTER TABLE public.user_data ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies: users can only access their own data
CREATE POLICY "Users can read own data" ON public.user_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON public.user_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON public.user_data
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data" ON public.user_data
  FOR DELETE USING (auth.uid() = user_id);

-- 4. Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_data_updated
  BEFORE UPDATE ON public.user_data
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 5. Enable Email OTP (one-time password) authentication
-- Go to: Authentication > Providers > Email
-- Set: "Confirm email" = ON (for verification)
-- Set: "Secure email change" = ON
-- In Auth > Email Templates > Confirm signup: customize if desired

-- 6. (Optional) If you want magic link instead of OTP:
-- In app.js, change signInWithOtp to not require token verification
-- Supabase will send a magic link that auto-logs in when clicked
