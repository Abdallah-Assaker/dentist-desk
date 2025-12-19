import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateClinic } from "@/hooks/useClinics";

const COLORS = ["clinic-1", "clinic-2", "clinic-3", "clinic-4", "clinic-5"];

export default function AddClinic() {
  const navigate = useNavigate();
  const createClinic = useCreateClinic();
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    revenueModel: "percentage",
    revenueValue: "",
    color: "clinic-1",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter clinic name");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Please enter clinic location");
      return;
    }
    if (!formData.revenueValue) {
      toast.error("Please enter revenue value");
      return;
    }

    await createClinic.mutateAsync({
      name: formData.name.trim(),
      location: formData.location.trim(),
      revenue_model: formData.revenueModel,
      revenue_value: parseFloat(formData.revenueValue),
      color: formData.color,
    });

    navigate("/clinics");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">Add Clinic</h1>
        </div>
      </header>

      {/* Form */}
      <div className="px-4 py-4 space-y-6 -mt-4">
        {/* Basic Info */}
        <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-foreground">Clinic Details</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Clinic Name *</Label>
            <Input
              id="name"
              placeholder="Enter clinic name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Area / District *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g., Nasr City, Cairo"
                className="pl-10"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Clinic Color</Label>
            <div className="flex gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleInputChange("color", color)}
                  className={`w-10 h-10 rounded-xl transition-all ${
                    formData.color === color ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: `hsl(var(--${color}))` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Model */}
        <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-foreground">Accounting Model</h2>

          <RadioGroup
            value={formData.revenueModel}
            onValueChange={(value) => handleInputChange("revenueModel", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage" className="flex-1 cursor-pointer">
                <span className="font-medium">Percentage of Revenue</span>
                <p className="text-sm text-muted-foreground">Clinic takes a % of each visit</p>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed" className="flex-1 cursor-pointer">
                <span className="font-medium">Fixed Fee per Visit</span>
                <p className="text-sm text-muted-foreground">Pay fixed amount per visit</p>
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="revenueValue">
              {formData.revenueModel === "percentage" ? "Percentage (%)" : "Fixed Amount (EGP)"} *
            </Label>
            <Input
              id="revenueValue"
              type="number"
              placeholder={formData.revenueModel === "percentage" ? "e.g., 30" : "e.g., 500"}
              value={formData.revenueValue}
              onChange={(e) => handleInputChange("revenueValue", e.target.value)}
            />
          </div>
        </div>

        {/* Save Button */}
        <Button 
          className="w-full h-12" 
          onClick={handleSave}
          disabled={createClinic.isPending}
        >
          {createClinic.isPending ? "Saving..." : "Save Clinic"}
        </Button>

        <div className="h-20" />
      </div>
    </div>
  );
}
