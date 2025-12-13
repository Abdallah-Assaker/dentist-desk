import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Percent, DollarSign, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockClinics = [
  {
    id: "1",
    name: "Cairo Dental Center",
    location: "Nasr City, Cairo",
    revenueModel: "percentage" as const,
    revenueValue: 30,
    totalEarnings: 15420,
    color: "clinic-1",
  },
  {
    id: "2",
    name: "Giza Medical Complex",
    location: "Dokki, Giza",
    revenueModel: "fixed" as const,
    revenueValue: 500,
    totalEarnings: 8750,
    color: "clinic-2",
  },
  {
    id: "3",
    name: "Alexandria Smile Clinic",
    location: "Smouha, Alexandria",
    revenueModel: "percentage" as const,
    revenueValue: 25,
    totalEarnings: 12300,
    color: "clinic-3",
  },
];

export default function ClinicList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClinics = mockClinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clinic.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          <h1 className="text-xl font-bold text-primary-foreground">Clinics</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clinics..."
            className="pl-10 bg-primary-foreground/20 border-0 text-primary-foreground placeholder:text-primary-foreground/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Clinic List */}
      <div className="px-4 py-4 space-y-3 -mt-4">
        {filteredClinics.map((clinic) => (
          <Link
            key={clinic.id}
            to={`/clinics/${clinic.id}`}
            className="block bg-card rounded-xl shadow-card overflow-hidden"
          >
            <div className="flex items-start gap-3 p-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${clinic.color}/20`}
                style={{ backgroundColor: `hsl(var(--${clinic.color}) / 0.2)` }}
              >
                <span
                  className="text-lg font-bold"
                  style={{ color: `hsl(var(--${clinic.color}))` }}
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
                    {clinic.revenueModel === "percentage" ? (
                      <>
                        <Percent className="w-3 h-3" />
                        {clinic.revenueValue}%
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-3 h-3" />
                        {clinic.revenueValue} EGP/visit
                      </>
                    )}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Earnings: <span className="font-semibold text-primary">{clinic.totalEarnings.toLocaleString()} EGP</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredClinics.length === 0 && (
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
