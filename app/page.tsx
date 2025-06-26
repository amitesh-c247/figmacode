'use client'

import { useState } from "react";
import { Header } from "../components/Layout/Header";
import { Sidebar } from "../components/Layout/Sidebar";
import { PageLayout } from "../components/Layout/PageLayout";
import { LoginPage } from "../components/Auth/LoginPage";
import { DashboardOverview } from "../components/Dashboard/DashboardOverview";
import { CompaniesTable } from "../components/Companies/CompaniesTable";
import { AddCompanyModal } from "../components/Companies/AddCompanyModal";
import { UserManagement } from "../components/Users/UserManagement";
import { SettingsPage } from "../components/Settings/SettingsPage";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <PageLayout title="Dashboard">
            <DashboardOverview />
          </PageLayout>
        );
      case "companies-management":
        return (
          <PageLayout title="Companies">
            <CompaniesTable onAddCompany={() => setShowAddCompanyModal(true)} />
          </PageLayout>
        );
      case "user-management":
        return (
          <PageLayout title="User Management">
            <UserManagement />
          </PageLayout>
        );
      case "settings":
        return (
          <PageLayout title="Settings">
            <SettingsPage />
          </PageLayout>
        );
      case "session-management":
        return (
          <PageLayout title="Session Management">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Session Management</h3>
              <p className="text-gray-500">This feature is coming soon...</p>
            </div>
          </PageLayout>
        );
      case "group-management":
        return (
          <PageLayout title="Group Management">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Group Management</h3>
              <p className="text-gray-500">This feature is coming soon...</p>
            </div>
          </PageLayout>
        );
      case "locations":
        return (
          <PageLayout title="Locations">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Locations</h3>
              <p className="text-gray-500">This feature is coming soon...</p>
            </div>
          </PageLayout>
        );
      default:
        return (
          <PageLayout title="Dashboard">
            <DashboardOverview />
          </PageLayout>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderPageContent()}
        </main>
      </div>

      {/* Modals */}
      <AddCompanyModal 
        isOpen={showAddCompanyModal} 
        onClose={() => setShowAddCompanyModal(false)} 
      />
    </div>
  );
}