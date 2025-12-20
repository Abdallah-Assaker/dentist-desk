-- Create procedures table
CREATE TABLE public.procedures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cost NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (procedures are typically shared data)
CREATE POLICY "Anyone can view procedures" 
ON public.procedures 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create procedures" 
ON public.procedures 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update procedures" 
ON public.procedures 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete procedures" 
ON public.procedures 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_procedures_updated_at
BEFORE UPDATE ON public.procedures
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();