import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, Plus, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const clinics = [
  { id: "1", name: "Dental Care Clinic" },
  { id: "2", name: "Elite Dental Center" },
];

// These would come from the Procedures module
const availableProcedures = [
  { id: "1", name: "Root Canal Treatment", cost: 1500 },
  { id: "2", name: "Cleaning & Checkup", cost: 300 },
  { id: "3", name: "Crown Fitting", cost: 2000 },
  { id: "4", name: "Tooth Extraction", cost: 500 },
  { id: "5", name: "Filling", cost: 400 },
  { id: "6", name: "Teeth Whitening", cost: 1000 },
];

const materials = [
  { id: "1", name: "Composite Resin A2", unit: "syringe" },
  { id: "2", name: "Anesthetic Carpules", unit: "piece" },
  { id: "3", name: "Disposable Gloves", unit: "pair" },
  { id: "4", name: "Cotton Rolls", unit: "pack" },
];

export default function VisitForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patientId");
  const isEmergency = searchParams.get("emergency") === "true";

  const [formData, setFormData] = useState({
    clinicId: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    selectedProcedures: [] as string[],
    selectedMaterials: [] as { id: string; quantity: number }[],
    notes: "",
    paymentCollected: "",
    hasLabOrder: false,
  });

  const handleProcedureToggle = (procedureId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedProcedures: prev.selectedProcedures.includes(procedureId)
        ? prev.selectedProcedures.filter((id) => id !== procedureId)
        : [...prev.selectedProcedures, procedureId],
    }));
  };

  const handleAddMaterial = (materialId: string) => {
    if (!formData.selectedMaterials.find((m) => m.id === materialId)) {
      setFormData((prev) => ({
        ...prev,
        selectedMaterials: [...prev.selectedMaterials, { id: materialId, quantity: 1 }],
      }));
    }
  };

  const handleRemoveMaterial = (materialId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedMaterials: prev.selectedMaterials.filter((m) => m.id !== materialId),
    }));
  };

  const handleMaterialQuantityChange = (materialId: string, quantity: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedMaterials: prev.selectedMaterials.map((m) =>
        m.id === materialId ? { ...m, quantity } : m
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, save visit and get ID
    const newVisitId = "visit-" + Date.now();
    navigate(`/visits/${newVisitId}`);
  };

  const totalProcedures = formData.selectedProcedures.reduce((sum, id) => {
    const proc = availableProcedures.find((p) => p.id === id);
    return sum + (proc?.cost || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/visits/new" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">New Visit</h1>
            {isEmergency && (
              <span className="text-xs text-primary-foreground/80">Emergency Patient</span>
            )}
          </div>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Clinic & DateTime */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Visit Details</h2>
          
          <div className="space-y-2">
            <Label>Clinic</Label>
            <Select
              value={formData.clinicId}
              onValueChange={(value) => setFormData({ ...formData, clinicId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select clinic" />
              </SelectTrigger>
              <SelectContent>
                {clinics.map((clinic) => (
                  <SelectItem key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

        {/* Procedures */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Procedures</h2>
          <div className="space-y-2">
            {availableProcedures.map((proc) => (
              <label
                key={proc.id}
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
              >
                <Checkbox
                  checked={formData.selectedProcedures.includes(proc.id)}
                  onCheckedChange={() => handleProcedureToggle(proc.id)}
                />
                <span className="flex-1 text-sm">{proc.name}</span>
                <span className="text-sm font-medium text-primary">EGP {proc.cost}</span>
              </label>
            ))}
          </div>
          {totalProcedures > 0 && (
            <div className="flex justify-between items-center p-3 bg-primary-light rounded-lg">
              <span className="font-medium">Total</span>
              <span className="font-bold text-primary">EGP {totalProcedures}</span>
            </div>
          )}
        </section>

        {/* Tooth Selector Placeholder */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Tooth Selection</h2>
          <Link
            to={`/patients/${patientId}/mouth`}
            className="block p-4 bg-card border border-dashed border-border rounded-lg text-center text-muted-foreground hover:border-primary transition-colors"
          >
            Tap to open mouth simulation
          </Link>
        </section>

        {/* Materials */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Materials Used</h2>
          
          <Select onValueChange={handleAddMaterial}>
            <SelectTrigger>
              <SelectValue placeholder="Add material..." />
            </SelectTrigger>
            <SelectContent>
              {materials
                .filter((m) => !formData.selectedMaterials.find((sm) => sm.id === m.id))
                .map((mat) => (
                  <SelectItem key={mat.id} value={mat.id}>
                    {mat.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            {formData.selectedMaterials.map((selected) => {
              const mat = materials.find((m) => m.id === selected.id);
              return (
                <div
                  key={selected.id}
                  className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
                >
                  <span className="flex-1 text-sm">{mat?.name}</span>
                  <Input
                    type="number"
                    min="1"
                    value={selected.quantity}
                    onChange={(e) => handleMaterialQuantityChange(selected.id, parseInt(e.target.value) || 1)}
                    className="w-20 text-center"
                  />
                  <span className="text-xs text-muted-foreground">{mat?.unit}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(selected.id)}
                    className="p-1 hover:bg-destructive/10 rounded"
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Notes */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Notes</h2>
          <Textarea
            placeholder="Clinical notes, observations..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
          />
        </section>

        {/* Attachments */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Attachments</h2>
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full p-4 bg-card border border-dashed border-border rounded-lg text-muted-foreground hover:border-primary transition-colors"
          >
            <Camera className="h-5 w-5" />
            <span>Add X-ray or Photo</span>
          </button>
        </section>

        {/* Payment */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Payment</h2>
          <div className="space-y-2">
            <Label>Amount Collected (EGP)</Label>
            <Input
              type="number"
              placeholder="0"
              value={formData.paymentCollected}
              onChange={(e) => setFormData({ ...formData, paymentCollected: e.target.value })}
            />
          </div>
        </section>

        {/* Lab Order */}
        <section className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg cursor-pointer">
            <Checkbox
              checked={formData.hasLabOrder}
              onCheckedChange={(checked) => setFormData({ ...formData, hasLabOrder: checked as boolean })}
            />
            <div>
              <span className="font-medium">Create Lab Order</span>
              <p className="text-sm text-muted-foreground">Add a lab work order for this visit</p>
            </div>
          </label>
        </section>
      </form>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full">
          Save Visit
        </Button>
      </div>
    </div>
  );
}
