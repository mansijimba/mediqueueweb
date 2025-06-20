"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

const doctors = [
  {
    id: "DOC-001",
    name: "Dr. Emily Chen",
    specialty: "General Medicine",
    email: "emily.chen@mediqueue.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    appointments: 24,
    availability: "Mon, Wed, Fri",
  },
  {
    id: "DOC-002",
    name: "Dr. James Wilson",
    specialty: "Cardiology",
    email: "james.wilson@mediqueue.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    appointments: 18,
    availability: "Tue, Thu, Sat",
  },
  {
    id: "DOC-003",
    name: "Dr. David Lee",
    specialty: "Pediatrics",
    email: "david.lee@mediqueue.com",
    phone: "+1 (555) 345-6789",
    status: "On Leave",
    appointments: 0,
    availability: "N/A",
  },
  {
    id: "DOC-004",
    name: "Dr. Sarah Johnson",
    specialty: "Dermatology",
    email: "sarah.johnson@mediqueue.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    appointments: 15,
    availability: "Mon, Tue, Wed",
  },
  {
    id: "DOC-005",
    name: "Dr. Michael Brown",
    specialty: "Orthopedics",
    email: "michael.brown@mediqueue.com",
    phone: "+1 (555) 567-8901",
    status: "Active",
    appointments: 21,
    availability: "Wed, Thu, Fri",
  },
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-orange-100 text-orange-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Doctors</h1>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-teal-600">{doctors.length}</span>
            <span className="text-sm text-gray-500">Total Doctors</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-teal-600">
              {doctors.filter((d) => d.status === "Active").length}
            </span>
            <span className="text-sm text-gray-500">Active Doctors</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-teal-600">
              {doctors.filter((d) => d.status === "On Leave").length}
            </span>
            <span className="text-sm text-gray-500">On Leave</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-teal-600">
              {doctors.reduce((sum, d) => sum + d.appointments, 0)}
            </span>
            <span className="text-sm text-gray-500">Total Appointments</span>
          </div>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search doctors..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Doctor</th>
              <th className="text-left px-4 py-3">Specialty</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Availability</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Appointments</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                      <img
                        src="/placeholder.svg"
                        alt={doctor.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-xs text-gray-500">{doctor.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{doctor.specialty}</td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div>{doctor.email}</div>
                    <div className="text-gray-500">{doctor.phone}</div>
                  </div>
                </td>
                <td className="px-4 py-3">{doctor.availability}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                    {doctor.status}
                  </span>
                </td>
                <td className="px-4 py-3">{doctor.appointments}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button className="text-sm text-blue-600 hover:underline">View</button>
                  <button className="text-sm text-blue-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
