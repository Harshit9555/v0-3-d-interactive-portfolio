-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow viewing all contact submissions" ON public.contact_submissions;

-- Recreate contact_submissions table with proper structure
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (if not already enabled)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form submission)
CREATE POLICY "Allow public insert on contact_submissions"
  ON public.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow viewing submissions
CREATE POLICY "Allow public select on contact_submissions"
  ON public.contact_submissions
  FOR SELECT
  TO public
  USING (true);

-- Grant permissions to anon role
GRANT INSERT ON public.contact_submissions TO anon;
GRANT SELECT ON public.contact_submissions TO anon;

-- Set proper permissions
ALTER TABLE public.contact_submissions OWNER TO postgres;
