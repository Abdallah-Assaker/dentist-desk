import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const mockPatients = [
  { id: "1", name: "Ahmed Hassan" },
  { id: "2", name: "Sara Mohamed" },
  { id: "3", name: "Omar Ali" },
];

const mockVisits = [
  { id: "1", patientId: "1", date: "2024-01-10", procedure: "Crown Preparation" },
  { id: "2", patientId: "1", date: "2024-01-05", procedure: "Root Canal" },
  { id: "3", patientId: "2", date: "2024-01-08", procedure: "Veneer Prep" },
];

const mockLabs = [
  { id: "1", name: "Premium Dental Lab" },
  { id: "2", name: "Quick Dental Lab" },
  { id: "3", name: "Express Dental Lab" },
];

const mockLabServices = [
  { id: "1", name: "Crown", defaultCost: 800 },
  { id: "2", name: "Bridge", defaultCost: 1500 },
  { id: "3", name: "Veneer", defaultCost: 1200 },
  { id: "4", name: "Removable Denture", defaultCost: 2500 },
  { id: "5", name: "Implant Crown", defaultCost: 2000 },
];

const mockClinics = [
  { id: "1", name: "Cairo Dental Center" },
  { id: "2", name: "Giza Medical Complex" },
  { id: "3", name: "Alexandria Clinic" },
];

type CostBearer = "dentist" | "patient" | "clinic" | "dentist_clinic" | "clinic_model";

export default function AddLabOrder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const visitIdFromParams = searchParams.get("visitId");

  const [formData, setFormData] = useState({
    patientId: "",
    visitId: visitIdFromParams || "",
    clinicId: "",
    labId: "",
    selectedServices: [] as string[],
    notes: "",
    lastAppointmentDate: "",
    nextAppointmentDate: "",
    cost: "",
    costBearer: "" as CostBearer | "",
    dentistPercentage: "50",
    status: "pending_send",
  });

  const filteredVisits = mockVisits.filter((v) => v.patientId === formData.patientId);

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      const newServices = prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId];

      // Calculate total cost from selected services
      const totalCost = newServices.reduce((sum, id) => {
        const service = mockLabServices.find((s) => s.id === id);
        return sum + (service?.defaultCost || 0);
      }, 0);

      return {
        ...prev,
        selectedServices: newServices,
        cost: totalCost.toString(),
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Lab order created",
      description: "The lab order has been created successfully.",
    });
    navigate("/lab-orders/1");
  };

  const isValid =
    formData.patientId &&
    formData.visitId &&
    formData.labId &&
    formData.selectedServices.length > 0 &&
    formData.costBearer &&
    formData.lastAppointmentDate &&
    formData.nextAppointmentDate;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            to="/lab-orders"
            className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">Create Lab Order</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Visit Association */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Visit Association</h2>

          <div className="space-y-2">
            <Label>Patient *</Label>
            <Select
              value={formData.patientId}
              onValueChange={(value) =>
                setFormData({ ...formData, patientId: value, visitId: "" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Visit *</Label>
            <Select
              value={formData.visitId}
              onValueChange={(value) => setFormData({ ...formData, visitId: value })}
              disabled={!formData.patientId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visit" />
              </SelectTrigger>
              <SelectContent>
                {filteredVisits.map((visit) => (
                  <SelectItem key={visit.id} value={visit.id}>
                    {visit.date} - {visit.procedure}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Clinic *</Label>
            <Select
              value={formData.clinicId}
              onValueChange={(value) => setFormData({ ...formData, clinicId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select clinic" />
              </SelectTrigger>
              <SelectContent>
                {mockClinics.map((clinic) => (
                  <SelectItem key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lab Selection */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Lab Selection</h2>

          <div className="space-y-2">
            <Label>Lab *</Label>
            <Select
              value={formData.labId}
              onValueChange={(value) => setFormData({ ...formData, labId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select lab" />
              </SelectTrigger>
              <SelectContent>
                {mockLabs.map((lab) => (
                  <SelectItem key={lab.id} value={lab.id}>
                    {lab.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lab Services */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Lab Services *</h2>
          <div className="space-y-3">
            {mockLabServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={service.id}
                    checked={formData.selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <Label htmlFor={service.id} className="cursor-pointer">
                    {service.name}
                  </Label>
                </div>
                <span className="text-sm text-muted-foreground">
                  {service.defaultCost} EGP
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Order Notes / Instructions</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Special instructions for the lab..."
            rows={3}
          />
        </div>

        {/* Dates */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Dates</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastDate">Last Appointment *</Label>
              <Input
                id="lastDate"
                type="date"
                value={formData.lastAppointmentDate}
                onChange={(e) =>
                  setFormData({ ...formData, lastAppointmentDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextDate">Next Appointment *</Label>
              <Input
                id="nextDate"
                type="date"
                value={formData.nextAppointmentDate}
                onChange={(e) =>
                  setFormData({ ...formData, nextAppointmentDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Cost Information */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Cost Information</h2>

          <div className="space-y-2">
            <Label htmlFor="cost">Total Cost (EGP)</Label>
            <Input
              id="cost"
              type="number"
              min="0"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label>Cost Bearer *</Label>
            <Select
              value={formData.costBearer}
              onValueChange={(value: CostBearer) =>
                setFormData({ ...formData, costBearer: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Who pays for this?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dentist">Dentist</SelectItem>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="clinic">Clinic</SelectItem>
                <SelectItem value="dentist_clinic">Dentist–Clinic Split</SelectItem>
                <SelectItem value="clinic_model">According to Clinic Model</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.costBearer === "dentist_clinic" && (
            <div className="space-y-2">
              <Label htmlFor="percentage">Dentist Percentage (%)</Label>
              <Input
                id="percentage"
                type="number"
                min="0"
                max="100"
                value={formData.dentistPercentage}
                onChange={(e) =>
                  setFormData({ ...formData, dentistPercentage: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Clinic pays {100 - parseInt(formData.dentistPercentage || "0")}%
              </p>
            </div>
          )}
        </div>

        {/* Initial Status */}
        <div className="space-y-2">
          <Label>Initial Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending_send">Pending Send</SelectItem>
              <SelectItem value="pending_lab">Pending Lab</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
          Create Lab Order
        </Button>
      </div>
    </div>
  );
}
