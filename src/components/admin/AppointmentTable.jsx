import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteModal from "../deleteModal";
import { useAdminAppointments, useDeleteAppointment } from "../../hooks/admin/useAdminAppointment";

export default function AppointmentTable() {
  const { appointments, isPending, error, refetch } = useAdminAppointments();
  const deleteAppointmentHook = useDeleteAppointment();

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedFields, setEditedFields] = useState({ status: "", time: "" });
  const [loading, setLoading] = useState(false);

  const handleEdit = (appt) => {
    setEditId(appt._id);
    setEditedFields({
      status: appt.status || "",
      time: appt.time || "",
    });
  };

  const handleChange = (e) => {
    setEditedFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:5050/api/admin/appointments/${editId}/status`,
        editedFields
      );
      setEditId(null);
      await refetch();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update appointment");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedFields({ status: "", time: "" });
  };

  const handleDelete = () => {
    deleteAppointmentHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        refetch();
      },
      onError: () => alert("Failed to delete appointment"),
    });
  };

  if (isPending) return <div className="text-center py-8">Loading appointments...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Appointments List</h2>

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this appointment?"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-teal-500 to-purple-600 text-white">
              <th className="px-4 py-3 text-center">Patient</th>
              <th className="px-4 py-3 text-center">Doctor</th>
              <th className="px-4 py-3 text-center">Specialty</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Time</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appt) => {
                const isEditing = appt._id === editId;
                return (
                  <tr key={appt._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-center">{appt.patient?.fullName || "N/A"}</td>
                    <td className="px-4 py-2 text-center">{appt.doctor?.name || "N/A"}</td>
                    <td className="px-4 py-2 text-center">{appt.doctor?.specialty || "N/A"}</td>
                    <td className="px-4 py-2 text-center">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-2 text-center">
                      {isEditing ? (
                        <input
                          type="time"
                          name="time"
                          value={editedFields.time}
                          onChange={handleChange}
                          className="border px-2 py-1 rounded-md"
                        />
                      ) : (
                        appt.time
                      )}
                    </td>

                    <td className="px-4 py-2 text-center capitalize">
                      {isEditing ? (
                        <select
                          name="status"
                          value={editedFields.status}
                          onChange={handleChange}
                          className="border px-2 py-1 rounded-md"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        appt.status
                      )}
                    </td>

                    <td className="px-4 py-2 text-center space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to={`/admin/appointments/${appt._id}`}>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                              View
                            </button>
                          </Link>
                          <button
                            onClick={() => handleEdit(appt)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(appt._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
