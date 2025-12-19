import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Clinic {
  id: string;
  name: string;
  location: string;
  revenue_model: string;
  revenue_value: number;
  total_earnings: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface ClinicFormData {
  name: string;
  location: string;
  revenue_model: string;
  revenue_value: number;
  color?: string;
}

export function useClinics() {
  return useQuery({
    queryKey: ["clinics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Clinic[];
    },
  });
}

export function useClinic(id: string | undefined) {
  return useQuery({
    queryKey: ["clinics", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Clinic | null;
    },
    enabled: !!id,
  });
}

export function useCreateClinic() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (clinic: ClinicFormData) => {
      const { data, error } = await supabase
        .from("clinics")
        .insert([clinic])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
      toast.success("Clinic added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add clinic: " + error.message);
    },
  });
}

export function useUpdateClinic() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...clinic }: ClinicFormData & { id: string }) => {
      const { data, error } = await supabase
        .from("clinics")
        .update(clinic)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
      queryClient.invalidateQueries({ queryKey: ["clinics", data.id] });
      toast.success("Clinic updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update clinic: " + error.message);
    },
  });
}

export function useDeleteClinic() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("clinics")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
      toast.success("Clinic deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete clinic: " + error.message);
    },
  });
}

// Helper to get clinic color classes
export const clinicColorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-clinic-1", text: "text-clinic-1" },
  green: { bg: "bg-clinic-2", text: "text-clinic-2" },
  purple: { bg: "bg-clinic-3", text: "text-clinic-3" },
  orange: { bg: "bg-clinic-4", text: "text-clinic-4" },
  pink: { bg: "bg-clinic-5", text: "text-clinic-5" },
  "clinic-1": { bg: "bg-clinic-1", text: "text-clinic-1" },
  "clinic-2": { bg: "bg-clinic-2", text: "text-clinic-2" },
  "clinic-3": { bg: "bg-clinic-3", text: "text-clinic-3" },
  "clinic-4": { bg: "bg-clinic-4", text: "text-clinic-4" },
  "clinic-5": { bg: "bg-clinic-5", text: "text-clinic-5" },
};

export function getClinicColorClasses(color: string) {
  return clinicColorMap[color] || clinicColorMap.blue;
}
