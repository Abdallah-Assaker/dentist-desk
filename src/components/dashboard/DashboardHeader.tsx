import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  doctorName: string;
  avatarUrl?: string;
  notificationCount?: number;
}

export function DashboardHeader({ doctorName, avatarUrl, notificationCount = 0 }: DashboardHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="gradient-header px-4 pt-6 pb-8 rounded-b-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor">
              <path d="M12 2C10.34 2 9 3.34 9 5C9 5.35 9.06 5.69 9.17 6H6C4.9 6 4 6.9 4 8V10C4 11.1 4.9 12 6 12H7.17C7.06 12.31 7 12.65 7 13C7 14.66 8.34 16 10 16C10.35 16 10.69 15.94 11 15.83V18C11 19.1 11.9 20 13 20H15C16.1 20 17 19.1 17 18V15.83C17.31 15.94 17.65 16 18 16C19.66 16 21 14.66 21 13C21 12.65 20.94 12.31 20.83 12H22C22 12 22 10 22 8C22 6.9 21.1 6 20 6H16.83C16.94 5.69 17 5.35 17 5C17 3.34 15.66 2 14 2C13.65 2 13.31 2.06 13 2.17V2C13 2 12 2 12 2Z" />
            </svg>
          </div>
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">{getGreeting()}</p>
            <h1 className="text-primary-foreground text-lg font-bold">{doctorName}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/profile">
            <Avatar className="h-10 w-10 border-2 border-primary-foreground/30">
              <AvatarImage src={avatarUrl} alt={doctorName} />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground font-semibold">
                {doctorName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
