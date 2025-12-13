import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, ChevronRight, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Patient {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
  clinicName: string;
  hasBalance: boolean;
  balanceAmount?: number;
}

const mockPatients: Patient[] = [
  { id: "1", name: "Sarah Ahmed", phone: "+20 100 123 4567", lastVisit: "Dec 10, 2025", clinicName: "Dental Care Clinic", hasBalance: false },
  { id: "2", name: "Mohamed Ali", phone: "+20 101 234 5678", lastVisit: "Dec 8, 2025", clinicName: "Elite Dental Center", hasBalance: true, balanceAmount: 1500 },
  { id: "3", name: "Fatima Hassan", phone: "+20 102 345 6789", lastVisit: "Dec 5, 2025", clinicName: "Dental Care Clinic", hasBalance: false },
  { id: "4", name: "Omar Khaled", phone: "+20 103 456 7890", lastVisit: "Nov 28, 2025", clinicName: "Elite Dental Center", hasBalance: true, balanceAmount: 3200 },
  { id: "5", name: "Nour Ibrahim", phone: "+20 104 567 8901", lastVisit: "Nov 20, 2025", clinicName: "Dental Care Clinic", hasBalance: false },
];

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-6 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-primary-foreground">Patients</h1>
          <Link to="/patients/new">
            <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
              <Plus className="w-4 h-4 mr-1" /> Add Patient
            </Button>
          </Link>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-0 shadow-sm"
          />
        </div>
      </header>

      {/* Filters */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
        <Button variant="outline" size="sm" className="shrink-0">
          <Filter className="w-3 h-3 mr-1" /> All Clinics
        </Button>
        <Button variant="outline" size="sm" className="shrink-0">
          Procedure Type
        </Button>
        <Button variant="outline" size="sm" className="shrink-0 badge-warning">
          Outstanding Balance
        </Button>
      </div>

      {/* Patient List */}
      <div className="px-4 space-y-3">
        {filteredPatients.map((patient) => (
          <Link
            key={patient.id}
            to={`/patients/${patient.id}`}
            className="block bg-card rounded-xl p-4 shadow-card card-hover"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-primary-light">
                <AvatarFallback className="bg-primary-light text-primary font-semibold">
                  {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground truncate">{patient.name}</h3>
                  {patient.hasBalance && (
                    <Badge variant="outline" className="badge-destructive text-xs shrink-0">
                      EGP {patient.balanceAmount?.toLocaleString()}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  <span>{patient.phone}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last visit: {patient.lastVisit} • {patient.clinicName}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No patients found</p>
          </div>
        )}
      </div>
    </div>
  );
}
