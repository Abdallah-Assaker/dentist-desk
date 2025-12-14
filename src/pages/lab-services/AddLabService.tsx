import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const mockService = {
  id: "1",
  name: "Zirconia Crown",
  defaultCost: 1500,
  notes: "High-quality ceramic crown",
};

export default function AddLabService() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    defaultCost: "",
    notes: "",
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: mockService.name,
        defaultCost: mockService.defaultCost.toString(),
        notes: mockService.notes,
      });
    }
  }, [isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isEditMode ? "Lab service updated" : "Lab service added",
      description: isEditMode
        ? "Lab service has been updated successfully."
        : "New lab service has been added successfully.",
    });
    navigate("/lab-services");
  };

  const isValid = formData.name.trim() !== "";

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            to="/lab-services"
            className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">
            {isEditMode ? "Edit Lab Service" : "Add Lab Service"}
          </h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="E.g. Zirconia Crown"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultCost">Default Cost (EGP)</Label>
            <Input
              id="defaultCost"
              type="number"
              min="0"
              value={formData.defaultCost}
              onChange={(e) => setFormData({ ...formData, defaultCost: e.target.value })}
              placeholder="0"
            />
            <p className="text-xs text-muted-foreground">
              This is a suggestion only. Cost can be adjusted per order.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Optional notes about this service..."
              rows={3}
            />
          </div>
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
          {isEditMode ? "Update Service" : "Save Service"}
        </Button>
      </div>
    </div>
  );
}
