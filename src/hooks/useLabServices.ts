import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
        const { data, error } = await supabase
          .from("lab_services")
          .select("*")
          .ilike("name", `%${term}%`)
          .order("name");

        if (error) throw error;
        return data as LabService[];
      }

      const { data, error } = await supabase
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
      const { data, error } = await supabase
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
      const { data, error } = await supabase
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
      const { data, error } = await supabase
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
      const { error } = await supabase
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
