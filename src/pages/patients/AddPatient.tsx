import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClinics } from "@/hooks/useClinics";

export default function AddPatient() {
  const navigate = useNavigate();
  const { data: clinics = [], isLoading } = useClinics();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    secondaryPhone: "",
    whatsapp: "",
    clinicId: "",
    medicalHistory: "",
    dentalHistory: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, create patient and get ID
    const newPatientId = "patient-" + Date.now();
    navigate(`/patients/${newPatientId}`);
  };

  const isValid = formData.name.trim() !== "" && formData.clinicId !== "";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Add Patient</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Personal Information */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Personal Information</h2>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter patient name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryPhone">Secondary Contact (Optional)</Label>
            <Input
              id="secondaryPhone"
              type="tel"
              placeholder="Alternative phone number"
              value={formData.secondaryPhone}
              onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number (Optional)</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="WhatsApp number for notifications"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>
        </section>

        {/* Assigned Clinic */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Assigned Clinic</h2>
          
          <div className="space-y-2">
            <Label>Primary Clinic *</Label>
            <Select
              value={formData.clinicId}
              onValueChange={(value) => setFormData({ ...formData, clinicId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select clinic" />
              </SelectTrigger>
              <SelectContent>
                {isLoading && (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                )}
                {clinics.map((clinic) => (
                  <SelectItem key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </SelectItem>
                ))}
                {!isLoading && clinics.length === 0 && (
                  <SelectItem value="none" disabled>
                    No clinics found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Medical History */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Medical History</h2>
          
          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Medical Conditions & Allergies</Label>
            <Textarea
              id="medicalHistory"
              placeholder="e.g., Diabetes, Hypertension, Allergies to penicillin..."
              value={formData.medicalHistory}
              onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
              rows={4}
            />
          </div>
        </section>

        {/* Dental History */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Dental History</h2>
          
          <div className="space-y-2">
            <Label htmlFor="dentalHistory">Previous Dental Treatments</Label>
            <Textarea
              id="dentalHistory"
              placeholder="Previous extractions, root canals, orthodontic treatment..."
              value={formData.dentalHistory}
              onChange={(e) => setFormData({ ...formData, dentalHistory: e.target.value })}
              rows={4}
            />
          </div>
        </section>
      </form>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
          Save Patient
        </Button>
      </div>
    </div>
  );
}
