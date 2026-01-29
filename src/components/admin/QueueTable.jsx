"use client";

import React, { useEffect, useState } from "react";
import DeleteModal from "../deleteModal";
import axios from "axios";

export default function QueueTable() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const fetchQueues = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5050/api/admin/queues",{ withCredentials: true });
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
      }, { withCredentials: true });
      setEditId(null);
      setEditedStatus("");
      await fetchQueues();
    } catch (err) {
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
      await axios.delete(`http://localhost:5050/api/admin/queues/${deleteId}`,
        { withCredentials: true }
      );
      setQueues((prev) => prev.filter((q) => q._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert("Failed to delete queue entry");
    } finally {
      setDeleting(false);
    }
  };

  const filteredQueues = queues.filter((item) =>
    statusFilter === "all" ? true : item.status === statusFilter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-green-500/10 text-green-600 border border-green-300";
      case "Waiting":
        return "bg-yellow-400/10 text-yellow-700 border border-yellow-300";
      case "Not Arrived":
        return "bg-gray-400/10 text-gray-700 border border-gray-300";
      case "Completed":
        return "bg-blue-500/10 text-blue-600 border border-blue-300";
      case "No Show":
        return "bg-red-500/10 text-red-600 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <div className="p-6 text-center text-lg text-gray-600 animate-pulse">Loading queue...</div>;
  if (error) return <div className="p-6 text-center text-red-600 font-semibold">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">📋 Queue Management</h1>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting">Waiting</option>
              <option value="Not Arrived">Not Arrived</option>
              <option value="Completed">Completed</option>
              <option value="No Show">No Show</option>
            </select>
          </div>

          <DeleteModal
            isOpen={!!deleteId}
            onClose={() => setDeleteId(null)}
            onConfirm={handleDelete}
            title="Delete Confirmation"
            description="Are you sure you want to delete this queue entry?"
            isLoading={deleting}
          />

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
            <table className="min-w-full table-auto text-sm text-gray-800">
              <thead className="bg-gradient-to-r from-indigo-100 to-cyan-100 text-gray-800 font-semibold">
                <tr>
                  <th className="px-4 py-3">Queue #</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Appointment</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueues.map((queue) => (
                  <tr
                    key={queue._id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition-all duration-200"
                  >
                    <td className="px-4 py-3 font-medium">{queue.queuePosition || "N/A"}</td>
                    <td className="px-4 py-3">{queue.patient?.fullName || queue.patient?.name || "N/A"}</td>
                    <td className="px-4 py-3">{queue.doctor?.name || "N/A"}</td>
                    <td className="px-4 py-3">{queue.appointmentTime || "N/A"}</td>
                    <td className="px-4 py-3">
                      {editId === queue._id ? (
                        <select
                          value={editedStatus}
                          onChange={(e) => setEditedStatus(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
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
                          className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                            queue.status
                          )}`}
                        >
                          {queue.status || "N/A"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {editId === queue._id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-xs shadow"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white text-xs shadow"
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
                            className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-xs shadow"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(queue._id)}
                            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs shadow"
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
                    <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                      No queue entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
