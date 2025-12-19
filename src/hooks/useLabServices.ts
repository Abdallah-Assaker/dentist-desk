import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

// Static Supabase credentials
const SUPABASE_URL = 'https://mtmdwmvxgxtbcyeuwomr.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bWR3bXZ4Z3h0YmN5ZXV3b21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzQzOTEsImV4cCI6MjA4MTc1MDM5MX0.tvTf4NpDRzYzM7lF6KPXn5zyBfDtkoGqTu9FLxoWzlo';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export interface LabService {
  id: string;
  name: string;
  default_cost: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface LabServiceFormData {
  name: string;
  default_cost: number;
  notes?: string | null;
}

export function useLabServices(search?: string) {
  return useQuery({
    queryKey: ["lab_services", search || ""],
    queryFn: async () => {
      const term = search?.trim();
      if (term) {
        const { data, error } = await supabaseClient
          .from("lab_services")
          .select("*")
          .ilike("name", `%${term}%`)
          .order("name");

        if (error) throw error;
        return data as LabService[];
      }

      const { data, error } = await supabaseClient
        .from("lab_services")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as LabService[];
    },
  });
}

export function useLabService(id: string | undefined) {
  return useQuery({
    queryKey: ["lab_services", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabaseClient
        .from("lab_services")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data as LabService | null;
    },
    enabled: !!id,
  });
}

export function useCreateLabService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (labService: LabServiceFormData) => {
      const { data, error } = await supabaseClient
        .from("lab_services")
        .insert([labService])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lab_services"] });
      toast.success("Lab service added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add lab service: " + error.message);
    },
  });
}

export function useUpdateLabService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...labService }: LabServiceFormData & { id: string }) => {
      const { data, error } = await supabaseClient
        .from("lab_services")
        .update(labService)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lab_services"] });
      toast.success("Lab service updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update lab service: " + error.message);
    },
  });
}

export function useDeleteLabService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabaseClient
        .from("lab_services")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lab_services"] });
      toast.success("Lab service deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete lab service: " + error.message);
    },
  });
}
