import React from "react";
import { Sidebar } from "../../components/admin/SideBar";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Page Content */}
        <main className="flex-1 flex justify-center">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
