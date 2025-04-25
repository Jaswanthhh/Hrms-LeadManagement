import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ManageAccount from "./components/ManageAccount";
import ManageAccountActivation from "./components/ManageAccountActivation";
import ManageAccountDeactivation from "./components/ManageAccountDeactivation";
import ProcessDeactivation from "./components/ProcessDeactivation";
import EmployeeDeactivation from "./components/EmployeeDeactivation";
import ManageWork from "./components/ManageWork";
import Notification from "./components/Notification";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import EnterOTP from "./components/EnterOTP";
import ResetPassword from "./components/ResetPassword";
import SuccessMessage from "./components/SuccessMessage";
import "./App.css";
import SeniorOnboarding from "./components/SeniorOnboarding";
import InternOnboarding from "./components/InternOnboarding";
import Setting from "./components/Settings";
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // Check if user is logged in from either localStorage or sessionStorage
  const isAuthenticated = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
  
  if (!isAuthenticated) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Dashboard Layout Component
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div className="w-64 bg-[#e8f1fa] min-h-screen flex-shrink-0 fixed left-0">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Root redirect to login if not authenticated */}
      <Route path="/" element={
        <ProtectedRoute>
          <Navigate to="/dashboard" replace />
        </ProtectedRoute>
      } />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/enter-otp" element={<EnterOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/success" element={<SuccessMessage />} />
  
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/manage-account" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ManageAccount />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/batch-activation" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ManageAccountActivation />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/batch-deactivation" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ManageAccountDeactivation />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/process-deactivation" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ProcessDeactivation />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/employee-deactivation" element={
        <ProtectedRoute>
          <DashboardLayout>
            <EmployeeDeactivation />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/manage-work" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ManageWork />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/notification" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Notification />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        </ProtectedRoute>
      } />
         <Route path="/lead-management" element={
        <ProtectedRoute>
          <DashboardLayout>
            < SeniorOnboarding/>
          </DashboardLayout>
        </ProtectedRoute>
      } />
       <Route path="/Intern-onboarding" element={
        <ProtectedRoute>
          <DashboardLayout>
            < InternOnboarding/>
          </DashboardLayout>
        </ProtectedRoute>
      } />
       <Route path="/setting" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Setting />
          </DashboardLayout>
        </ProtectedRoute>
      } />
     {/* <Route path="/senior" element={<SeniorOnboarding/>} */}
      {/* Catch all route - Protected 404 page */}
      <Route path="*" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600 mb-4">Page not found</p>
              <button 
                onClick={() => window.history.back()}
                className="text-blue-500 hover:underline"
              >
                Go back
              </button>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
