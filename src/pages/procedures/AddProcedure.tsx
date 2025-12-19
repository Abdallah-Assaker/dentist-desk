import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProcedure, useCreateProcedure, useUpdateProcedure } from "@/hooks/useProcedures";

export default function AddProcedure() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { data: existingProcedure, isLoading: isLoadingProcedure } = useProcedure(id);
  const createProcedure = useCreateProcedure();
  const updateProcedure = useUpdateProcedure();

  const [formData, setFormData] = useState({
    name: "",
    cost: "",
  });

  const [errors, setErrors] = useState<{ name?: string; cost?: string }>({});

  useEffect(() => {
    if (existingProcedure) {
      setFormData({
        name: existingProcedure.name,
        cost: existingProcedure.cost.toString(),
      });
    }
  }, [existingProcedure]);

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

    const procedureData = {
      name: formData.name.trim(),
      cost: Number(formData.cost),
    };

    if (isEditing && id) {
      updateProcedure.mutate(
        { id, ...procedureData },
        {
          onSuccess: () => {
            navigate("/procedures");
          },
        }
      );
    } else {
      createProcedure.mutate(procedureData, {
        onSuccess: () => {
          navigate("/procedures");
        },
      });
    }
  };

  const isPending = createProcedure.isPending || updateProcedure.isPending;

  if (isEditing && isLoadingProcedure) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link to="/procedures" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold">Edit Procedure</h1>
          </div>
        </header>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

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
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex-1" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isEditing ? (
            "Update"
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}
