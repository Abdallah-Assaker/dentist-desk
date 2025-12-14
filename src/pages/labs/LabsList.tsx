import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, Phone, MessageCircle, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockLabs = [
  { id: "1", name: "Premium Dental Lab", phone: "+20 100 123 4567", whatsapp: "+201001234567", location: "Cairo, Egypt", openBalance: 2500 },
  { id: "2", name: "Crown Masters Lab", phone: "+20 100 987 6543", whatsapp: "+201009876543", location: "Alexandria, Egypt", openBalance: 0 },
  { id: "3", name: "Smile Design Lab", phone: "+20 100 555 1234", whatsapp: "+201005551234", location: "Giza, Egypt", openBalance: 800 },
];

export default function LabsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLabs = mockLabs.filter(
    (lab) =>
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.phone.includes(searchQuery)
  );

  const handleWhatsApp = (e: React.MouseEvent, whatsapp: string) => {
    e.stopPropagation();
    window.open(`https://wa.me/${whatsapp}`, "_blank");
  };

  const handleCall = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/more" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Labs</h1>
          </div>
          <Button
            onClick={() => navigate("/labs/new")}
            size="sm"
            variant="secondary"
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Lab
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search labs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {filteredLabs.length > 0 ? (
          <div className="space-y-3">
            {filteredLabs.map((lab) => (
              <div
                key={lab.id}
                onClick={() => navigate(`/labs/${lab.id}`)}
                className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{lab.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{lab.phone}</p>
                    {lab.location && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {lab.location}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${lab.openBalance > 0 ? "text-warning" : "text-muted-foreground"}`}>
                      {lab.openBalance > 0 ? `${lab.openBalance.toLocaleString()} EGP` : "No balance"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleCall(e, lab.phone)}
                    className="flex-1 gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleWhatsApp(e, lab.whatsapp)}
                    className="flex-1 gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No labs added yet</p>
            <Button onClick={() => navigate("/labs/new")}>
              Add your first lab
            </Button>
          </div>
        )}
      </main>

      <Button
        onClick={() => navigate("/labs/new")}
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
