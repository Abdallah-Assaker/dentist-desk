-- Create lab_services table
CREATE TABLE public.lab_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  default_cost NUMERIC NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lab_services ENABLE ROW LEVEL SECURITY;

-- Create public access policies
CREATE POLICY "Allow public read access to lab_services" 
ON public.lab_services FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to lab_services" 
ON public.lab_services FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to lab_services" 
ON public.lab_services FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to lab_services" 
ON public.lab_services FOR DELETE USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_lab_services_updated_at
BEFORE UPDATE ON public.lab_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();