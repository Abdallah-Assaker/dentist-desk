import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, Calendar, RefreshCw, AlertTriangle, Clock, MessageSquare, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type NotificationType = "booking" | "reschedule" | "cancellation" | "reminder" | "survey" | "low_stock";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  patientName?: string;
  clinicName: string;
  dateTime?: string;
  oldDateTime?: string;
  newDateTime?: string;
  materialName?: string;
  currentStock?: number;
  read: boolean;
  timestamp: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "New Booking Request",
    patientName: "Sarah Ahmed",
    clinicName: "Dental Care Clinic",
    dateTime: "Dec 15, 2025 at 10:00 AM",
    read: false,
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "reschedule",
    title: "Reschedule Request",
    patientName: "Mohamed Ali",
    clinicName: "Elite Dental Center",
    oldDateTime: "Dec 14, 2025 at 2:30 PM",
    newDateTime: "Dec 16, 2025 at 3:00 PM",
    read: false,
    timestamp: "15 min ago",
  },
  {
    id: "3",
    type: "cancellation",
    title: "Appointment Cancelled",
    patientName: "Omar Khaled",
    clinicName: "Elite Dental Center",
    dateTime: "Dec 13, 2025 at 4:00 PM",
    read: true,
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "reminder",
    title: "Upcoming Appointment",
    patientName: "Fatima Hassan",
    clinicName: "Dental Care Clinic",
    dateTime: "Tomorrow at 11:00 AM",
    read: true,
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    type: "low_stock",
    title: "Low Stock Alert",
    clinicName: "Dental Care Clinic",
    materialName: "Composite Resin A2",
    currentStock: 3,
    read: false,
    timestamp: "3 hours ago",
  },
  {
    id: "6",
    type: "survey",
    title: "Patient Survey Reminder",
    patientName: "Nour Ibrahim",
    clinicName: "Smile Clinic",
    read: true,
    timestamp: "1 day ago",
  },
];

const notificationIcons: Record<NotificationType, typeof Calendar> = {
  booking: Calendar,
  reschedule: RefreshCw,
  cancellation: X,
  reminder: Clock,
  survey: MessageSquare,
  low_stock: Package,
};

const notificationColors: Record<NotificationType, string> = {
  booking: "bg-info/10 text-info",
  reschedule: "bg-warning/10 text-warning",
  cancellation: "bg-destructive/10 text-destructive",
  reminder: "bg-primary/10 text-primary",
  survey: "bg-pending/10 text-pending",
  low_stock: "bg-warning/10 text-warning",
};

export default function Notifications() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        </div>
      </header>

      {/* Notifications List */}
      <div className="px-4 py-4 space-y-3">
        {mockNotifications.map((notification) => {
          const Icon = notificationIcons[notification.type];
          const iconColorClass = notificationColors[notification.type];

          return (
            <div
              key={notification.id}
              className={`bg-card rounded-xl p-4 shadow-card ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
            >
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconColorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-muted-foreground shrink-0">{notification.timestamp}</span>
                  </div>

                  {notification.patientName && (
                    <p className="text-sm text-foreground font-medium mt-1">{notification.patientName}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{notification.clinicName}</p>

                  {notification.type === "reschedule" && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-muted-foreground line-through">{notification.oldDateTime}</p>
                      <p className="text-xs text-primary font-medium">{notification.newDateTime}</p>
                    </div>
                  )}

                  {notification.dateTime && notification.type !== "reschedule" && (
                    <p className="text-sm text-foreground mt-1">{notification.dateTime}</p>
                  )}

                  {notification.type === "low_stock" && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-foreground">{notification.materialName}</p>
                      <Badge variant="outline" className="badge-warning text-xs mt-1">
                        Stock: {notification.currentStock}
                      </Badge>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {(notification.type === "booking" || notification.type === "reschedule") && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1">
                        <Check className="w-4 h-4 mr-1" /> Confirm
                      </Button>
                      {notification.type === "reschedule" && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <X className="w-4 h-4 mr-1" /> Decline
                        </Button>
                      )}
                    </div>
                  )}

                  {notification.type === "low_stock" && (
                    <Button size="sm" className="mt-3">
                      <Package className="w-4 h-4 mr-1" /> Restock
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
