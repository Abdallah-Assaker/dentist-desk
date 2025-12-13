import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";
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

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface WorkingDay {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

// Mock existing data
const existingClinic = {
  name: "Cairo Dental Center",
  location: "Nasr City, Cairo",
  address: "15 Makram Ebeid St., Building 7, Floor 3, Nasr City, Cairo",
  phone: "02 2271 5000",
  notes: "Main reception is on the 3rd floor. Parking available in basement.",
  revenueModel: "percentage",
  revenueValue: "30",
};

const existingSchedule: WorkingDay[] = [
  { day: "Sunday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Monday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Tuesday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Wednesday", enabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "Thursday", enabled: true, startTime: "09:00", endTime: "14:00" },
  { day: "Friday", enabled: false, startTime: "", endTime: "" },
  { day: "Saturday", enabled: true, startTime: "10:00", endTime: "16:00" },
];

export default function EditClinic() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(existingClinic);
  const [workingSchedule, setWorkingSchedule] = useState<WorkingDay[]>(existingSchedule);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDay = (index: number) => {
    setWorkingSchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const updateScheduleTime = (index: number, field: "startTime" | "endTime", value: string) => {
    setWorkingSchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter clinic name");
      return;
    }
    if (!formData.revenueValue) {
      toast.error("Please enter revenue value");
      return;
    }

    toast.success("Clinic updated successfully");
    navigate(`/clinics/${id}`);
  };

  const handleDelete = () => {
    toast.success("Clinic deleted");
    navigate("/clinics");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary-foreground">Edit Clinic</h1>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-destructive/20">
                <Trash2 className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Clinic?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this clinic and all associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {/* Form */}
      <div className="px-4 py-4 space-y-6 -mt-4">
        {/* Basic Info */}
        <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-foreground">Clinic Details</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Clinic Name *</Label>
            <Input
              id="name"
              placeholder="Enter clinic name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Area / District</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g., Nasr City, Cairo"
                className="pl-10"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              placeholder="Street address, building, floor..."
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Clinic phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>
        </div>

        {/* Revenue Model */}
        <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-foreground">Accounting Model</h2>

          <RadioGroup
            value={formData.revenueModel}
            onValueChange={(value) => handleInputChange("revenueModel", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage" className="flex-1 cursor-pointer">
                <span className="font-medium">Percentage of Revenue</span>
                <p className="text-sm text-muted-foreground">Clinic takes a % of each visit</p>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed" className="flex-1 cursor-pointer">
                <span className="font-medium">Fixed Fee per Visit</span>
                <p className="text-sm text-muted-foreground">Pay fixed amount per visit</p>
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="revenueValue">
              {formData.revenueModel === "percentage" ? "Percentage (%)" : "Fixed Amount (EGP)"} *
            </Label>
            <Input
              id="revenueValue"
              type="number"
              placeholder={formData.revenueModel === "percentage" ? "e.g., 30" : "e.g., 500"}
              value={formData.revenueValue}
              onChange={(e) => handleInputChange("revenueValue", e.target.value)}
            />
          </div>
        </div>

        {/* Working Schedule */}
        <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-foreground">Working Schedule</h2>

          <div className="space-y-3">
            {workingSchedule.map((schedule, index) => (
              <div
                key={schedule.day}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  schedule.enabled ? "border-primary/30 bg-primary-light/30" : "border-border bg-muted/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleDay(index)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    schedule.enabled ? "bg-primary" : "bg-muted-foreground/30"
                  } relative`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      schedule.enabled ? "right-1" : "left-1"
                    }`}
                  />
                </button>
                <span className={`w-24 font-medium ${schedule.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                  {schedule.day.slice(0, 3)}
                </span>
                {schedule.enabled && (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={schedule.startTime}
                      onChange={(e) => updateScheduleTime(index, "startTime", e.target.value)}
                      className="flex-1 h-8 text-sm"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={schedule.endTime}
                      onChange={(e) => updateScheduleTime(index, "endTime", e.target.value)}
                      className="flex-1 h-8 text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button className="w-full h-12" onClick={handleSave}>
          Save Changes
        </Button>

        <div className="h-20" />
      </div>
    </div>
  );
}
