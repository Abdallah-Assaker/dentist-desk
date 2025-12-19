import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClinics } from "@/hooks/useClinics";

export default function EmergencyPatient() {
  const navigate = useNavigate();
  const { data: clinics = [], isLoading } = useClinics();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    clinicId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, create patient and get ID
    const newPatientId = "new-" + Date.now();
    navigate(`/visits/new/form?patientId=${newPatientId}&emergency=true`);
  };

  const isValid = formData.clinicId !== "";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/visits/new" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Emergency Visit</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <p className="text-sm text-muted-foreground">
          Quick patient registration for walk-in visits. You can add full details later.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Patient Name</Label>
            <Input
              id="name"
              placeholder="Enter name or 'Unknown'"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinic">Clinic *</Label>
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
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={!isValid}>
            Continue to Visit
          </Button>
        </div>
      </form>
    </div>
  );
}
