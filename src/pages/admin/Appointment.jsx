import { useState } from "react";
import { Calendar, Clock, Filter, Plus, Search } from "lucide-react";

const appointments = [
  {
    id: "APP-1001",
    patient: "Sarah Johnson",
    doctor: "Dr. Emily Chen",
    date: "2025-06-19",
    time: "09:30 AM",
    status: "Confirmed",
    type: "Check-up",
  },
  {
    id: "APP-1002",
    patient: "Michael Brown",
    doctor: "Dr. James Wilson",
    date: "2025-06-19",
    time: "10:15 AM",
    status: "Checked In",
    type: "Follow-up",
  },
  {
    id: "APP-1003",
    patient: "Emma Davis",
    doctor: "Dr. Emily Chen",
    date: "2025-06-19",
    time: "11:00 AM",
    status: "Waiting",
    type: "Consultation",
  },
  {
    id: "APP-1004",
    patient: "Robert Miller",
    doctor: "Dr. David Lee",
    date: "2025-06-19",
    time: "01:30 PM",
    status: "Confirmed",
    type: "Vaccination",
  },
  {
    id: "APP-1005",
    patient: "Jennifer Wilson",
    doctor: "Dr. James Wilson",
    date: "2025-06-19",
    time: "02:45 PM",
    status: "Cancelled",
    type: "Check-up",
  },
  {
    id: "APP-1006",
    patient: "Thomas Moore",
    doctor: "Dr. David Lee",
    date: "2025-06-20",
    time: "09:00 AM",
    status: "Confirmed",
    type: "Consultation",
  },
  {
    id: "APP-1007",
    patient: "Lisa Taylor",
    doctor: "Dr. Emily Chen",
    date: "2025-06-20",
    time: "10:30 AM",
    status: "Confirmed",
    type: "Follow-up",
  },
];

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Checked In":
        return "bg-green-100 text-green-800";
      case "Waiting":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Date</span>
          </button>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700"
          >
            <option value="all">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Checked In">Checked In</option>
            <option value="Waiting">Waiting</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Patient</th>
              <th className="text-left px-4 py-3">Doctor</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Time</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{appointment.id}</td>
                <td className="px-4 py-3">{appointment.patient}</td>
                <td className="px-4 py-3">{appointment.doctor}</td>
                <td className="px-4 py-3">{appointment.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    {appointment.time}
                  </div>
                </td>
                <td className="px-4 py-3">{appointment.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>
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
