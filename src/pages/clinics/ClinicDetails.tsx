import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Pencil, DollarSign, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useClinic, getClinicColorClasses } from "@/hooks/useClinics";

export default function ClinicDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: clinic, isLoading, error } = useClinic(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary-foreground">Clinic Details</h1>
          </div>
          <Skeleton className="h-20 w-full rounded-xl bg-primary-foreground/20" />
        </header>
        <div className="px-4 py-4 space-y-4 -mt-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !clinic) {
    return (
      <div className="min-h-screen bg-background">
        <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary-foreground">Clinic Details</h1>
          </div>
        </header>
        <div className="px-4 py-12 text-center text-muted-foreground">
          <p>Clinic not found</p>
        </div>
      </div>
    );
  }

  const colorClasses = getClinicColorClasses(clinic.color);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary-foreground">Clinic Details</h1>
          </div>
          <Link to={`/clinics/${id}/edit`}>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Pencil className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Clinic Name */}
        <div className="bg-primary-foreground/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `hsl(var(--${clinic.color}) / 0.3)` }}
            >
              <span 
                className="text-2xl font-bold"
                style={{ color: `hsl(var(--${clinic.color}))` }}
              >
                {clinic.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-foreground">{clinic.name}</h2>
              <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>{clinic.location}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4 space-y-4 -mt-4">
        {/* Earnings Summary */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-foreground mb-3">Earnings Summary</h3>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Total Earnings</p>
            <p className="text-xl font-bold text-foreground">{clinic.total_earnings.toLocaleString()} EGP</p>
          </div>
        </div>

        {/* Accounting Model */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-foreground mb-3">Accounting Model</h3>
          <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              {clinic.revenue_model === "percentage" ? (
                <Percent className="w-5 h-5 text-secondary-foreground" />
              ) : (
                <DollarSign className="w-5 h-5 text-secondary-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">
                {clinic.revenue_model === "percentage" ? "Percentage of Revenue" : "Fixed Fee per Visit"}
              </p>
              <p className="text-sm text-muted-foreground">
                {clinic.revenue_model === "percentage"
                  ? `Clinic takes ${clinic.revenue_value}% of each visit`
                  : `${clinic.revenue_value} EGP per visit`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
