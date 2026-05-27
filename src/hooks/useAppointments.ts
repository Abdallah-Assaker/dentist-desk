import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Appointment {
  id: string;
  patient_id: string;
  patient_name: string;
  clinic_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppointmentFormData {
  patient_id: string;
  patient_name: string;
  clinic_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  notes?: string;
}

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true });

      if (error) throw error;
      return data as Appointment[];
    },
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointment: AppointmentFormData) => {
      const { data, error } = await supabase
        .from("appointments")
        .insert([appointment])
        .select()
        .single();

      if (error) throw error;
      return data as Appointment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment saved successfully");
    },
    onError: (error) => {
      toast.error("Failed to save appointment: " + error.message);
    },
  });
}
