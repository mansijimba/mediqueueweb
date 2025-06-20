import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import { Sidebar } from "../../components/admin/SideBar";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-teal-600">MediQueue</span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/admin"
                  className="inline-block border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main dashboard content from nested routes */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet /> {/* <- Nested route components will render here */}
        </main>
      </div>
    </div>
  );
}
