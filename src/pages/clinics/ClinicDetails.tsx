import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Pencil, Calendar, DollarSign, Percent, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockClinic = {
  id: "1",
  name: "Cairo Dental Center",
  location: "Nasr City, Cairo",
  address: "15 Makram Ebeid St., Building 7, Floor 3, Nasr City, Cairo",
  phone: "02 2271 5000",
  notes: "Main reception is on the 3rd floor. Parking available in basement.",
  revenueModel: "percentage" as const,
  revenueValue: 30,
  totalEarnings: 15420,
  thisMonthEarnings: 4200,
  color: "clinic-1",
  workingSchedule: [
    { day: "Sunday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Monday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Tuesday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Wednesday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Thursday", enabled: true, startTime: "09:00", endTime: "14:00" },
    { day: "Friday", enabled: false, startTime: "", endTime: "" },
    { day: "Saturday", enabled: true, startTime: "10:00", endTime: "16:00" },
  ],
};

export default function ClinicDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary-foreground">Clinic Details</h1>
          </div>
          <Link to={`/clinics/${id}/edit`}>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Pencil className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Clinic Name */}
        <div className="bg-primary-foreground/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary-foreground/20"
            >
              <span className="text-2xl font-bold text-primary-foreground">
                {mockClinic.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-foreground">{mockClinic.name}</h2>
              <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>{mockClinic.location}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4 space-y-4 -mt-4">
        {/* Earnings Summary */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-foreground mb-3">Earnings Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-primary-light rounded-lg">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-xl font-bold text-primary">{mockClinic.thisMonthEarnings.toLocaleString()} EGP</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-xl font-bold text-foreground">{mockClinic.totalEarnings.toLocaleString()} EGP</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-xl shadow-card p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Contact & Location</h3>
          
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="text-foreground">{mockClinic.address}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <a href={`tel:${mockClinic.phone}`} className="text-primary font-medium">{mockClinic.phone}</a>
            </div>
          </div>
        </div>

        {/* Accounting Model */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-foreground mb-3">Accounting Model</h3>
          <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              {mockClinic.revenueModel === "percentage" ? (
                <Percent className="w-5 h-5 text-secondary-foreground" />
              ) : (
                <DollarSign className="w-5 h-5 text-secondary-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">
                {mockClinic.revenueModel === "percentage" ? "Percentage of Revenue" : "Fixed Fee per Visit"}
              </p>
              <p className="text-sm text-muted-foreground">
                {mockClinic.revenueModel === "percentage"
                  ? `Clinic takes ${mockClinic.revenueValue}% of each visit`
                  : `${mockClinic.revenueValue} EGP per visit`}
              </p>
            </div>
          </div>
        </div>

        {/* Working Schedule */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Working Schedule</h3>
          </div>
          <div className="space-y-2">
            {mockClinic.workingSchedule.map((schedule) => (
              <div
                key={schedule.day}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  schedule.enabled ? "bg-primary-light/50" : "bg-muted/50"
                }`}
              >
                <span className={`font-medium ${schedule.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                  {schedule.day}
                </span>
                {schedule.enabled ? (
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-foreground">
                      {schedule.startTime} - {schedule.endTime}
                    </span>
                  </div>
                ) : (
                  <Badge variant="secondary" className="text-xs">Closed</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {mockClinic.notes && (
          <div className="bg-card rounded-xl shadow-card p-4">
            <h3 className="font-semibold text-foreground mb-2">Notes</h3>
            <p className="text-muted-foreground">{mockClinic.notes}</p>
          </div>
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
