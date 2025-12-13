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
          <Route path="/materials/:id" element={<MaterialDetails />} />
          <Route path="/materials/:id/purchase" element={<AddMaterialPurchase />} />
          
          {/* Clinic Routes */}
          <Route path="/clinics" element={<ClinicList />} />
          <Route path="/clinics/add" element={<AddClinic />} />
          <Route path="/clinics/:id" element={<ClinicDetails />} />
          <Route path="/clinics/:id/edit" element={<EditClinic />} />
          
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
