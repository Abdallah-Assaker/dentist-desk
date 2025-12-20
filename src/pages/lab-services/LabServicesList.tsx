import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Search, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useLabServices, useDeleteLabService } from "@/hooks/useLabServices";

export default function LabServicesList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: services = [], isLoading, error } = useLabServices(searchQuery);
  const deleteLabService = useDeleteLabService();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteLabService.mutate(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => navigate("/more")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">Lab Services</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search lab services..."
            className="pl-10 bg-card border-0 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Lab Services List */}
      <div className="px-4 py-4 space-y-3 mt-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <p className="text-destructive">Failed to load lab services. Please try again.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : services.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FlaskConical className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">No lab services found</h2>
            <p className="text-muted-foreground mb-6">Add your first lab service to get started</p>
            <Button onClick={() => navigate("/lab-services/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Add your first lab service
            </Button>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="bg-card rounded-xl shadow-card overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      {service.notes && (
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                          {service.notes}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-primary mt-1">
                        EGP {service.default_cost.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => navigate(`/lab-services/${service.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <Link
        to="/lab-services/new"
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </Link>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lab Service?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteLabService.isPending}
            >
              {deleteLabService.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Confirm Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}