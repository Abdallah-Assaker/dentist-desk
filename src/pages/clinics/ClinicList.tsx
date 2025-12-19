import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Percent, DollarSign, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useClinics, getClinicColorClasses } from "@/hooks/useClinics";

export default function ClinicList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: clinics, isLoading, error } = useClinics(searchQuery);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => navigate("/more")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">Clinics</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clinics..."
            className="pl-10 bg-card border-0 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Clinic List */}
      <div className="px-4 py-4 space-y-3 mt-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            <p>Failed to load clinics</p>
          </div>
        ) : (clinics && clinics.length > 0) ? (
          clinics.map((clinic) => {
            const colorClasses = getClinicColorClasses(clinic.color);
            return (
              <Link
                key={clinic.id}
                to={`/clinics/${clinic.id}`}
                className="block bg-card rounded-xl shadow-card overflow-hidden"
              >
                <div className="flex items-start gap-3 p-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses.bg}/20`}
                    style={{ backgroundColor: `hsl(var(--${clinic.color}) / 0.2)` }}
                  >
                    <span
                      className={`text-lg font-bold ${colorClasses.text}`}
                    >
                      {clinic.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{clinic.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{clinic.location}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Badge variant="secondary" className="gap-1">
                        {clinic.revenue_model === "percentage" ? (
                          <>
                            <Percent className="w-3 h-3" />
                            {clinic.revenue_value}%
                          </>
                        ) : (
                          <>
                            <DollarSign className="w-3 h-3" />
                            {clinic.revenue_value} EGP/visit
                          </>
                        )}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Earnings: <span className="font-semibold text-primary">{clinic.total_earnings.toLocaleString()} EGP</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No clinics found</p>
          </div>
        )}
      </div>

      {/* Add Clinic FAB */}
      <Link
        to="/clinics/add"
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </Link>
    </div>
  );
}
