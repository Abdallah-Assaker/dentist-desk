import { Link } from "react-router-dom";
import { AlertTriangle, Clock, CreditCard, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LowStockAlert {
  id: string;
  materialName: string;
  clinicName?: string;
  currentStock: number;
  threshold: number;
}

interface LabWorkAlert {
  id: string;
  patientName: string;
  clinicName: string;
  status: "pending_send" | "pending_lab" | "pending_delivery";
}

interface BalanceAlert {
  id: string;
  patientName: string;
  clinicName: string;
  remaining: number;
  total: number;
}

interface AlertsSectionProps {
  lowStock: LowStockAlert[];
  pendingLabs: LabWorkAlert[];
  outstandingBalances: BalanceAlert[];
  currency?: string;
}

const labStatusLabels = {
  pending_send: "Pending Send",
  pending_lab: "Pending Lab",
  pending_delivery: "Pending Delivery",
};

const labStatusColors = {
  pending_send: "badge-warning",
  pending_lab: "badge-pending",
  pending_delivery: "badge-info",
};

export function AlertsSection({ lowStock, pendingLabs, outstandingBalances, currency = "EGP" }: AlertsSectionProps) {
  const hasAlerts = lowStock.length > 0 || pendingLabs.length > 0 || outstandingBalances.length > 0;

  if (!hasAlerts) return null;

  return (
    <section className="px-4 space-y-4">
      <h2 className="text-lg font-bold text-foreground">Alerts</h2>

      {/* Low Stock Alerts */}
      {lowStock.length > 0 && (
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground">Low Stock Materials</h3>
          </div>
          <div className="space-y-2">
            {lowStock.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/materials/${item.id}`}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{item.materialName}</p>
                  {item.clinicName && <p className="text-sm text-muted-foreground">{item.clinicName}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="badge-warning text-xs">
                    {item.currentStock} / {item.threshold}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Pending Lab Works */}
      {pendingLabs.length > 0 && (
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-pending/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-pending" />
            </div>
            <h3 className="font-semibold text-foreground">Pending Lab Works</h3>
          </div>
          <div className="space-y-2">
            {pendingLabs.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/labs/${item.id}`}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{item.patientName}</p>
                  <p className="text-sm text-muted-foreground">{item.clinicName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${labStatusColors[item.status]}`}>
                    {labStatusLabels[item.status]}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Outstanding Balances */}
      {outstandingBalances.length > 0 && (
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-destructive" />
            </div>
            <h3 className="font-semibold text-foreground">Outstanding Balances</h3>
          </div>
          <div className="space-y-2">
            {outstandingBalances.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/patients/${item.id}/financial`}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{item.patientName}</p>
                  <p className="text-sm text-muted-foreground">{item.clinicName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-destructive">
                    {currency} {item.remaining.toLocaleString()} / {item.total.toLocaleString()}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
