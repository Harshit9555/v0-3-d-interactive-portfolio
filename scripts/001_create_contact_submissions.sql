-- Create contact_submissions table to store form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Allow public to insert contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Create policy to allow viewing all submissions (for admin purposes)
CREATE POLICY "Allow viewing all contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (true);
