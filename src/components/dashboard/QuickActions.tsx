import { Link } from "react-router-dom";
import { Plus, UserPlus, CalendarPlus, Package } from "lucide-react";

const actions = [
  {
    to: "/visits/new",
    icon: Plus,
    label: "Add Visit",
    variant: "primary" as const,
  },
  {
    to: "/patients/new",
    icon: UserPlus,
    label: "Add Patient",
    variant: "secondary" as const,
  },
  {
    to: "/appointments/new",
    icon: CalendarPlus,
    label: "Book Appointment",
    variant: "secondary" as const,
  },
  {
    to: "/materials/new",
    icon: Package,
    label: "Add Material",
    variant: "secondary" as const,
  },
];

export function QuickActions() {
  return (
    <section className="px-4">
      <h2 className="text-lg font-bold text-foreground mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-medium transition-all duration-200 touch-target ${
              action.variant === "primary"
                ? "gradient-primary text-primary-foreground shadow-md hover:shadow-lg"
                : "bg-card border border-border text-foreground hover:border-primary hover:bg-primary-light"
            }`}
          >
            <action.icon className="h-6 w-6" />
            <span className="text-sm">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
