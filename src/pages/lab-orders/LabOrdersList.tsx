import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Filter, Phone, User, Building2, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LabOrderStatus = "pending_send" | "pending_lab" | "pending_delivery" | "delivered";

interface LabOrder {
  id: string;
  patientName: string;
  clinicName: string;
  labName: string;
  labServices: string[];
  lastAppointmentDate: string;
  nextAppointmentDate: string;
  status: LabOrderStatus;
  cost: number;
}

const mockLabOrders: LabOrder[] = [
  {
    id: "1",
    patientName: "Ahmed Hassan",
    clinicName: "Cairo Dental Center",
    labName: "Premium Dental Lab",
    labServices: ["Crown", "Bridge"],
    lastAppointmentDate: "2024-01-10",
    nextAppointmentDate: "2024-01-20",
    status: "pending_send",
    cost: 1500,
  },
  {
    id: "2",
    patientName: "Sara Mohamed",
    clinicName: "Giza Medical Complex",
    labName: "Quick Dental Lab",
    labServices: ["Veneer"],
    lastAppointmentDate: "2024-01-08",
    nextAppointmentDate: "2024-01-18",
    status: "pending_lab",
    cost: 2000,
  },
  {
    id: "3",
    patientName: "Omar Ali",
    clinicName: "Cairo Dental Center",
    labName: "Premium Dental Lab",
    labServices: ["Removable Denture"],
    lastAppointmentDate: "2024-01-05",
    nextAppointmentDate: "2024-01-15",
    status: "pending_delivery",
    cost: 3500,
  },
  {
    id: "4",
    patientName: "Fatma Ibrahim",
    clinicName: "Alexandria Clinic",
    labName: "Express Dental Lab",
    labServices: ["Implant Crown"],
    lastAppointmentDate: "2024-01-01",
    nextAppointmentDate: "2024-01-12",
    status: "delivered",
    cost: 4000,
  },
];

const statusConfig: Record<LabOrderStatus, { label: string; className: string }> = {
  pending_send: {
    label: "Pending Send",
    className: "bg-muted text-muted-foreground",
  },
  pending_lab: {
    label: "Pending Lab",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  pending_delivery: {
    label: "Pending Delivery",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
};

export default function LabOrdersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = mockLabOrders.filter((order) => {
    const matchesSearch =
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.labName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.labServices.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/more"
              className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Lab Orders</h1>
          </div>
          <Link to="/lab-orders/new">
            <Button size="sm" variant="secondary">
              <Plus className="h-4 w-4 mr-1" />
              Create
            </Button>
          </Link>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending_send">Pending Send</SelectItem>
              <SelectItem value="pending_lab">Pending Lab</SelectItem>
              <SelectItem value="pending_delivery">Pending Delivery</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <FlaskConical className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No lab orders recorded yet</p>
            <Link to="/lab-orders/new">
              <Button>Create Lab Order</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                to={`/lab-orders/${order.id}`}
                className="block bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{order.patientName}</span>
                  </div>
                  <Badge className={statusConfig[order.status].className}>
                    {statusConfig[order.status].label}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{order.clinicName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FlaskConical className="h-4 w-4" />
                    <span>{order.labName}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {order.labServices.map((service, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-3 pt-2 border-t border-border">
                    <span>Last: {formatDate(order.lastAppointmentDate)}</span>
                    <span>Next: {formatDate(order.nextAppointmentDate)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
