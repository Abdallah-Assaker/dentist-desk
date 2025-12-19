import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  useLabService, 
  useCreateLabService, 
  useUpdateLabService 
} from "@/hooks/useLabServices";

export default function AddLabService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { data: existingService, isLoading: isLoadingService } = useLabService(id);
  const createLabService = useCreateLabService();
  const updateLabService = useUpdateLabService();

  const [formData, setFormData] = useState({
    name: "",
    defaultCost: "",
    notes: "",
  });

  useEffect(() => {
    if (isEditMode && existingService) {
      setFormData({
        name: existingService.name,
        defaultCost: existingService.default_cost?.toString() || "",
        notes: existingService.notes || "",
      });
    }
  }, [isEditMode, existingService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      name: formData.name.trim(),
      default_cost: formData.defaultCost ? parseFloat(formData.defaultCost) : 0,
      notes: formData.notes.trim() || null,
    };

    if (isEditMode && id) {
      updateLabService.mutate(
        { id, ...serviceData },
        {
          onSuccess: () => {
            navigate("/lab-services");
          },
        }
      );
    } else {
      createLabService.mutate(serviceData, {
        onSuccess: () => {
          navigate("/lab-services");
        },
      });
    }
  };

  const isValid = formData.name.trim() !== "";
  const isSubmitting = createLabService.isPending || updateLabService.isPending;

  if (isEditMode && isLoadingService) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditMode ? "Updating..." : "Saving..."}
            </>
          ) : (
            isEditMode ? "Update Service" : "Save Service"
          )}
        </Button>
      </div>
    </div>
  );
}
