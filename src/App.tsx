import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LoginScreen from './screens/LoginScreen';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ClientsPage from './pages/Clients';
import AgentsPage from './pages/Agents';
import Settings from './pages/Settings';
import ClientTrainingCenter from './pages/Clients/ClientTrainingCenter';
import ClientPortal from './pages/client/ClientPortal';
import ViewSwitcher from './components/layout/ViewSwitcher';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ViewSwitcher />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Team Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/:clientId/training/*" element={<ClientTrainingCenter />} />
            <Route path="agents/*" element={<AgentsPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Client Portal Routes */}
          <Route path="/client-portal" element={
            <ProtectedRoute>
              <ClientPortal />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}