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

  if (isPending) return <div className="text-center py-6">Loading doctors...</div>;
  if (error) return <div className="text-center text-red-500 py-6">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Doctor List</h2>
        <Link to="addDoctor">
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition">
            + Add Doctor
          </button>
        </Link>
      </div>

      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this doctor?"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Specialty</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => {
              const isEditing = editDoctorId === doctor._id;
              return (
                <tr key={doctor._id} className="hover:bg-gray-50 transition border-b text-center">
                  <td className="px-4 py-3">
                    {doctor.filepath ? (
                      <img
                        src={`http://localhost:5050/${doctor.filepath}`}
                        alt={doctor.name}
                        className="h-12 w-12 rounded-full object-cover mx-auto shadow"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 mx-auto">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold">{doctor.name}</td>
                  <td className="px-4 py-3">{doctor.specialty}</td>

                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        name="availability"
                        value={editedFields.availability}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 text-sm w-28 text-center"
                      />
                    ) : (
                      doctor.availability || "N/A"
                    )}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {isEditing ? (
                      <select
                        name="status"
                        value={editedFields.status}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 text-sm w-28 text-center"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doctor.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : doctor.status === "Inactive"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {doctor.status}
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                          disabled={loading}
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
                        <Link to={`/admin/doctors/${doctor._id}`}>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => handleEditClick(doctor)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(doctor._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
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
