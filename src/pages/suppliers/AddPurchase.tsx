import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const mockMaterials = [
  { id: "1", name: "Composite Resin A2" },
  { id: "2", name: "Bonding Agent" },
  { id: "3", name: "Impression Material" },
  { id: "4", name: "Temporary Cement" },
  { id: "5", name: "Glass Ionomer" },
];

const clinics = [
  { id: "1", name: "Dental Care Clinic" },
  { id: "2", name: "Elite Dental Center" },
];

export default function AddPurchase() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    materials: [] as string[],
    unitCost: "",
    quantity: "",
    assignTo: "global" as "global" | "clinic",
    clinicId: "",
  });

  const [materialSearch, setMaterialSearch] = useState("");

  const handleAddMaterial = (materialId: string) => {
    if (!formData.materials.includes(materialId)) {
      setFormData({ ...formData, materials: [...formData.materials, materialId] });
    }
    setMaterialSearch("");
  };

  const handleRemoveMaterial = (materialId: string) => {
    setFormData({ ...formData, materials: formData.materials.filter((m) => m !== materialId) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Purchase recorded",
      description: "The purchase has been added to supplier history.",
    });
    navigate(`/suppliers/${id}`);
  };

  const filteredMaterials = mockMaterials.filter(
    (m) =>
      m.name.toLowerCase().includes(materialSearch.toLowerCase()) &&
      !formData.materials.includes(m.id)
  );

  const isValid =
    formData.materials.length > 0 &&
    formData.quantity !== "" &&
    (formData.assignTo === "global" || formData.clinicId !== "");

  const totalCost =
    formData.unitCost && formData.quantity
      ? (parseFloat(formData.unitCost) * parseInt(formData.quantity)).toFixed(2)
      : null;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            to={`/suppliers/${id}`}
            className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Add Purchase</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Purchase Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Purchase Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        {/* Materials Selection */}
        <div className="space-y-2">
          <Label>Materials *</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              value={materialSearch}
              onChange={(e) => setMaterialSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {materialSearch && filteredMaterials.length > 0 && (
            <div className="bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredMaterials.map((material) => (
                <button
                  key={material.id}
                  type="button"
                  onClick={() => handleAddMaterial(material.id)}
                  className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                >
                  {material.name}
                </button>
              ))}
            </div>
          )}
          {formData.materials.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.materials.map((materialId) => {
                const material = mockMaterials.find((m) => m.id === materialId);
                return (
                  <Badge key={materialId} variant="secondary" className="flex items-center gap-1">
                    {material?.name}
                    <button type="button" onClick={() => handleRemoveMaterial(materialId)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        {/* Cost & Quantity */}
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

        {totalCost && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Cost</span>
              <span className="font-medium">EGP {totalCost}</span>
            </div>
          </div>
        )}

        {/* Assign To */}
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
