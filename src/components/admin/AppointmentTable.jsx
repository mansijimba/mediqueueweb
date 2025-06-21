import React, { useState } from "react";
import {
  useAdminAppointments,
  useDeleteAppointment,
} from "../../hooks/admin/useAdminAppointment";
import DeleteModal from "../deleteModal";
import { Link } from "react-router-dom";

export default function AppointmentTable() {

  const { appointments, isPending, error } = useAdminAppointments();
  console.log("Appointments:", appointments); 
  const deleteAppointmentHook = useDeleteAppointment();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    deleteAppointmentHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  if (isPending) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Appointment Table</h2>

      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this appointment?"
      />

      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Patient Name</th>
            <th className="px-4 py-2 border">Doctor Name</th>
            <th className="px-4 py-2 border">Specialty</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id} className="text-center">
              <td className="border px-4 py-2">{appt.patient?.fullName || "N/A"}</td>
              <td className="border px-4 py-2">{appt.doctor?.name || "N/A"}</td>
              <td className="border px-4 py-2">{appt.doctor?.specialty || "N/A"}</td>
              <td className="border px-4 py-2">
                {new Date(appt.date).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{appt.time}</td>
              <td className="border px-4 py-2 capitalize">{appt.status}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link to={`/admin/appointments/${appt._id}`}>
                  <button className="px-2 py-1 bg-blue-500 text-white rounded">
                    View
                  </button>
                </Link>
                <Link to={`/admin/appointments/${appt._id}/edit`}>
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => setDeleteId(appt._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
