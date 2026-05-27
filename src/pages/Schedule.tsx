import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Clock, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClinics, getClinicColorClasses } from "@/hooks/useClinics";

interface Appointment {
  id: string;
  patientName: string;
  clinicName: string;
  procedure: string;
  time: string;
  endTime: string;
  clinicColor: string;
}

const mockAppointments: Record<string, Appointment[]> = {
  "2025-12-13": [
    { id: "1", patientName: "Sarah Ahmed", clinicName: "Dental Care Clinic", procedure: "Root Canal", time: "10:00", endTime: "10:45", clinicColor: "clinic-1" },
    { id: "2", patientName: "Mohamed Ali", clinicName: "Elite Dental Center", procedure: "Cleaning", time: "14:30", endTime: "15:00", clinicColor: "clinic-2" },
    { id: "3", patientName: "Fatima Hassan", clinicName: "Dental Care Clinic", procedure: "Crown Fitting", time: "16:00", endTime: "17:00", clinicColor: "clinic-1" },
  ],
  "2025-12-14": [
    { id: "4", patientName: "Omar Khaled", clinicName: "Elite Dental Center", procedure: "Extraction", time: "09:00", endTime: "09:30", clinicColor: "clinic-2" },
    { id: "5", patientName: "Nour Ibrahim", clinicName: "Smile Clinic", procedure: "Filling", time: "11:00", endTime: "11:30", clinicColor: "clinic-3" },
  ],
};

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

function formatDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function Schedule() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [viewMonth, setViewMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  const { data: clinics = [] } = useClinics();

  const selectedClinicName = selectedClinicId
    ? clinics.find((c) => c.id === selectedClinicId)?.name
    : null;

  // Build calendar grid (6 weeks)
  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(gridStart.getDate() - firstOfMonth.getDay());
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      return d;
    });
  }, [viewMonth]);

  const getAppointmentsForDate = (date: Date) => {
    const list = mockAppointments[formatDateKey(date)] || [];
    return selectedClinicName ? list.filter((a) => a.clinicName === selectedClinicName) : list;
  };

  const selectedAppointments = getAppointmentsForDate(selectedDate);

  const goToMonth = (offset: number) => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + offset, 1));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-header px-4 pt-6 pb-4 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-foreground">Schedule</h1>
          <Link to="/appointments/new">
            <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
              <Plus className="w-4 h-4 mr-1" /> Book
            </Button>
          </Link>
        </div>
      </header>

      {/* Filter */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={selectedClinicId ? "default" : "outline"} size="sm" className="shrink-0">
              <Filter className="w-3 h-3 mr-1" />
              {selectedClinicName || "Clinic"}
              {selectedClinicId && (
                <X
                  className="w-3 h-3 ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClinicId(null);
                  }}
                />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedClinicId(null)}>All Clinics</DropdownMenuItem>
            {clinics.map((clinic) => {
              const colorClasses = getClinicColorClasses(clinic.color);
              return (
                <DropdownMenuItem key={clinic.id} onClick={() => setSelectedClinicId(clinic.id)}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${colorClasses.bg}`} />
                  {clinic.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Calendar */}
      <div className="px-4">
        <div className="bg-card rounded-2xl shadow-card p-3">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="icon" onClick={() => goToMonth(-1)}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="font-semibold text-foreground">
              {viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <Button variant="ghost" size="icon" onClick={() => goToMonth(1)}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Weekday header */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekdayLabels.map((d, i) => (
              <div key={i} className="text-center text-xs font-medium text-muted-foreground py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const inMonth = day.getMonth() === viewMonth.getMonth();
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);
              const dayAppts = getAppointmentsForDate(day);
              const count = dayAppts.length;
              const uniqueColors = Array.from(new Set(dayAppts.map((a) => a.clinicColor))).slice(0, 4);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`relative aspect-square flex flex-col items-center justify-start pt-1.5 rounded-lg transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : isToday
                      ? "bg-primary-light text-primary"
                      : inMonth
                      ? "text-foreground hover:bg-muted"
                      : "text-muted-foreground/50 hover:bg-muted"
                  }`}
                >
                  <span className="text-sm font-semibold leading-none">{day.getDate()}</span>

                  {count > 0 && (
                    <span
                      className={`mt-0.5 text-[10px] font-bold leading-none px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-primary-foreground/25 text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {count}
                    </span>
                  )}

                  {uniqueColors.length > 0 && (
                    <div className="absolute bottom-1 flex gap-0.5">
                      {uniqueColors.map((c, idx) => {
                        const cc = getClinicColorClasses(c);
                        return <span key={idx} className={`w-1.5 h-1.5 rounded-full ${cc.bg}`} />;
                      })}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected day appointments */}
      <div className="px-4 mt-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </h3>
        <div className="space-y-3">
          {selectedAppointments.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl shadow-card">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No appointments scheduled</p>
              <Link to="/appointments/new">
                <Button className="mt-4" size="sm">
                  Book Appointment
                </Button>
              </Link>
            </div>
          ) : (
            selectedAppointments.map((apt) => {
              const colorClasses = getClinicColorClasses(apt.clinicColor);
              return (
                <Link
                  key={apt.id}
                  to={`/appointments/${apt.id}`}
                  className="block bg-card rounded-xl overflow-hidden shadow-card card-hover"
                >
                  <div className="flex">
                    <div className={`w-1.5 ${colorClasses.bg}`} />
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
              );
            })
          )}
        </div>
      </div>

      {/* Clinic Legend */}
      {clinics.length > 0 && (
        <div className="px-4 py-4">
          <div className="bg-card rounded-xl p-3 shadow-card">
            <p className="text-xs font-medium text-muted-foreground mb-2">Clinic Colors</p>
            <div className="flex flex-wrap gap-3">
              {clinics.slice(0, 5).map((clinic) => {
                const colorClasses = getClinicColorClasses(clinic.color);
                return (
                  <div key={clinic.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colorClasses.bg}`} />
                    <span className="text-xs text-foreground">{clinic.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
