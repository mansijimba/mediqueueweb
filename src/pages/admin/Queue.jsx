"use client";

import { useState } from "react";
import { Clock, Plus, Search } from "lucide-react";

const queueData = [
  {
    id: "Q-001",
    patient: "Sarah Johnson",
    doctor: "Dr. Emily Chen",
    appointmentTime: "09:30 AM",
    arrivalTime: "09:15 AM",
    status: "In Progress",
    waitTime: "5 min",
    priority: "Normal",
  },
  {
    id: "Q-002",
    patient: "Michael Brown",
    doctor: "Dr. James Wilson",
    appointmentTime: "10:15 AM",
    arrivalTime: "10:00 AM",
    status: "Waiting",
    waitTime: "15 min",
    priority: "Normal",
  },
  {
    id: "Q-003",
    patient: "Emma Davis",
    doctor: "Dr. Emily Chen",
    appointmentTime: "11:00 AM",
    arrivalTime: "10:45 AM",
    status: "Waiting",
    waitTime: "30 min",
    priority: "High",
  },
  {
    id: "Q-004",
    patient: "Robert Miller",
    doctor: "Dr. David Lee",
    appointmentTime: "01:30 PM",
    arrivalTime: "01:15 PM",
    status: "Not Arrived",
    waitTime: "-",
    priority: "Normal",
  },
  {
    id: "Q-005",
    patient: "Jennifer Wilson",
    doctor: "Dr. James Wilson",
    appointmentTime: "02:45 PM",
    arrivalTime: "02:30 PM",
    status: "Not Arrived",
    waitTime: "-",
    priority: "Normal",
  },
];

export default function QueuePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredQueue = queueData.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-green-100 text-green-800";
      case "Waiting":
        return "bg-yellow-100 text-yellow-800";
      case "Not Arrived":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "No Show":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Normal":
        return "bg-blue-100 text-blue-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Queue Management</h1>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add to Queue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-lg font-medium">Current Queue</div>
          <div className="text-sm text-gray-500 mb-2">Patients currently in queue</div>
          <div className="text-3xl font-bold text-teal-600">
            {queueData.filter((q) => q.status === "Waiting" || q.status === "In Progress").length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-lg font-medium">Average Wait Time</div>
          <div className="text-sm text-gray-500 mb-2">Current average waiting time</div>
          <div className="text-3xl font-bold text-teal-600">14 min</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-lg font-medium">Expected Patients</div>
          <div className="text-sm text-gray-500 mb-2">Patients expected today</div>
          <div className="text-3xl font-bold text-teal-600">
            {queueData.filter((q) => q.status === "Not Arrived").length}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search queue..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-[160px]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Waiting">Waiting</option>
            <option value="Not Arrived">Not Arrived</option>
            <option value="Completed">Completed</option>
            <option value="No Show">No Show</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Queue #</th>
              <th className="text-left px-4 py-3">Patient</th>
              <th className="text-left px-4 py-3">Doctor</th>
              <th className="text-left px-4 py-3">Appointment</th>
              <th className="text-left px-4 py-3">Arrival</th>
              <th className="text-left px-4 py-3">Wait Time</th>
              <th className="text-left px-4 py-3">Priority</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredQueue.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.id}</td>
                <td className="px-4 py-3">{item.patient}</td>
                <td className="px-4 py-3">{item.doctor}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    {item.appointmentTime}
                  </div>
                </td>
                <td className="px-4 py-3">{item.arrivalTime}</td>
                <td className="px-4 py-3">{item.waitTime}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  {item.status === "Waiting" && (
                    <button className="px-2 py-1 border rounded text-sm hover:bg-teal-50">Call In</button>
                  )}
                  {item.status === "In Progress" && (
                    <button className="px-2 py-1 border rounded text-sm hover:bg-teal-50">Complete</button>
                  )}
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
