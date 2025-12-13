import { NavLink } from "@/components/NavLink";
import { Home, Users, Calendar, Package, MoreHorizontal } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/patients", icon: Users, label: "Patients" },
  { to: "/schedule", icon: Calendar, label: "Schedule" },
  { to: "/materials", icon: Package, label: "Materials" },
  { to: "/more", icon: MoreHorizontal, label: "More" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 text-muted-foreground min-w-[64px]"
            activeClassName="text-primary bg-primary-light"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[11px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
