import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, MapPin, Edit, Plus, RefreshCw, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mockSupplier = {
  id: "1",
  name: "Dental Supplies Co.",
  phone: "+20 123 456 7890",
  whatsapp: "+201234567890",
  location: "Cairo, Egypt",
  notes: "Primary supplier for composite materials. Reliable delivery times.",
  openBalance: 2500,
  totalPurchases: 15800,
  lastPurchaseDate: "2024-01-10",
};

const mockPurchases = [
  { id: "1", date: "2024-01-10", materials: ["Composite Resin A2"], quantity: 10, total: 1500, clinic: "Dental Care Clinic" },
  { id: "2", date: "2024-01-05", materials: ["Bonding Agent"], quantity: 5, total: 800, clinic: "Global" },
  { id: "3", date: "2023-12-28", materials: ["Impression Material"], quantity: 20, total: 2000, clinic: "Elite Dental Center" },
  { id: "4", date: "2023-12-15", materials: ["Temporary Cement", "Glass Ionomer"], quantity: 15, total: 1200, clinic: "Global" },
];

const mockAdjustments = [
  { id: "1", date: "2024-01-08", type: "Payment made", amount: -1000, notes: "Bank transfer" },
  { id: "2", date: "2023-12-20", type: "Manual adjustment", amount: -500, notes: "Discount applied" },
];

export default function SupplierDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${mockSupplier.whatsapp.replace(/\D/g, "")}`, "_blank");
  };

  const handleCall = () => {
    window.open(`tel:${mockSupplier.phone}`, "_self");
  };

  const handleLocation = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(mockSupplier.location)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/suppliers" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold flex-1">Supplier Details</h1>
          <Button
            size="icon"
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-dark"
            onClick={() => navigate(`/suppliers/${id}/edit`)}
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Supplier Header Card */}
        <div className="bg-card rounded-xl p-4 shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-3">{mockSupplier.name}</h2>
          <div className="space-y-2">
            <button
              onClick={handleCall}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              {mockSupplier.phone}
            </button>
            {mockSupplier.whatsapp && (
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>
            )}
            {mockSupplier.location && (
              <button
                onClick={handleLocation}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin className="h-4 w-4" />
                {mockSupplier.location}
              </button>
            )}
          </div>
        </div>

        {/* Financial Summary Card */}
        <div className="bg-card rounded-xl p-4 shadow-card">
          <h3 className="font-semibold text-foreground mb-3">Financial Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className={`text-2xl font-bold ${mockSupplier.openBalance > 0 ? "text-warning" : "text-muted-foreground"}`}>
                {mockSupplier.openBalance.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Open Balance (EGP)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{mockSupplier.totalPurchases.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Purchases (EGP)</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{mockSupplier.lastPurchaseDate}</p>
              <p className="text-xs text-muted-foreground">Last Purchase</p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(`/suppliers/${id}/purchase`)}
          >
            <Plus className="h-4 w-4" />
            Add Purchase
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(`/suppliers/${id}/adjust-balance`)}
          >
            <RefreshCw className="h-4 w-4" />
            Adjust Balance
          </Button>
        </div>

        {/* Notes */}
        {mockSupplier.notes && (
          <div className="bg-card rounded-xl p-4 shadow-card">
            <h3 className="font-semibold text-foreground mb-2">Notes</h3>
            <p className="text-sm text-muted-foreground">{mockSupplier.notes}</p>
          </div>
        )}

        <Separator />

        {/* Purchase History */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Purchase History</h3>
          {mockPurchases.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-xl">
              <p className="text-muted-foreground">No purchases recorded for this supplier</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockPurchases.map((purchase) => (
                <div key={purchase.id} className="bg-card rounded-xl p-4 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">{purchase.date}</p>
                      <p className="font-medium text-foreground truncate">
                        {purchase.materials.join(", ")}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">Qty: {purchase.quantity}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          {purchase.clinic}
                        </span>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground shrink-0">
                      EGP {purchase.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Balance Adjustments */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Balance Adjustments</h3>
          {mockAdjustments.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-xl">
              <p className="text-muted-foreground">No adjustments recorded</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockAdjustments.map((adjustment) => (
                <div key={adjustment.id} className="bg-card rounded-xl p-4 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">{adjustment.date}</p>
                      <p className="font-medium text-foreground">{adjustment.type}</p>
                      {adjustment.notes && (
                        <p className="text-xs text-muted-foreground mt-1">{adjustment.notes}</p>
                      )}
                    </div>
                    <p className={`font-semibold shrink-0 ${adjustment.amount < 0 ? "text-green-600" : "text-foreground"}`}>
                      {adjustment.amount < 0 ? "-" : "+"}EGP {Math.abs(adjustment.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
