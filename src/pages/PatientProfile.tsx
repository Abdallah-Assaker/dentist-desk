import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, Edit, Calendar, FileText, Image, Smile, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock patient data
const mockPatient = {
  id: "1",
  name: "Sarah Ahmed",
  phone: "+20 100 123 4567",
  email: "sarah.ahmed@email.com",
  dateOfBirth: "March 15, 1990",
  address: "123 Zamalek St, Cairo",
  clinicName: "Dental Care Clinic",
  medicalHistory: ["Diabetes Type 2", "Penicillin Allergy"],
  dentalHistory: ["Previous root canal (2023)", "Wisdom teeth removal (2021)"],
  totalSpent: 15600,
  outstandingBalance: 0,
  visits: [
    { id: "1", date: "Dec 10, 2025", procedure: "Root Canal Treatment", amount: 2500, status: "completed" },
    { id: "2", date: "Nov 15, 2025", procedure: "Cleaning & Checkup", amount: 500, status: "completed" },
    { id: "3", date: "Oct 20, 2025", procedure: "Filling", amount: 800, status: "completed" },
  ],
};

export default function PatientProfile() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header px-4 pt-4 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <Link to="/patients">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <Link to={`/patients/${id}/edit`}>
            <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
          </Link>
        </div>

        {/* Patient Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-3 border-primary-foreground/30">
            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-2xl font-bold">
              SA
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">{mockPatient.name}</h1>
            <p className="text-primary-foreground/80 text-sm">{mockPatient.clinicName}</p>
            <div className="flex gap-2 mt-2">
              <a href={`tel:${mockPatient.phone}`}>
                <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
                  <Phone className="w-4 h-4" />
                </Button>
              </a>
              <a href={`https://wa.me/${mockPatient.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 -mt-4">
        <Tabs defaultValue="visits" className="w-full">
          <TabsList className="w-full bg-card shadow-card grid grid-cols-6 h-auto p-1 rounded-xl">
            <TabsTrigger value="visits" className="flex flex-col gap-1 py-2 px-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Calendar className="w-4 h-4" />
              Visits
            </TabsTrigger>
            <TabsTrigger value="treatment" className="flex flex-col gap-1 py-2 px-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <FileText className="w-4 h-4" />
              Plan
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex flex-col gap-1 py-2 px-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Image className="w-4 h-4" />
              Docs
            </TabsTrigger>
            <TabsTrigger value="mouth" className="flex flex-col gap-1 py-2 px-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Smile className="w-4 h-4" />
              Mouth
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex flex-col gap-1 py-2 px-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <CreditCard className="w-4 h-4" />
              Bills
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex flex-col gap-1 py-2 px-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
              <Package className="w-4 h-4" />
              Mats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visits" className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Visit History</h2>
              <Link to={`/visits/new?patient=${id}`}>
                <Button size="sm">Add Visit</Button>
              </Link>
            </div>
            {mockPatient.visits.map((visit) => (
              <Link key={visit.id} to={`/visits/${visit.id}`} className="block bg-card rounded-xl p-4 shadow-card card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{visit.procedure}</p>
                    <p className="text-sm text-muted-foreground">{visit.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">EGP {visit.amount.toLocaleString()}</p>
                    <Badge variant="outline" className="badge-success text-xs">Completed</Badge>
                  </div>
                </div>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="treatment" className="mt-4">
            <div className="bg-card rounded-xl p-6 shadow-card text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No treatment plan created yet</p>
              <Button className="mt-4" size="sm">Create Treatment Plan</Button>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <div className="bg-card rounded-xl p-6 shadow-card text-center">
              <Image className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No documents uploaded</p>
              <Button className="mt-4" size="sm">Upload Document</Button>
            </div>
          </TabsContent>

          <TabsContent value="mouth" className="mt-4">
            <div className="bg-card rounded-xl p-6 shadow-card text-center">
              <Smile className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">View mouth simulation</p>
              <Button className="mt-4" size="sm">Open Simulation</Button>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-xl p-4 shadow-card">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-xl font-bold text-foreground">EGP {mockPatient.totalSpent.toLocaleString()}</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-card">
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-xl font-bold text-success">EGP {mockPatient.outstandingBalance.toLocaleString()}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-4">
            <div className="bg-card rounded-xl p-6 shadow-card text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Material consumption tracking</p>
              <Button className="mt-4" size="sm" variant="outline">View Details</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
