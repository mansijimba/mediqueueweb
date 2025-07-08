import React, { useState } from "react";
import {
  useAdminAppointments,
  useDeleteAppointment,
} from "../../hooks/admin/useAdminAppointment";
import DeleteModal from "../deleteModal";
import axios from "axios";
import { Link } from "react-router-dom";

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
      await axios.patch(`http://localhost:5050/api/admin/appointments/${editId}/status`, editedFields);
      setEditId(null);
      await refetch(); // update UI
    } catch (err) {
      console.error("Update error:", err);
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

      <table className="min-w-full table-auto border border-gray-300 text-sm">
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
          {appointments.map((appt) => {
            const isEditing = appt._id === editId;
            return (
              <tr key={appt._id} className="text-center border-t">
                <td className="border px-4 py-2">{appt.patient?.fullName || "N/A"}</td>
                <td className="border px-4 py-2">{appt.doctor?.name || "N/A"}</td>
                <td className="border px-4 py-2">{appt.doctor?.specialty || "N/A"}</td>
                <td className="border px-4 py-2">
                  {new Date(appt.date).toLocaleDateString()}
                </td>

                {/* Editable Time */}
                <td className="border px-4 py-2">
                  {isEditing ? (
                    <input
                      type="time"
                      name="time"
                      value={editedFields.time}
                      onChange={handleChange}
                      className="border px-2 rounded"
                    />
                  ) : (
                    appt.time || "-"
                  )}
                </td>

                {/* Editable Status */}
                <td className="border px-4 py-2 capitalize">
                  {isEditing ? (
                    <select
                      name="status"
                      value={editedFields.status}
                      onChange={handleChange}
                      className="border px-2 rounded"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    appt.status
                  )}
                </td>

                {/* Actions */}
                <td className="border px-4 py-2 space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to={`/admin/appointments/${appt._id}`}>
                        <button className="px-2 py-1 bg-blue-500 text-white rounded">
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => handleEdit(appt)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(appt._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
