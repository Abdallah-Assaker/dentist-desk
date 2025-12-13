import { Link } from "react-router-dom";
import { ArrowLeft, UserSearch, AlertCircle } from "lucide-react";

export default function AddVisitEntry() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Add Visit</h1>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-4">
        <p className="text-muted-foreground text-sm">Choose how to add a new visit:</p>

        <div className="space-y-3">
          {/* Existing Patient */}
          <Link
            to="/visits/new/select-patient"
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
              <UserSearch className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Select Existing Patient</h3>
              <p className="text-sm text-muted-foreground">Search and select a patient from your records</p>
            </div>
          </Link>

          {/* Emergency Visit */}
          <Link
            to="/visits/new/emergency"
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-status-warning/20 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-status-warning" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Emergency Visit (New Patient)</h3>
              <p className="text-sm text-muted-foreground">Quick walk-in patient registration</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

