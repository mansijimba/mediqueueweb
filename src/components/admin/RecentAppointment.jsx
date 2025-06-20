export function RecentAppointments() {
  const recentAppointments = [
    {
      id: "APP-1001",
      patient: "Sarah Johnson",
      doctor: "Dr. Emily Chen",
      time: "09:30 AM",
      status: "Confirmed",
      type: "Check-up",
    },
    {
      id: "APP-1002",
      patient: "Michael Brown",
      doctor: "Dr. James Wilson",
      time: "10:15 AM",
      status: "Checked In",
      type: "Follow-up",
    },
    {
      id: "APP-1003",
      patient: "Emma Davis",
      doctor: "Dr. Emily Chen",
      time: "11:00 AM",
      status: "Waiting",
      type: "Consultation",
    },
    {
      id: "APP-1004",
      patient: "Robert Miller",
      doctor: "Dr. David Lee",
      time: "01:30 PM",
      status: "Confirmed",
      type: "Vaccination",
    },
    {
      id: "APP-1005",
      patient: "Jennifer Wilson",
      doctor: "Dr. James Wilson",
      time: "02:45 PM",
      status: "Cancelled",
      type: "Check-up",
    },
  ];

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
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Today's Appointments</h2>
        <a
          href="/admin/appointments"
          className="text-sm px-3 py-1.5 border rounded-md hover:bg-gray-50"
        >
          View All
        </a>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{appointment.patient}</td>
                <td className="px-4 py-3">{appointment.doctor}</td>
                <td className="px-4 py-3">{appointment.time}</td>
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
                <td className="px-4 py-3 text-right">
                  <button className="text-sm text-teal-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
