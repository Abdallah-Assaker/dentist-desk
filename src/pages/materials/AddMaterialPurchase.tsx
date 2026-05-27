import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useClinics } from "@/hooks/useClinics";

const suppliers = [
  { id: "1", name: "Dental Supplies Co." },
  { id: "2", name: "MedEquip Egypt" },
  { id: "3", name: "ProDent Materials" },
];

const materials = [
  { id: "1", name: "Composite Resin A2" },
  { id: "2", name: "Anesthetic Carpules" },
  { id: "3", name: "Dental Cement" },
  { id: "4", name: "Impression Material" },
  { id: "5", name: "Bonding Agent" },
  { id: "6", name: "Temporary Filling" },
];

export default function AddMaterialPurchase() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isNewMaterial = searchParams.get("new") === "true";

  // If we have an id from params, use it as the pre-selected material
  const [formData, setFormData] = useState({
    materialId: id || "",
    supplierId: "",
    unitCost: "",
    quantity: "",
    assignTo: "global" as "global" | "clinic",
    clinicId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, save purchase
    if (formData.materialId) {
      navigate(`/materials/${formData.materialId}`);
    } else {
      navigate("/materials");
    }
  };

  const isValid =
    formData.materialId !== "" &&
    formData.supplierId !== "" &&
    formData.quantity !== "" &&
    (formData.assignTo === "global" || formData.clinicId !== "");

  // Get selected material name for display
  const selectedMaterial = materials.find(m => m.id === formData.materialId);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            to={id ? `/materials/${id}` : "/materials"}
            className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Add Purchase</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {isNewMaterial && (
          <div className="p-3 bg-primary-light rounded-lg">
            <p className="text-sm text-primary font-medium">
              Add initial stock for your new material
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Material Selection - show dropdown if no id provided */}
          <div className="space-y-2">
            <Label>Material *</Label>
            {id ? (
              <div className="p-3 bg-muted rounded-lg">
                <span className="font-medium">{selectedMaterial?.name || `Material #${id}`}</span>
              </div>
            ) : (
              <Select
                value={formData.materialId}
                onValueChange={(value) => setFormData({ ...formData, materialId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((material) => (
                    <SelectItem key={material.id} value={material.id}>
                      {material.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label>Supplier *</Label>
            <Select
              value={formData.supplierId}
              onValueChange={(value) => setFormData({ ...formData, supplierId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="unitCost">Unit Cost (EGP)</Label>
              <Input
                id="unitCost"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.unitCost}
                onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
          </div>

          {formData.unitCost && formData.quantity && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="font-medium">
                  EGP {(parseFloat(formData.unitCost) * parseInt(formData.quantity)).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label>Assign To *</Label>
            <RadioGroup
              value={formData.assignTo}
              onValueChange={(value) => setFormData({ ...formData, assignTo: value as "global" | "clinic" })}
            >
              <div className="flex items-center space-x-2 p-3 bg-card border border-border rounded-lg">
                <RadioGroupItem value="global" id="global" />
                <Label htmlFor="global" className="flex-1 cursor-pointer">
                  <span className="font-medium">Global Inventory</span>
                  <p className="text-xs text-muted-foreground">Available across all clinics</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-card border border-border rounded-lg">
                <RadioGroupItem value="clinic" id="clinic" />
                <Label htmlFor="clinic" className="flex-1 cursor-pointer">
                  <span className="font-medium">Specific Clinic</span>
                  <p className="text-xs text-muted-foreground">Assigned to one clinic only</p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.assignTo === "clinic" && (
            <div className="space-y-2">
              <Label>Select Clinic</Label>
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
          )}
        </div>
      </form>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
          Save Purchase
        </Button>
      </div>
    </div>
  );
}