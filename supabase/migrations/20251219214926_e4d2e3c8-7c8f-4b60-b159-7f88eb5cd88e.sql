-- Create clinics table
CREATE TABLE public.clinics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  revenue_model TEXT NOT NULL DEFAULT 'percentage',
  revenue_value NUMERIC NOT NULL DEFAULT 50,
  total_earnings NUMERIC NOT NULL DEFAULT 0,
  color TEXT NOT NULL DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;

-- For MVP, allow public read/write access (no auth required yet)
CREATE POLICY "Allow public read access to clinics"
ON public.clinics
FOR SELECT
USING (true);

CREATE POLICY "Allow public insert access to clinics"
ON public.clinics
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public update access to clinics"
ON public.clinics
FOR UPDATE
USING (true);

CREATE POLICY "Allow public delete access to clinics"
ON public.clinics
FOR DELETE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_clinics_updated_at
BEFORE UPDATE ON public.clinics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();