import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Filter, User, Building2, FlaskConical, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const isLoading = false;

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
      {/* Header */}
      <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => navigate("/more")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">Lab Orders</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-10 bg-card border-0 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="mt-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-card border-0 shadow-sm">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
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
      </header>

      {/* Lab Orders List */}
      <div className="px-4 py-4 space-y-3 mt-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))
        ) : filteredOrders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FlaskConical className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">No lab orders found</h2>
            <p className="text-muted-foreground mb-6">Create your first lab order to get started</p>
            <Button onClick={() => navigate("/lab-orders/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Lab Order
            </Button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Link
              key={order.id}
              to={`/lab-orders/${order.id}`}
              className="block"
            >
              <div className="bg-card rounded-xl shadow-card overflow-hidden">
                <div className="p-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{order.patientName}</h3>
                        <p className="text-xs text-muted-foreground">{order.clinicName}</p>
                      </div>
                    </div>
                    <Badge className={statusConfig[order.status].className}>
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>

                  {/* Lab Info */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <FlaskConical className="h-4 w-4" />
                    <span>{order.labName}</span>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {order.labServices.map((service, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  {/* Cost */}
                  <p className="text-sm font-semibold text-primary mb-3">
                    EGP {order.cost.toLocaleString()}
                  </p>

                  {/* Dates Footer */}
                  <div className="flex justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span>Last: {formatDate(order.lastAppointmentDate)}</span>
                    <span>Next: {formatDate(order.nextAppointmentDate)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* FAB */}
      <Link
        to="/lab-orders/new"
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </Link>
    </div>
  );
}