import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const mockProcedures: Record<string, { name: string; cost: number }> = {
  "1": { name: "Root Canal Treatment", cost: 1500 },
  "2": { name: "Cleaning & Checkup", cost: 300 },
  "3": { name: "Crown Fitting", cost: 2000 },
  "4": { name: "Tooth Extraction", cost: 500 },
  "5": { name: "Filling", cost: 400 },
  "6": { name: "Teeth Whitening", cost: 1000 },
};

export default function AddProcedure() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const existingProcedure = id ? mockProcedures[id] : null;

  const [formData, setFormData] = useState({
    name: existingProcedure?.name || "",
    cost: existingProcedure?.cost?.toString() || "",
  });

  const [errors, setErrors] = useState<{ name?: string; cost?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; cost?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Procedure name is required";
    }
    
    if (!formData.cost.trim()) {
      newErrors.cost = "Cost is required";
    } else if (isNaN(Number(formData.cost)) || Number(formData.cost) < 0) {
      newErrors.cost = "Cost must be a valid positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    toast({
      title: isEditing ? "Procedure updated" : "Procedure added",
      description: `${formData.name} has been ${isEditing ? "updated" : "added"} successfully.`,
    });
    
    navigate("/procedures");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/procedures" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">
            {isEditing ? "Edit Procedure" : "Add Procedure"}
          </h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Procedure Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Root Canal Treatment"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost (EGP) *</Label>
            <Input
              id="cost"
              type="number"
              min="0"
              placeholder="0"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              className={errors.cost ? "border-destructive" : ""}
            />
            {errors.cost && (
              <p className="text-sm text-destructive">{errors.cost}</p>
            )}
          </div>
        </div>
      </form>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => navigate("/procedures")}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          {isEditing ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
}
