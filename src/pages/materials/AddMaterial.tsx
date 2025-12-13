import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddMaterial() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    threshold: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, create material and get ID
    const newMaterialId = "material-" + Date.now();
    navigate(`/materials/${newMaterialId}/purchase?new=true`);
  };

  const isValid = formData.name.trim() !== "";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Add Material</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <p className="text-sm text-muted-foreground">
          Create a new material type. You'll add stock in the next step.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Material Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Composite Resin A2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="threshold">Low-Stock Threshold</Label>
            <Input
              id="threshold"
              type="number"
              min="0"
              placeholder="e.g., 10"
              value={formData.threshold}
              onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              You'll receive an alert when stock falls below this number
            </p>
          </div>
        </div>
      </form>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
          Continue to Add Stock
        </Button>
      </div>
    </div>
  );
}
