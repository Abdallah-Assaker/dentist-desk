import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Phone, MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockSuppliers = [
  { id: "1", name: "Dental Supplies Co.", phone: "+20 123 456 7890", whatsapp: "+201234567890", balance: 2500 },
  { id: "2", name: "MedEquip Egypt", phone: "+20 111 222 3333", whatsapp: "+201112223333", balance: 0 },
  { id: "3", name: "ProDent Materials", phone: "+20 100 200 3000", whatsapp: "+201002003000", balance: 850 },
  { id: "4", name: "Cairo Dental Lab", phone: "+20 155 666 7777", whatsapp: null, balance: 1200 },
];

export default function SuppliersList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuppliers = mockSuppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsApp = (e: React.MouseEvent, whatsapp: string) => {
    e.stopPropagation();
    window.open(`https://wa.me/${whatsapp.replace(/\D/g, "")}`, "_blank");
  };

  const handleCall = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    window.open(`tel:${phone}`, "_self");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/more" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Suppliers</h1>
        </div>
      </header>

      {/* Search */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>

        {/* Suppliers List */}
        {filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No suppliers added yet</p>
            <Button onClick={() => navigate("/suppliers/new")}>
              Add your first supplier
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                onClick={() => navigate(`/suppliers/${supplier.id}`)}
                className="bg-card rounded-xl p-4 shadow-card cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.phone}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">Open Balance</p>
                    <p className={`font-bold ${supplier.balance > 0 ? "text-warning" : "text-muted-foreground"}`}>
                      EGP {supplier.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => handleCall(e, supplier.phone)}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  {supplier.whatsapp && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
                      onClick={(e) => handleWhatsApp(e, supplier.whatsapp!)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <Button
        onClick={() => navigate("/suppliers/new")}
        size="lg"
        className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
