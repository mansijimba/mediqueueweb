"use client";

import { useState } from "react";


// Sample patient data
const patients = [
  {
    id: "PAT-1001",
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    lastVisit: "2025-06-10",
    upcomingAppointment: "2025-06-19",
    doctor: "Dr. Emily Chen",
  },
  {
    id: "PAT-1002",
    name: "Michael Brown",
    age: 42,
    gender: "Male",
    email: "michael.b@example.com",
    phone: "+1 (555) 234-5678",
    lastVisit: "2025-05-22",
    upcomingAppointment: "2025-06-19",
    doctor: "Dr. James Wilson",
  },
  {
    id: "PAT-1003",
    name: "Emma Davis",
    age: 28,
    gender: "Female",
    email: "emma.d@example.com",
    phone: "+1 (555) 345-6789",
    lastVisit: "2025-06-05",
    upcomingAppointment: "2025-06-19",
    doctor: "Dr. Emily Chen",
  },
  {
    id: "PAT-1004",
    name: "Robert Miller",
    age: 56,
    gender: "Male",
    email: "robert.m@example.com",
    phone: "+1 (555) 456-7890",
    lastVisit: "2025-06-12",
    upcomingAppointment: "2025-06-19",
    doctor: "Dr. David Lee",
  },
  {
    id: "PAT-1005",
    name: "Jennifer Wilson",
    age: 39,
    gender: "Female",
    email: "jennifer.w@example.com",
    phone: "+1 (555) 567-8901",
    lastVisit: "2025-05-30",
    upcomingAppointment: "2025-06-19",
    doctor: "Dr. James Wilson",
  },
  {
    id: "PAT-1006",
    name: "Thomas Moore",
    age: 45,
    gender: "Male",
    email: "thomas.m@example.com",
    phone: "+1 (555) 678-9012",
    lastVisit: "2025-06-01",
    upcomingAppointment: "2025-06-20",
    doctor: "Dr. David Lee",
  },
  {
    id: "PAT-1007",
    name: "Lisa Taylor",
    age: 31,
    gender: "Female",
    email: "lisa.t@example.com",
    phone: "+1 (555) 789-0123",
    lastVisit: "2025-06-08",
    upcomingAppointment: "2025-06-20",
    doctor: "Dr. Emily Chen",
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Patients",
            value: patients.length,
          },
          {
            label: "Male Patients",
            value: patients.filter((p) => p.gender === "Male").length,
          },
          {
            label: "Female Patients",
            value: patients.filter((p) => p.gender === "Female").length,
          },
          {
            label: "New This Week",
            value: patients.filter(
              (p) => new Date(p.lastVisit) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ).length,
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-teal-600">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Patient</th>
              <th className="text-left px-4 py-3">Age/Gender</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Last Visit</th>
              <th className="text-left px-4 py-3">Upcoming Appointment</th>
              <th className="text-left px-4 py-3">Doctor</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={patient.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-xs text-gray-500">{patient.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{patient.age} / {patient.gender}</td>
                <td className="px-4 py-3">
                  <div>{patient.email}</div>
                  <div className="text-gray-500">{patient.phone}</div>
                </td>
                <td className="px-4 py-3">{patient.lastVisit}</td>
                <td className="px-4 py-3">{patient.upcomingAppointment}</td>
                <td className="px-4 py-3">{patient.doctor}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-blue-600 hover:underline text-sm mr-2">View</button>
                  <button className="text-blue-600 hover:underline text-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
