import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const mockLabServices = [
  { id: "1", name: "Zirconia Crown", defaultCost: 1500, notes: "High-quality ceramic crown" },
  { id: "2", name: "Metal Crown", defaultCost: 800, notes: "" },
  { id: "3", name: "Porcelain Veneer", defaultCost: 2000, notes: "Per unit" },
  { id: "4", name: "Full Denture", defaultCost: 5000, notes: "Upper or lower" },
  { id: "5", name: "Partial Denture", defaultCost: 3500, notes: "" },
  { id: "6", name: "Implant Crown", defaultCost: 2500, notes: "Includes abutment" },
];

export default function LabServicesList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState(mockLabServices);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setServices(services.filter((s) => s.id !== deleteId));
      toast({
        title: "Lab service deleted",
        description: "The lab service has been removed.",
      });
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/more" className="p-2 -ml-2 hover:bg-primary-dark rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Lab Services</h1>
          </div>
          <Button
            onClick={() => navigate("/lab-services/new")}
            size="sm"
            variant="secondary"
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>
      </header>

      <main className="p-4">
        {services.length > 0 ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead className="text-right">Avg Cost</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        {service.notes && (
                          <p className="text-sm text-muted-foreground">{service.notes}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {service.defaultCost ? `${service.defaultCost.toLocaleString()} EGP` : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/lab-services/${service.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(service.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No lab services defined yet</p>
            <Button onClick={() => navigate("/lab-services/new")}>
              Add lab service
            </Button>
          </div>
        )}
      </main>

      <Button
        onClick={() => navigate("/lab-services/new")}
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lab Service?</AlertDialogTitle>
            <AlertDialogDescription>
              This will not affect existing lab orders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
