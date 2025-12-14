import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Stethoscope, Package, FileText, CreditCard, FlaskConical, Image, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock visit data
const mockVisit = {
  id: "1",
  patientName: "Sarah Ahmed",
  patientId: "1",
  clinicName: "Dental Care Clinic",
  date: "2024-01-15",
  time: "10:00 AM",
  duration: "45 min",
  procedures: [
    { name: "Root Canal Treatment", price: 1500, tooth: "16" },
    { name: "Temporary Filling", price: 200, tooth: "16" },
  ],
  materials: [
    { name: "Composite Resin A2", quantity: 2, unit: "syringe", cost: 150 },
    { name: "Anesthetic Carpules", quantity: 2, unit: "piece", cost: 40 },
  ],
  labOrders: [
    { id: "1", type: "Crown", status: "pending_lab", lab: "Dental Lab Pro" },
  ],
  notes: "Patient presented with severe pain in upper right molar. Diagnosed as pulp necrosis. Performed root canal treatment. Temporary filling placed. Crown recommended.",
  payment: {
    total: 1700,
    collected: 1000,
    remaining: 700,
  },
  profit: 1460,
  xrays: [
    { id: "1", type: "PA X-ray", date: "2024-01-15" },
  ],
};

export default function VisitDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Visit Details</h1>
            <p className="text-sm text-primary-foreground/80">{mockVisit.patientName}</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Visit Info Card */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{mockVisit.clinicName}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{mockVisit.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{mockVisit.time} ({mockVisit.duration})</span>
            </div>
          </div>
        </div>

        {/* Procedures */}
        <section className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Procedures</h2>
          </div>
          <div className="space-y-2">
            {mockVisit.procedures.map((proc, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm">{proc.name}</p>
                  <p className="text-xs text-muted-foreground">Tooth #{proc.tooth}</p>
                </div>
                <span className="font-medium text-primary">EGP {proc.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Materials */}
        <section className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Materials Used</h2>
          </div>
          <div className="space-y-2">
            {mockVisit.materials.map((mat, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm">{mat.name}</p>
                  <p className="text-xs text-muted-foreground">{mat.quantity} {mat.unit}</p>
                </div>
                <span className="text-sm text-muted-foreground">EGP {mat.cost}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Lab Orders */}
        <section className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Lab Orders</h2>
            </div>
            <Link to={`/lab-orders/new?visitId=${id}&patientId=${mockVisit.patientId}&patientName=${encodeURIComponent(mockVisit.patientName)}&clinicName=${encodeURIComponent(mockVisit.clinicName)}`}>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Create Lab Order
              </Button>
            </Link>
          </div>
          {mockVisit.labOrders.length > 0 ? (
            <div className="space-y-2">
              {mockVisit.labOrders.map((lab) => (
                <Link key={lab.id} to={`/lab-orders/${lab.id}`} className="block">
                  <div className="flex items-center justify-between py-2 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors">
                    <div>
                      <p className="font-medium text-sm">{lab.type}</p>
                      <p className="text-xs text-muted-foreground">{lab.lab}</p>
                    </div>
                    <Badge variant="outline" className="bg-status-warning/10 text-status-warning border-status-warning/20">
                      Pending Lab
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No lab orders for this visit</p>
          )}
        </section>

        {/* X-rays */}
        {mockVisit.xrays.length > 0 && (
          <section className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">X-rays & Media</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mockVisit.xrays.map((xray) => (
                <div key={xray.id} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Notes */}
        <section className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Notes</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{mockVisit.notes}</p>
        </section>

        {/* Financial Summary */}
        <section className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Payment</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium">EGP {mockVisit.payment.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Collected</span>
              <span className="font-medium text-status-success">EGP {mockVisit.payment.collected}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-medium text-status-error">EGP {mockVisit.payment.remaining}</span>
            </div>
            <div className="pt-2 border-t border-border flex justify-between">
              <span className="font-medium">Profit</span>
              <span className="font-bold text-primary">EGP {mockVisit.profit}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
