import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Procedure {
  id: string;
  name: string;
  cost: number;
  created_at: string;
  updated_at: string;
}

export interface ProcedureFormData {
  name: string;
  cost: number;
}

export function useProcedures(search?: string) {
  return useQuery({
    queryKey: ["procedures", search || ""],
    queryFn: async () => {
      const term = search?.trim();
      if (term) {
        const { data, error } = await supabase
          .from("procedures")
          .select("*")
          .ilike("name", `%${term}%`)
          .order("name");

        if (error) throw error;
        return data as Procedure[];
      }

      const { data, error } = await supabase
        .from("procedures")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Procedure[];
    },
  });
}

export function useProcedure(id: string | undefined) {
  return useQuery({
    queryKey: ["procedures", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("procedures")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Procedure | null;
    },
    enabled: !!id,
  });
}

export function useCreateProcedure() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (procedure: ProcedureFormData) => {
      const { data, error } = await supabase
        .from("procedures")
        .insert([procedure])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedures"] });
      toast.success("Procedure added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add procedure: " + error.message);
    },
  });
}

export function useUpdateProcedure() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...procedure }: ProcedureFormData & { id: string }) => {
      const { data, error } = await supabase
        .from("procedures")
        .update(procedure)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedures"] });
      toast.success("Procedure updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update procedure: " + error.message);
    },
  });
}

export function useDeleteProcedure() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("procedures")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedures"] });
      toast.success("Procedure deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete procedure: " + error.message);
    },
  });
}
