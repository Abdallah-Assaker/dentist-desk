import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Appointment {
  id: string;
  patientName: string;
  clinicName: string;
  procedure: string;
  time: string;
  endTime: string;
  clinicColor: 1 | 2 | 3 | 4 | 5;
}

const mockAppointments: Record<string, Appointment[]> = {
  "2025-12-13": [
    { id: "1", patientName: "Sarah Ahmed", clinicName: "Dental Care Clinic", procedure: "Root Canal", time: "10:00", endTime: "10:45", clinicColor: 1 },
    { id: "2", patientName: "Mohamed Ali", clinicName: "Elite Dental Center", procedure: "Cleaning", time: "14:30", endTime: "15:00", clinicColor: 2 },
    { id: "3", patientName: "Fatima Hassan", clinicName: "Dental Care Clinic", procedure: "Crown Fitting", time: "16:00", endTime: "17:00", clinicColor: 1 },
  ],
  "2025-12-14": [
    { id: "4", patientName: "Omar Khaled", clinicName: "Elite Dental Center", procedure: "Extraction", time: "09:00", endTime: "09:30", clinicColor: 2 },
    { id: "5", patientName: "Nour Ibrahim", clinicName: "Smile Clinic", procedure: "Filling", time: "11:00", endTime: "11:30", clinicColor: 3 },
  ],
};

const clinicBgClasses = {
  1: "bg-clinic-1",
  2: "bg-clinic-2",
  3: "bg-clinic-3",
  4: "bg-clinic-4",
  5: "bg-clinic-5",
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"daily" | "weekly">("daily");

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const appointments = mockAppointments[formatDateKey(selectedDate)] || [];

  const goToDate = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    setSelectedDate(newDate);
  };

  // Generate week days
  const getWeekDays = () => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  const weekDays = getWeekDays();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-6 pb-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-primary-foreground">Schedule</h1>
          <Link to="/appointments/new">
            <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
              <Plus className="w-4 h-4 mr-1" /> Book
            </Button>
          </Link>
        </div>

        {/* View Toggle */}
        <Tabs value={view} onValueChange={(v) => setView(v as "daily" | "weekly")} className="mb-4">
          <TabsList className="bg-primary-foreground/20 w-full">
            <TabsTrigger value="daily" className="flex-1 text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1 text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">Weekly</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Date Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => goToDate(-1)} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-primary-foreground font-semibold">
            {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => goToDate(1)} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Week Days Selector */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar -mt-3">
        {weekDays.map((day) => {
          const isSelected = formatDateKey(day) === formatDateKey(selectedDate);
          const isToday = formatDateKey(day) === formatDateKey(new Date());
          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={`flex flex-col items-center min-w-[48px] py-2 px-3 rounded-xl transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md"
                  : isToday
                  ? "bg-primary-light text-primary"
                  : "bg-card text-foreground"
              }`}
            >
              <span className="text-xs font-medium">{days[day.getDay()]}</span>
              <span className="text-lg font-bold">{day.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* Appointments */}
      <div className="px-4 py-4 space-y-3">
        {appointments.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl shadow-card">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No appointments scheduled</p>
            <Link to="/appointments/new">
              <Button className="mt-4" size="sm">Book Appointment</Button>
            </Link>
          </div>
        ) : (
          appointments.map((apt) => (
            <Link
              key={apt.id}
              to={`/appointments/${apt.id}`}
              className="block bg-card rounded-xl overflow-hidden shadow-card card-hover"
            >
              <div className="flex">
                <div className={`w-1.5 ${clinicBgClasses[apt.clinicColor]}`} />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{apt.patientName}</h3>
                      <p className="text-sm text-primary font-medium">{apt.clinicName}</p>
                      <p className="text-sm text-muted-foreground mt-1">{apt.procedure}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{apt.time}</p>
                      <p className="text-xs text-muted-foreground">to {apt.endTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Clinic Legend */}
      <div className="px-4 py-3">
        <div className="bg-card rounded-xl p-3 shadow-card">
          <p className="text-xs font-medium text-muted-foreground mb-2">Clinic Colors</p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-clinic-1" />
              <span className="text-xs text-foreground">Dental Care</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-clinic-2" />
              <span className="text-xs text-foreground">Elite Dental</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-clinic-3" />
              <span className="text-xs text-foreground">Smile Clinic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
