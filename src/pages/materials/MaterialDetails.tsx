import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Package, TrendingDown, Building2, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock material data
const mockMaterial = {
  id: "1",
  name: "Composite Resin A2",
  threshold: 10,
  totalStock: 15,
  avgUnitCost: 75,
  totalValue: 1125,
  isLowStock: false,
  clinicInventory: [
    { clinicId: "1", clinicName: "Dental Care Clinic", quantity: 8 },
    { clinicId: "2", clinicName: "Elite Dental Center", quantity: 5 },
    { clinicId: "global", clinicName: "Global (Unassigned)", quantity: 2 },
  ],
  consumption: [
    { date: "2024-01-15", patient: "Sarah Ahmed", clinic: "Dental Care Clinic", quantity: 1 },
    { date: "2024-01-14", patient: "Mohamed Ali", clinic: "Elite Dental Center", quantity: 2 },
    { date: "2024-01-12", patient: "Fatima Hassan", clinic: "Dental Care Clinic", quantity: 1 },
  ],
  purchases: [
    { date: "2024-01-10", supplier: "Dental Supplies Co.", quantity: 10, unitCost: 70, total: 700 },
    { date: "2024-01-01", supplier: "ProDent Materials", quantity: 20, unitCost: 80, total: 1600 },
  ],
};

export default function MaterialDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/materials" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{mockMaterial.name}</h1>
            {mockMaterial.isLowStock && (
              <Badge variant="outline" className="bg-status-error/20 text-status-error border-status-error/20 mt-1">
                Low Stock
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Package className="h-4 w-4" />
            <span className="text-xs">Total Stock</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{mockMaterial.totalStock}</p>
          <p className="text-xs text-muted-foreground">Threshold: {mockMaterial.threshold}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingDown className="h-4 w-4" />
            <span className="text-xs">Avg. Unit Cost</span>
          </div>
          <p className="text-2xl font-bold text-foreground">EGP {mockMaterial.avgUnitCost}</p>
          <p className="text-xs text-muted-foreground">Total: EGP {mockMaterial.totalValue}</p>
        </div>
      </div>

      {/* Add Purchase Button */}
      <div className="px-4 mb-4">
        <Link to={`/materials/${id}/purchase`}>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Purchase
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="consumption">Consumption</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-4 space-y-3">
            {mockMaterial.clinicInventory.map((inv) => (
              <div
                key={inv.clinicId}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{inv.clinicName}</span>
                </div>
                <span className="text-lg font-bold text-primary">{inv.quantity}</span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="consumption" className="mt-4 space-y-3">
            {mockMaterial.consumption.map((item, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.patient}</span>
                  <Badge variant="outline">-{item.quantity}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{item.clinic}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="purchases" className="mt-4 space-y-3">
            {mockMaterial.purchases.map((purchase, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{purchase.supplier}</span>
                  <Badge variant="outline" className="bg-status-success/10 text-status-success">
                    +{purchase.quantity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{purchase.date}</span>
                  <div className="text-right">
                    <span className="text-muted-foreground">EGP {purchase.unitCost}/unit</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium">EGP {purchase.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
