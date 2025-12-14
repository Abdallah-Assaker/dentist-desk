import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Building2,
  FlaskConical,
  Calendar,
  DollarSign,
  Paperclip,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import FileUpload, { UploadedFile } from "@/components/FileUpload";

type LabOrderStatus = "pending_send" | "pending_lab" | "pending_delivery" | "delivered";

const initialAttachments: UploadedFile[] = [
  { id: "1", name: "shade_photo.jpg", type: "image", url: "/placeholder.svg" },
  { id: "2", name: "impression_notes.pdf", type: "document", url: "#" },
];

const mockLabOrder = {
  id: "1",
  patientId: "1",
  patientName: "Ahmed Hassan",
  clinicId: "1",
  clinicName: "Cairo Dental Center",
  labId: "1",
  labName: "Premium Dental Lab",
  labServices: ["Crown", "Bridge"],
  visitId: "1",
  visitDate: "2024-01-10",
  visitProcedure: "Crown Preparation",
  lastAppointmentDate: "2024-01-10",
  nextAppointmentDate: "2024-01-20",
  status: "pending_send" as LabOrderStatus,
  cost: 2300,
  costBearer: "dentist_clinic",
  dentistPercentage: 60,
  notes: "Shade A2, please ensure proper margins. Patient prefers natural look.",
};

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

const statusTransitions: Record<LabOrderStatus, LabOrderStatus | null> = {
  pending_send: "pending_lab",
  pending_lab: "pending_delivery",
  pending_delivery: "delivered",
  delivered: null,
};

export default function LabOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<LabOrderStatus>(mockLabOrder.status);
  const [attachments, setAttachments] = useState<UploadedFile[]>(initialAttachments);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleStatusChange = (newStatus: LabOrderStatus) => {
    setStatus(newStatus);
    toast({
      title: "Status updated",
      description: `Lab order status changed to ${statusConfig[newStatus].label}`,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Lab order deleted",
      description: "The lab order has been deleted successfully.",
    });
    navigate("/lab-orders");
  };

  const getNextStatus = (): LabOrderStatus | null => statusTransitions[status];
  const nextStatus = getNextStatus();
  const isDelivered = status === "delivered";

  const getCostBearerText = () => {
    switch (mockLabOrder.costBearer) {
      case "dentist":
        return "Dentist pays full cost";
      case "patient":
        return "Patient pays full cost";
      case "clinic":
        return "Clinic pays full cost";
      case "dentist_clinic":
        return `Dentist: ${mockLabOrder.dentistPercentage}% (${Math.round(mockLabOrder.cost * mockLabOrder.dentistPercentage / 100)} EGP) • Clinic: ${100 - mockLabOrder.dentistPercentage}% (${Math.round(mockLabOrder.cost * (100 - mockLabOrder.dentistPercentage) / 100)} EGP)`;
      case "clinic_model":
        return "Cost allocation per clinic accounting model";
      default:
        return "Not specified";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/lab-orders"
              className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Lab Order Details</h1>
          </div>
          <div className="flex items-center gap-2">
            {!isDelivered && (
              <Link to={`/lab-orders/${id}/edit`}>
                <Button size="sm" variant="secondary">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Lab Order?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the lab order.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <Link
                    to={`/patients/${mockLabOrder.patientId}`}
                    className="font-semibold text-lg text-foreground hover:underline"
                  >
                    {mockLabOrder.patientName}
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{mockLabOrder.clinicName}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FlaskConical className="h-4 w-4" />
                  <Link
                    to={`/labs/${mockLabOrder.labId}`}
                    className="hover:underline"
                  >
                    {mockLabOrder.labName}
                  </Link>
                </div>
              </div>
              <Badge className={statusConfig[status].className}>
                {statusConfig[status].label}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {mockLabOrder.labServices.map((service, idx) => (
                <Badge key={idx} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>

            {mockLabOrder.notes && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{mockLabOrder.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dates Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Appointment</span>
              <span className="font-medium">{formatDate(mockLabOrder.lastAppointmentDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Appointment</span>
              <span className="font-medium">{formatDate(mockLabOrder.nextAppointmentDate)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Cost & Bearer Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Cost & Bearer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Cost</span>
              <span className="font-semibold text-lg">{mockLabOrder.cost} EGP</span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">{getCostBearerText()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Attachments Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              Attachments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              files={attachments}
              onFilesChange={setAttachments}
              disabled={isDelivered}
            />
          </CardContent>
        </Card>

        {/* Status Update Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Update Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isDelivered ? (
              <div className="text-center py-4">
                <Badge className={statusConfig.delivered.className}>
                  {statusConfig.delivered.label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  This order has been completed
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <Select value={status} onValueChange={(v) => handleStatusChange(v as LabOrderStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={status}>
                      {statusConfig[status].label} (Current)
                    </SelectItem>
                    {nextStatus && (
                      <SelectItem value={nextStatus}>
                        {statusConfig[nextStatus].label}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Status can only progress forward: Pending Send → Pending Lab → Pending Delivery → Delivered
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
