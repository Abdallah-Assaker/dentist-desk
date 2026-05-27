import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClinics } from "@/hooks/useClinics";
import { useCreateAppointment } from "@/hooks/useAppointments";


const mockPatients = [
  { id: "1", name: "Sarah Ahmed", phone: "01012345678" },
  { id: "2", name: "Mohamed Ali", phone: "01098765432" },
  { id: "3", name: "Fatima Hassan", phone: "01155556666" },
  { id: "4", name: "Omar Khaled", phone: "01033334444" },
];

const durations = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
];

export default function AddAppointment() {
  const navigate = useNavigate();
  const [patientSearch, setPatientSearch] = useState("");
  const [isPatientDialogOpen, setIsPatientDialogOpen] = useState(false);
  const { data: clinics = [], isLoading: clinicsLoading } = useClinics();
  const createAppointment = useCreateAppointment();
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    clinicId: "",
    date: "",
    time: "",
    duration: "30",
    notes: "",
  });

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.phone.includes(patientSearch)
  );

  const handleSelectPatient = (patient: { id: string; name: string }) => {
    setFormData({ ...formData, patientId: patient.id, patientName: patient.name });
    setIsPatientDialogOpen(false);
    setPatientSearch("");
  };

  const submitAppointment = () => {
    if (!isValid || createAppointment.isPending) return;

    createAppointment.mutate(
      {
        patient_id: formData.patientId,
        patient_name: formData.patientName,
        clinic_id: formData.clinicId,
        appointment_date: formData.date,
        appointment_time: formData.time,
        duration_minutes: Number(formData.duration),
        notes: formData.notes.trim() || undefined,
      },
      {
        onSuccess: () => {
          navigate("/schedule");
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAppointment();
  };

  const isValid =
    formData.patientId !== "" &&
    formData.clinicId !== "" &&
    formData.date !== "" &&
    formData.time !== "";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Book Appointment</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Patient Selection */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Patient</h2>

          <Dialog open={isPatientDialogOpen} onOpenChange={setIsPatientDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-xl text-left hover:border-primary transition-colors"
              >
                {formData.patientId ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{formData.patientName}</span>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-muted-foreground">Select patient...</span>
                  </>
                )}
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Select Patient</DialogTitle>
              </DialogHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or phone..."
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border -mx-6 px-6">
                {filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    type="button"
                    onClick={() => handleSelectPatient(patient)}
                    className="w-full flex items-center gap-3 py-3 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.phone}</p>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* Clinic */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Clinic</h2>
          <Select
            value={formData.clinicId}
            onValueChange={(value) => setFormData({ ...formData, clinicId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select clinic" />
            </SelectTrigger>
            <SelectContent>
              {clinicsLoading && (
                <SelectItem value="loading" disabled>Loading...</SelectItem>
              )}
              {clinics.map((clinic) => (
                <SelectItem key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </SelectItem>
              ))}
              {!clinicsLoading && clinics.length === 0 && (
                <SelectItem value="none" disabled>No clinics found</SelectItem>
              )}
            </SelectContent>
          </Select>
        </section>

        {/* Date & Time */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Date & Time</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Duration */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Expected Duration</h2>
          <Select
            value={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {durations.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* Notes */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Notes (Optional)</h2>
          <Textarea
            placeholder="Appointment notes, reason for visit..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
          />
        </section>
      </form>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={submitAppointment} className="w-full" disabled={!isValid || createAppointment.isPending}>
          {createAppointment.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Appointment"
          )}
        </Button>
      </div>
    </div>
  );
}
