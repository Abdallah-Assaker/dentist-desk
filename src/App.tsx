import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import Schedule from "./pages/Schedule";
import Materials from "./pages/Materials";
import More from "./pages/More";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

// Quick Action Pages
import AddVisitEntry from "./pages/visits/AddVisitEntry";
import SelectPatient from "./pages/visits/SelectPatient";
import EmergencyPatient from "./pages/visits/EmergencyPatient";
import VisitForm from "./pages/visits/VisitForm";
import VisitDetails from "./pages/visits/VisitDetails";
import AddPatient from "./pages/patients/AddPatient";
import AddAppointment from "./pages/appointments/AddAppointment";
import AppointmentDetails from "./pages/appointments/AppointmentDetails";
import AddMaterial from "./pages/materials/AddMaterial";
import AddMaterialPurchase from "./pages/materials/AddMaterialPurchase";
import MaterialDetails from "./pages/materials/MaterialDetails";

// Clinic Pages
import ClinicList from "./pages/clinics/ClinicList";
import AddClinic from "./pages/clinics/AddClinic";
import ClinicDetails from "./pages/clinics/ClinicDetails";
import EditClinic from "./pages/clinics/EditClinic";

// Procedure Pages
import ProceduresList from "./pages/procedures/ProceduresList";
import AddProcedure from "./pages/procedures/AddProcedure";

// Supplier Pages
import SuppliersList from "./pages/suppliers/SuppliersList";
import AddSupplier from "./pages/suppliers/AddSupplier";
import SupplierDetails from "./pages/suppliers/SupplierDetails";
import AdjustBalance from "./pages/suppliers/AdjustBalance";
import AddPurchase from "./pages/suppliers/AddPurchase";

// Lab Pages
import LabsList from "./pages/labs/LabsList";
import AddLab from "./pages/labs/AddLab";
import LabDetails from "./pages/labs/LabDetails";
import AdjustLabBalance from "./pages/labs/AdjustLabBalance";

// Lab Services Pages
import LabServicesList from "./pages/lab-services/LabServicesList";
import AddLabService from "./pages/lab-services/AddLabService";

// Lab Orders Pages
import LabOrdersList from "./pages/lab-orders/LabOrdersList";
import AddLabOrder from "./pages/lab-orders/AddLabOrder";
import LabOrderDetails from "./pages/lab-orders/LabOrderDetails";

// Financial Pages
import FinancialsDashboard from "./pages/financials/FinancialsDashboard";

// Profile Page
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientProfile />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/more" element={<More />} />
          </Route>
          
          {/* Quick Action Routes */}
          <Route path="/visits/new" element={<AddVisitEntry />} />
          <Route path="/visits/new/select-patient" element={<SelectPatient />} />
          <Route path="/visits/new/emergency" element={<EmergencyPatient />} />
          <Route path="/visits/new/form" element={<VisitForm />} />
          <Route path="/visits/:id" element={<VisitDetails />} />
          <Route path="/patients/new" element={<AddPatient />} />
          <Route path="/appointments/new" element={<AddAppointment />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/materials/new" element={<AddMaterial />} />
          <Route path="/materials/purchase" element={<AddMaterialPurchase />} />
          <Route path="/materials/:id" element={<MaterialDetails />} />
          <Route path="/materials/:id/purchase" element={<AddMaterialPurchase />} />
          
          {/* Clinic Routes */}
          <Route path="/clinics" element={<ClinicList />} />
          <Route path="/clinics/add" element={<AddClinic />} />
          <Route path="/clinics/:id" element={<ClinicDetails />} />
          <Route path="/clinics/:id/edit" element={<EditClinic />} />
          
          {/* Procedure Routes */}
          <Route path="/procedures" element={<ProceduresList />} />
          <Route path="/procedures/new" element={<AddProcedure />} />
          <Route path="/procedures/:id/edit" element={<AddProcedure />} />
          
          {/* Supplier Routes */}
          <Route path="/suppliers" element={<SuppliersList />} />
          <Route path="/suppliers/new" element={<AddSupplier />} />
          <Route path="/suppliers/:id" element={<SupplierDetails />} />
          <Route path="/suppliers/:id/edit" element={<AddSupplier />} />
          <Route path="/suppliers/:id/adjust-balance" element={<AdjustBalance />} />
          <Route path="/suppliers/:id/purchase" element={<AddPurchase />} />
          
          {/* Lab Routes */}
          <Route path="/labs" element={<LabsList />} />
          <Route path="/labs/new" element={<AddLab />} />
          <Route path="/labs/:id" element={<LabDetails />} />
          <Route path="/labs/:id/edit" element={<AddLab />} />
          <Route path="/labs/:id/adjust-balance" element={<AdjustLabBalance />} />
          
          {/* Lab Services Routes */}
          <Route path="/lab-services" element={<LabServicesList />} />
          <Route path="/lab-services/new" element={<AddLabService />} />
          <Route path="/lab-services/:id/edit" element={<AddLabService />} />
          
          {/* Lab Orders Routes */}
          <Route path="/lab-orders" element={<LabOrdersList />} />
          <Route path="/lab-orders/new" element={<AddLabOrder />} />
          <Route path="/lab-orders/:id" element={<LabOrderDetails />} />
          <Route path="/lab-orders/:id/edit" element={<AddLabOrder />} />
          
          {/* Financial Routes */}
          <Route path="/financials" element={<FinancialsDashboard />} />
          
          {/* Profile Route */}
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
