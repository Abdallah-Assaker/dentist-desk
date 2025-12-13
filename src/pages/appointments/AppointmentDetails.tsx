import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, User, MessageCircle, Check, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

// Mock appointment data
const mockAppointment = {
  id: "1",
  patientName: "Sarah Ahmed",
  patientId: "1",
  patientPhone: "01012345678",
  clinicName: "Dental Care Clinic",
  clinicColor: 1,
  date: "2024-01-15",
  time: "10:00 AM",
  duration: "45 min",
  status: "pending" as "pending" | "confirmed" | "cancelled",
  notes: "Follow-up for root canal treatment. Crown fitting scheduled.",
  whatsappConfirmation: true,
};

const statusColors = {
  pending: "bg-status-warning/10 text-status-warning border-status-warning/20",
  confirmed: "bg-status-success/10 text-status-success border-status-success/20",
  cancelled: "bg-status-error/10 text-status-error border-status-error/20",
};

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [whatsappEnabled, setWhatsappEnabled] = useState(mockAppointment.whatsappConfirmation);

  const handleConfirm = () => {
    // In real app, update appointment status
    console.log("Confirming appointment", id);
  };

  const handleCancel = () => {
    // In real app, cancel appointment
    navigate("/schedule");
  };

  const handleReschedule = () => {
    // In real app, navigate to reschedule flow
    navigate(`/appointments/${id}/reschedule`);
  };

  const handleWhatsAppSend = () => {
    const message = `Hello ${mockAppointment.patientName}, this is a reminder for your dental appointment on ${mockAppointment.date} at ${mockAppointment.time} at ${mockAppointment.clinicName}.`;
    const phone = mockAppointment.patientPhone.replace(/^0/, "20"); // Egypt country code
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/schedule" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Appointment Details</h1>
          </div>
          <Badge variant="outline" className={`${statusColors[mockAppointment.status]} capitalize`}>
            {mockAppointment.status}
          </Badge>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Patient Info */}
        <div className="bg-card border border-border rounded-xl p-4">
          <Link to={`/patients/${mockAppointment.patientId}`} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{mockAppointment.patientName}</h2>
              <p className="text-sm text-muted-foreground">{mockAppointment.patientPhone}</p>
            </div>
          </Link>
        </div>

        {/* Appointment Details */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{mockAppointment.clinicName}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{mockAppointment.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{mockAppointment.time} ({mockAppointment.duration})</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {mockAppointment.notes && (
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-medium text-foreground mb-2">Notes</h3>
            <p className="text-sm text-muted-foreground">{mockAppointment.notes}</p>
          </div>
        )}

        {/* WhatsApp Confirmation */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-status-success" />
              <Label htmlFor="whatsapp-toggle" className="font-medium">WhatsApp Confirmation</Label>
            </div>
            <Switch
              id="whatsapp-toggle"
              checked={whatsappEnabled}
              onCheckedChange={setWhatsappEnabled}
            />
          </div>
          {whatsappEnabled && (
            <Button
              variant="outline"
              className="w-full border-status-success text-status-success hover:bg-status-success/10"
              onClick={handleWhatsAppSend}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Send WhatsApp Reminder
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          {mockAppointment.status === "pending" && (
            <Button className="w-full" onClick={handleConfirm}>
              <Check className="h-4 w-4 mr-2" />
              Confirm Appointment
            </Button>
          )}

          <Button variant="outline" className="w-full" onClick={handleReschedule}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reschedule
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full border-status-error text-status-error hover:bg-status-error/10">
                <X className="h-4 w-4 mr-2" />
                Cancel Appointment
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this appointment for {mockAppointment.patientName} on {mockAppointment.date} at {mockAppointment.time}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancel} className="bg-status-error hover:bg-status-error/90">
                  Yes, Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
