import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export default function AdjustBalance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    type: "payment" as "payment" | "adjustment",
    amount: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Balance adjusted",
      description: `${formData.type === "payment" ? "Payment" : "Adjustment"} of EGP ${formData.amount} recorded.`,
    });
    navigate(`/suppliers/${id}`);
  };

  const isValid = formData.amount !== "" && parseFloat(formData.amount) > 0;

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
          <h1 className="text-lg font-semibold">Adjust Balance</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Adjustment Type */}
        <div className="space-y-3">
          <Label>Adjustment Type *</Label>
          <RadioGroup
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as "payment" | "adjustment" })}
          >
            <div className="flex items-center space-x-2 p-3 bg-card border border-border rounded-lg">
              <RadioGroupItem value="payment" id="payment" />
              <Label htmlFor="payment" className="flex-1 cursor-pointer">
                <span className="font-medium">Payment Made</span>
                <p className="text-xs text-muted-foreground">Record a payment to this supplier</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-card border border-border rounded-lg">
              <RadioGroupItem value="adjustment" id="adjustment" />
              <Label htmlFor="adjustment" className="flex-1 cursor-pointer">
                <span className="font-medium">Manual Adjustment</span>
                <p className="text-xs text-muted-foreground">Correct balance due to discount, error, etc.</p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (EGP) *</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add any notes about this adjustment..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
          />
        </div>
      </form>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
          Save Adjustment
        </Button>
      </div>
    </div>
  );
}
