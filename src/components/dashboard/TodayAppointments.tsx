import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  clinicName: string;
  procedure: string;
  time: string;
  duration: string;
  clinicColor: 1 | 2 | 3 | 4 | 5;
}

interface TodayAppointmentsProps {
  appointments: Appointment[];
}

const clinicColorClasses = {
  1: "border-l-clinic-1",
  2: "border-l-clinic-2",
  3: "border-l-clinic-3",
  4: "border-l-clinic-4",
  5: "border-l-clinic-5",
};

const clinicTextClasses = {
  1: "text-clinic-1",
  2: "text-clinic-2",
  3: "text-clinic-3",
  4: "text-clinic-4",
  5: "text-clinic-5",
};

export function TodayAppointments({ appointments }: TodayAppointmentsProps) {
  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-foreground">Today's Appointments</h2>
        <Link to="/schedule" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {appointments.length === 0 ? (
          <div className="bg-card rounded-xl p-6 text-center shadow-card">
            <p className="text-muted-foreground">No appointments scheduled for today</p>
          </div>
        ) : (
          appointments.map((apt) => (
            <Link 
              key={apt.id} 
              to={`/appointments/${apt.id}`}
              className={`block bg-card rounded-xl p-4 shadow-card border-l-4 ${clinicColorClasses[apt.clinicColor]} card-hover`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{apt.patientName}</h3>
                  <p className={`text-sm font-medium ${clinicTextClasses[apt.clinicColor]}`}>{apt.clinicName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{apt.procedure}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{apt.time}</p>
                  <p className="text-sm text-muted-foreground">{apt.duration}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
