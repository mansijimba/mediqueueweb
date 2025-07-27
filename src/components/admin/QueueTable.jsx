"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DeleteModal from "../deleteModal";
import { Link } from "react-router-dom";
import axios from "axios";

export default function QueueTable() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const fetchQueues = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5050/api/admin/queues");
      if (res.data.success) {
        setQueues(res.data.data);
        setError(null);
      } else {
        setError("Failed to load queue data");
      }
    } catch (err) {
      setError(err.message || "Error fetching queues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  const handleSave = async () => {
    if (!editId) return;
    try {
      setLoading(true);
      await axios.patch(`http://localhost:5050/api/admin/queues/${editId}`, {
        status: editedStatus,
      });
      setEditId(null);
      setEditedStatus("");
      await fetchQueues();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update queue");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedStatus("");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await axios.delete(`http://localhost:5050/api/admin/queues/${deleteId}`);
      setQueues((prev) => prev.filter((q) => q._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert("Failed to delete queue entry");
    } finally {
      setDeleting(false);
    }
  };

  const filteredQueues = queues.filter((item) => {
    const patientName = item.patient?.fullName || item.patient?.name || "";
    const doctorName = item.doctor?.name || "";
    const id = item._id || "";

    const matchesSearch =
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.toLowerCase().includes(searchTerm.toLowerCase());

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

  if (loading) return <div className="p-6 text-gray-600">Loading queue...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-gray-900">Queue Management</h1>
      
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-[180px]">
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

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this queue entry?"
        isLoading={deleting}
      />

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-left font-semibold">
            <tr>
              <th className="px-4 py-3">Queue #</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Appointment</th>
              {/* Removed Arrival header */}
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueues.map((queue) => (
              <tr
                key={queue._id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2">{queue.queuePosition || "N/A"}</td>
                <td className="px-4 py-2">
                  {queue.patient?.fullName || queue.patient?.name || "N/A"}
                </td>
                <td className="px-4 py-2">{queue.doctor?.name || "N/A"}</td>
                <td className="px-4 py-2">{queue.appointmentTime || "N/A"}</td>
                {/* Removed Arrival Time cell */}
                <td className="px-4 py-2">
                  {editId === queue._id ? (
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs"
                    >
                      <option value="">Select Status</option>
                      <option value="Waiting">Waiting</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Not Arrived">Not Arrived</option>
                      <option value="No Show">No Show</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        queue.status
                      )}`}
                    >
                      {queue.status || "N/A"}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  {editId === queue._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditId(queue._id);
                          setEditedStatus(queue.status);
                        }}
                        className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(queue._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredQueues.length === 0 && (
              <tr>
                {/* Adjusted colSpan to 6 because one column removed */}
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  No queue entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
