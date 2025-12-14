import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const mockLab = {
  id: "1",
  name: "Premium Dental Lab",
  phone: "+20 100 123 4567",
  whatsapp: "+201001234567",
  location: "Cairo, Egypt",
  notes: "Excellent quality crowns. Delivery takes 5-7 days.",
  openBalance: 2500,
};

export default function AddLab() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
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
      setFormData({
        name: mockLab.name,
        phone: mockLab.phone,
        whatsapp: mockLab.whatsapp,
        location: mockLab.location,
        notes: mockLab.notes,
        openBalance: mockLab.openBalance.toString(),
      });
    }
  }, [isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isEditMode ? "Lab updated" : "Lab added",
      description: isEditMode
        ? "Lab information has been updated successfully."
        : "New lab has been added successfully.",
    });
    navigate(isEditMode ? `/labs/${id}` : "/labs");
  };

  const isValid = formData.name.trim() !== "";

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link
            to={isEditMode ? `/labs/${id}` : "/labs"}
            className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">
            {isEditMode ? "Edit Lab" : "Add Lab"}
          </h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Basic Information</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Lab Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter lab name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+20 100 123 4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+201001234567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="E.g. delivery times, preferences..."
              rows={3}
            />
          </div>

          {!isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="openBalance">Initial Open Balance (EGP)</Label>
              <Input
                id="openBalance"
                type="number"
                min="0"
                value={formData.openBalance}
                onChange={(e) => setFormData({ ...formData, openBalance: e.target.value })}
                placeholder="0"
              />
            </div>
          )}
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
          {isEditMode ? "Update Lab" : "Save Lab"}
        </Button>
      </div>
    </div>
  );
}
