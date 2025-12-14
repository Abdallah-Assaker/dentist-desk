import { Link } from "react-router-dom";
import {
  Building2,
  FlaskConical,
  Truck,
  PieChart,
  User,
  Settings,
  Link as LinkIcon,
  ChevronRight,
  LogOut,
  Scissors,
  ClipboardList,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const menuSections = [
  {
    title: "Management",
    items: [
      { to: "/clinics", icon: Building2, label: "Clinics", description: "Manage your clinics" },
      { to: "/procedures", icon: Scissors, label: "Procedures", description: "Manage procedures & costs" },
      { to: "/labs", icon: FlaskConical, label: "Labs", description: "Manage dental labs" },
      { to: "/lab-services", icon: FlaskConical, label: "Lab Services", description: "Define lab service types" },
      { to: "/lab-orders", icon: ClipboardList, label: "Lab Orders", description: "Track lab work orders" },
      { to: "/suppliers", icon: Truck, label: "Suppliers", description: "Manage suppliers" },
      { to: "/financials", icon: PieChart, label: "Financials", description: "Earnings & reports" },
    ],
  },
  {
    title: "Account",
    items: [
      { to: "/profile", icon: User, label: "Profile", description: "Your information" },
      { to: "/settings", icon: Settings, label: "Settings", description: "App preferences" },
      { to: "/booking-settings", icon: LinkIcon, label: "Online Booking", description: "Booking link settings" },
    ],
  },
];

export default function More() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-6 pb-8 rounded-b-3xl">
        <h1 className="text-xl font-bold text-primary-foreground mb-4">More</h1>
        
        {/* Profile Card */}
        <Link to="/profile" className="flex items-center gap-3 bg-primary-foreground/20 rounded-xl p-3">
          <Avatar className="h-14 w-14 border-2 border-primary-foreground/30">
            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-lg font-bold">AH</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-primary-foreground font-bold">Dr. Ahmed Hassan</h2>
            <p className="text-primary-foreground/80 text-sm">View and edit profile</p>
          </div>
          <ChevronRight className="w-5 h-5 text-primary-foreground/60" />
        </Link>
      </header>

      {/* Menu Sections */}
      <div className="px-4 py-4 space-y-6 -mt-4">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">{section.title}</h3>
            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              {section.items.map((item, index) => (
                <div key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>
                  {index < section.items.length - 1 && <Separator className="ml-[68px]" />}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="w-full flex items-center gap-3 p-4 bg-card rounded-xl shadow-card hover:bg-muted/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="font-medium text-destructive">Log Out</span>
        </button>
      </div>
    </div>
  );
}
