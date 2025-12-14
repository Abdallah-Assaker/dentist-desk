import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, MapPin, Edit, Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockLab = {
  id: "1",
  name: "Premium Dental Lab",
  phone: "+20 100 123 4567",
  whatsapp: "+201001234567",
  location: "Cairo, Egypt",
  notes: "Excellent quality crowns. Delivery takes 5-7 days.",
  openBalance: 2500,
  totalBilled: 15000,
  totalPaid: 12500,
  totalOrders: 24,
  activeOrders: 3,
  lastOrderDate: "2024-01-10",
};

const mockLabOrders = [
  { id: "1", patientName: "Ahmed Hassan", procedure: "Zirconia Crown", status: "In Progress", date: "2024-01-10" },
  { id: "2", patientName: "Sara Ali", procedure: "Veneer Set (4)", status: "Ready", date: "2024-01-08" },
  { id: "3", patientName: "Mohamed Khaled", procedure: "Metal Crown", status: "Delivered", date: "2024-01-05" },
];

const mockAdjustments = [
  { id: "1", type: "Payment", amount: 5000, date: "2024-01-08", notes: "Bank transfer" },
  { id: "2", type: "Manual Adjustment", amount: -500, date: "2024-01-02", notes: "Discount applied" },
];

export default function LabDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${mockLab.whatsapp}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${mockLab.phone}`;
  };

  const handleLocation = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(mockLab.location)}`, "_blank");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/labs" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Lab Details</h1>
          </div>
          <Button
            onClick={() => navigate(`/labs/${id}/edit`)}
            size="sm"
            variant="secondary"
            className="gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Lab Header Card */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-foreground mb-3">{mockLab.name}</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{mockLab.phone}</span>
              </div>
              {mockLab.location && (
                <button
                  onClick={handleLocation}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{mockLab.location}</span>
                </button>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={handleCall} className="flex-1 gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" size="sm" onClick={handleWhatsApp} className="flex-1 gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className={`text-xl font-bold ${mockLab.openBalance > 0 ? "text-warning" : "text-foreground"}`}>
                  {mockLab.openBalance.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Open Balance</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{mockLab.totalBilled.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Billed</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{mockLab.totalPaid.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/labs/${id}/adjust-balance`)}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Wallet className="h-4 w-4" />
            Adjust Balance
          </Button>
        </div>

        {/* Summary Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Orders Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-foreground">{mockLab.totalOrders}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">{mockLab.activeOrders}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">{mockLab.lastOrderDate}</p>
                <p className="text-xs text-muted-foreground">Last Order</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {mockLab.notes && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{mockLab.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Lab Orders Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Lab Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {mockLabOrders.length > 0 ? (
              <div className="space-y-3">
                {mockLabOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/lab-orders/${order.id}`)}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{order.patientName}</p>
                      <p className="text-sm text-muted-foreground">{order.procedure}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No lab orders for this lab yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Balance Adjustments Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Balance Adjustments</CardTitle>
          </CardHeader>
          <CardContent>
            {mockAdjustments.length > 0 ? (
              <div className="space-y-3">
                {mockAdjustments.map((adjustment) => (
                  <div
                    key={adjustment.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">{adjustment.type}</p>
                      <p className="text-sm text-muted-foreground">{adjustment.notes}</p>
                      <p className="text-xs text-muted-foreground">{adjustment.date}</p>
                    </div>
                    <p className={`font-semibold ${adjustment.amount > 0 ? "text-primary" : "text-destructive"}`}>
                      {adjustment.amount > 0 ? "-" : "+"}{Math.abs(adjustment.amount).toLocaleString()} EGP
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No balance adjustments yet
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
