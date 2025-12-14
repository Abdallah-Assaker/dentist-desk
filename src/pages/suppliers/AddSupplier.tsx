import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const mockSupplier = {
  id: "1",
  name: "Dental Supplies Co.",
  phone: "+20 123 456 7890",
  whatsapp: "+201234567890",
  location: "Cairo, Egypt",
  notes: "Primary supplier for composite materials",
  openBalance: 2500,
};

export default function AddSupplier() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    location: "",
    notes: "",
    openBalance: "",
  });

  useEffect(() => {
    if (isEditMode) {
      // Load supplier data
      setFormData({
        name: mockSupplier.name,
        phone: mockSupplier.phone,
        whatsapp: mockSupplier.whatsapp,
        location: mockSupplier.location,
        notes: mockSupplier.notes,
        openBalance: mockSupplier.openBalance.toString(),
      });
    }
  }, [isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isEditMode ? "Supplier updated" : "Supplier created",
      description: `${formData.name} has been saved.`,
    });
    navigate(isEditMode ? `/suppliers/${id}` : "/suppliers");
  };

  const isValid = formData.name.trim() !== "";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            to={isEditMode ? `/suppliers/${id}` : "/suppliers"}
            className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">
            {isEditMode ? "Edit Supplier" : "Add Supplier"}
          </h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Basic Information</h2>
          
          <div className="space-y-2">
            <Label htmlFor="name">Supplier Name *</Label>
            <Input
              id="name"
              placeholder="Enter supplier name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+20 xxx xxx xxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="+20 xxx xxx xxxx"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Notes</h2>
          <Textarea
            placeholder="Add any notes about this supplier..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
          />
        </div>

        {/* Initial Balance */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">
            {isEditMode ? "Open Balance" : "Initial Open Balance"}
          </h2>
          <div className="space-y-2">
            <Label htmlFor="openBalance">Amount (EGP)</Label>
            <Input
              id="openBalance"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.openBalance}
              onChange={(e) => setFormData({ ...formData, openBalance: e.target.value })}
            />
          </div>
        </div>
      </form>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
          {isEditMode ? "Update Supplier" : "Save Supplier"}
        </Button>
      </div>
    </div>
  );
}
