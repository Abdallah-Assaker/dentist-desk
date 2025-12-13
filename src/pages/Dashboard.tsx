import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TodayAppointments } from "@/components/dashboard/TodayAppointments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { IncomeSummary } from "@/components/dashboard/IncomeSummary";
import { AlertsSection } from "@/components/dashboard/AlertsSection";

// Mock data - would come from API
const mockData = {
  doctor: {
    name: "Dr. Ahmed Hassan",
    avatarUrl: undefined,
  },
  notificationCount: 3,
  appointments: [
    {
      id: "1",
      patientName: "Sarah Ahmed",
      clinicName: "Dental Care Clinic",
      procedure: "Root Canal Treatment",
      time: "10:00 AM",
      duration: "45 min",
      clinicColor: 1 as const,
    },
    {
      id: "2",
      patientName: "Mohamed Ali",
      clinicName: "Elite Dental Center",
      procedure: "Cleaning & Checkup",
      time: "2:30 PM",
      duration: "30 min",
      clinicColor: 2 as const,
    },
    {
      id: "3",
      patientName: "Fatima Hassan",
      clinicName: "Dental Care Clinic",
      procedure: "Crown Fitting",
      time: "4:00 PM",
      duration: "60 min",
      clinicColor: 1 as const,
    },
  ],
  income: {
    today: 2450,
    week: 12800,
  },
  alerts: {
    lowStock: [
      { id: "1", materialName: "Composite Resin A2", clinicName: "Dental Care Clinic", currentStock: 3, threshold: 10 },
      { id: "2", materialName: "Anesthetic Carpules", currentStock: 8, threshold: 20 },
    ],
    pendingLabs: [
      { id: "1", patientName: "Omar Khaled", clinicName: "Elite Dental Center", status: "pending_lab" as const },
      { id: "2", patientName: "Nour Ibrahim", clinicName: "Dental Care Clinic", status: "pending_delivery" as const },
    ],
    outstandingBalances: [
      { id: "1", patientName: "Youssef Mahmoud", clinicName: "Dental Care Clinic", remaining: 1500, total: 3000 },
    ],
  },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        doctorName={mockData.doctor.name}
        avatarUrl={mockData.doctor.avatarUrl}
        notificationCount={mockData.notificationCount}
      />
      
      <div className="space-y-6 py-6 -mt-4">
        <TodayAppointments appointments={mockData.appointments} />
        <QuickActions />
        <IncomeSummary todayIncome={mockData.income.today} weekIncome={mockData.income.week} />
        <AlertsSection
          lowStock={mockData.alerts.lowStock}
          pendingLabs={mockData.alerts.pendingLabs}
          outstandingBalances={mockData.alerts.outstandingBalances}
        />
      </div>
    </div>
  );
}
