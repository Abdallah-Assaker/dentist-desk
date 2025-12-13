import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock patient data
const mockPatients = [
  { id: "1", name: "Sarah Ahmed", phone: "01012345678", clinic: "Dental Care Clinic", lastVisit: "2024-01-10" },
  { id: "2", name: "Mohamed Ali", phone: "01098765432", clinic: "Elite Dental Center", lastVisit: "2024-01-08" },
  { id: "3", name: "Fatima Hassan", phone: "01155556666", clinic: "Dental Care Clinic", lastVisit: "2024-01-05" },
  { id: "4", name: "Omar Khaled", phone: "01033334444", clinic: "Elite Dental Center", lastVisit: "2024-01-03" },
  { id: "5", name: "Nour Ibrahim", phone: "01077778888", clinic: "Dental Care Clinic", lastVisit: "2023-12-28" },
];

export default function SelectPatient() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search)
  );

  const handleSelectPatient = (patientId: string) => {
    navigate(`/visits/new/form?patientId=${patientId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/visits/new" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Select Patient</h1>
        </div>
      </header>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Patient List */}
      <div className="divide-y divide-border">
        {filteredPatients.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No patients found
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => handleSelectPatient(patient.id)}
              className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">{patient.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{patient.clinic}</p>
                <p className="text-xs text-muted-foreground">Last: {patient.lastVisit}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
