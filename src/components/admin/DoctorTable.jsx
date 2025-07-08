import React, { useState } from "react";
import axios from "axios";
import { useAdminDoctors, useDeleteDoctor } from "../../hooks/admin/useAdminDoctor";
import { Link } from "react-router-dom";
import DeleteModal from "../deleteModal";

export default function DoctorTable() {
  const { doctors, isPending, error, refetch } = useAdminDoctors();
  const deleteDoctorHook = useDeleteDoctor();
  const [editDoctorId, setEditDoctorId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editedFields, setEditedFields] = useState({ status: "", availability: "" });
  const [loading, setLoading] = useState(false);

  const handleEditClick = (doctor) => {
    setEditDoctorId(doctor._id);
    setEditedFields({
      status: doctor.status || "",
      availability: doctor.availability || "",
    });
  };

  const handleInputChange = (e) => {
    setEditedFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5050/api/admin/doctors/${editDoctorId}/status`, editedFields);
      setEditDoctorId(null);
      await refetch();
    } catch (err) {
      console.error("Error updating doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditDoctorId(null);
    setEditedFields({ status: "", availability: "" });
  };

  const handleDelete = () => {
    deleteDoctorHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        refetch();
      },
    });
  };

  if (isPending) return <div>Loading doctors...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow border">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Doctor Availability</h2>
        <Link to="addDoctor">
          <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm">
            + Add Doctor
          </button>
        </Link>
      </div>

      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this appointment?"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-gray-700 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">Photo</th>
              <th className="px-4 py-3 border">Doctor</th>
              <th className="px-4 py-3 border">Specialty</th>
              <th className="px-4 py-3 border">Availability</th>
              <th className="px-4 py-3 border">Appointments</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => {
              const isEditing = editDoctorId === doctor._id;
              const appointmentFillWidth = Math.min((doctor.appointments / 10) * 100, 100);

              return (
                <tr key={doctor._id} className="hover:bg-gray-50 border-b text-center">
                  <td className="px-4 py-3 border">
                    {doctor.filepath ? (
                      <img
                        src={`http://localhost:5050/${doctor.filepath}`}
                        alt={doctor.name}
                        className="h-12 w-12 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 mx-auto">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 border font-medium">{doctor.name}</td>
                  <td className="px-4 py-3 border">{doctor.specialty}</td>

                  <td className="px-4 py-3 border">
                    {isEditing ? (
                      <input
                        name="availability"
                        value={editedFields.availability}
                        onChange={handleInputChange}
                        className="border rounded px-2 text-sm"
                      />
                    ) : (
                      doctor.availability || "N/A"
                    )}
                  </td>

                  <td className="px-4 py-3 border">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-full max-w-[140px] bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-teal-600 h-2.5 rounded-full"
                          style={{ width: `${appointmentFillWidth}%` }}
                        />
                      </div>
                      <span className="text-sm">{doctor.appointments}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 border">
                    {isEditing ? (
                      <select
                        name="status"
                        value={editedFields.status}
                        onChange={handleInputChange}
                        className="border rounded px-2 text-sm"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    ) : (
                      doctor.status
                    )}
                  </td>

                  <td className="px-4 py-3 border text-right space-x-2 whitespace-nowrap">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-2 py-1 bg-gray-400 text-white rounded text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to={`/admin/doctors/${doctor._id}`}>
                          <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => handleEditClick(doctor)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(doctor._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-sm"
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
    </div>
  );
}
