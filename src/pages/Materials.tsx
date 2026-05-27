import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, AlertTriangle, ChevronRight, Package, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClinics } from "@/hooks/useClinics";

interface Material {
  id: string;
  name: string;
  stock: number;
  threshold: number;
  avgCost: number;
  clinicName?: string;
  isGlobal: boolean;
}


const mockMaterials: Material[] = [
  { id: "1", name: "Composite Resin A2", stock: 3, threshold: 10, avgCost: 450, clinicName: "Dental Care Clinic", isGlobal: false },
  { id: "2", name: "Anesthetic Carpules", stock: 8, threshold: 20, avgCost: 25, isGlobal: true },
  { id: "3", name: "Dental Cement", stock: 15, threshold: 5, avgCost: 180, isGlobal: true },
  { id: "4", name: "Impression Material", stock: 2, threshold: 5, avgCost: 320, clinicName: "Elite Dental Center", isGlobal: false },
  { id: "5", name: "Bonding Agent", stock: 12, threshold: 8, avgCost: 550, isGlobal: true },
  { id: "6", name: "Temporary Filling", stock: 25, threshold: 10, avgCost: 85, isGlobal: true },
];

export default function Materials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLowStock = showLowStockOnly ? material.stock <= material.threshold : true;
    const matchesLocation = selectedLocation
      ? selectedLocation === "Global"
        ? material.isGlobal
        : material.clinicName === selectedLocation
      : true;
    return matchesSearch && matchesLowStock && matchesLocation;
  });

  const totalValue = mockMaterials.reduce((sum, m) => sum + m.stock * m.avgCost, 0);
  const lowStockCount = mockMaterials.filter((m) => m.stock <= m.threshold).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-6 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-primary-foreground">Materials</h1>
          <Link to="/materials/purchase">
            <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
              <Plus className="w-4 h-4 mr-1" /> Purchase
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-primary-foreground/20 rounded-xl p-3">
            <p className="text-primary-foreground/80 text-xs font-medium">Total Value</p>
            <p className="text-primary-foreground text-lg font-bold">EGP {totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-primary-foreground/20 rounded-xl p-3">
            <p className="text-primary-foreground/80 text-xs font-medium">Low Stock Items</p>
            <p className="text-primary-foreground text-lg font-bold flex items-center gap-2">
              {lowStockCount}
              {lowStockCount > 0 && <AlertTriangle className="w-4 h-4 text-warning" />}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-0 shadow-sm"
          />
        </div>
      </header>

      {/* Filters */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={selectedLocation ? "default" : "outline"} size="sm" className="shrink-0">
              <Filter className="w-3 h-3 mr-1" /> 
              {selectedLocation || "All Locations"}
              {selectedLocation && (
                <X 
                  className="w-3 h-3 ml-1" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLocation(null);
                  }} 
                />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedLocation(null)}>
              All Locations
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedLocation("Global")}>
              Global
            </DropdownMenuItem>
            {mockClinics.map((clinic) => (
              <DropdownMenuItem key={clinic.id} onClick={() => setSelectedLocation(clinic.name)}>
                {clinic.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant={showLowStockOnly ? "default" : "outline"}
          size="sm"
          className={`shrink-0 ${showLowStockOnly ? "" : "badge-warning"}`}
          onClick={() => setShowLowStockOnly(!showLowStockOnly)}
        >
          <AlertTriangle className="w-3 h-3 mr-1" /> Low Stock
        </Button>
      </div>

      {/* Materials List */}
      <div className="px-4 space-y-3">
        {filteredMaterials.map((material) => {
          const isLowStock = material.stock <= material.threshold;
          return (
            <Link
              key={material.id}
              to={`/materials/${material.id}`}
              className="block bg-card rounded-xl p-4 shadow-card card-hover"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLowStock ? "bg-warning/10" : "bg-primary-light"}`}>
                  <Package className={`w-6 h-6 ${isLowStock ? "text-warning" : "text-primary"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{material.name}</h3>
                    {isLowStock && (
                      <Badge variant="outline" className="badge-warning text-xs shrink-0">
                        Low
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {material.isGlobal ? "Global" : material.clinicName}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Stock: <span className={`font-medium ${isLowStock ? "text-warning" : "text-foreground"}`}>{material.stock}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Avg: <span className="font-medium text-foreground">EGP {material.avgCost}</span>
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </div>
            </Link>
          );
        })}

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12 bg-card rounded-xl shadow-card">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No materials found</p>
          </div>
        )}
      </div>
    </div>
  );
}
