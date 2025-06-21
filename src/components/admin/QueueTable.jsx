"use client";

import React, { useState } from "react";
import { Clock, Plus, Search } from "lucide-react";
import { useAdminQueues, useDeleteQueue } from "../../hooks/admin/useAdminQueue"; // your hooks
import DeleteModal from "../deleteModal";
import { Link } from "react-router-dom";

export default function QueueTable() {
  const { queues, isPending, error } = useAdminQueues();
  console.log("Queues:", queues); 
  const deleteQueueHook = useDeleteQueue();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    deleteQueueHook.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
    });
  };

  const filteredQueues = (queues || []).filter((item) => {
    const matchesSearch =
      item.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchTerm.toLowerCase());

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

  if (isPending) return <div>Loading queue...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
            {queues?.filter((q) => q.status === "Waiting" || q.status === "In Progress").length}
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
            {queues?.filter((q) => q.status === "Not Arrived").length}
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

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this queue entry?"
      />

      <div className="border rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Queue #</th>
              <th className="px-4 py-2 border text-left">Patient</th>
              <th className="px-4 py-2 border text-left">Doctor</th>
              <th className="px-4 py-2 border text-left">Appointment</th>
              <th className="px-4 py-2 border text-left">Arrival</th>
              <th className="px-4 py-2 border text-left">Wait Time</th>
              <th className="px-4 py-2 border text-left">Priority</th>
              <th className="px-4 py-2 border text-left">Status</th>
              <th className="px-4 py-2 border text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredQueues.map((queue) => (
    <tr key={queue._id} className="text-center bg-white hover:bg-gray-50">
      <td className="border px-4 py-2">{queue.patient?.fullName || "N/A"}</td>
      <td className="border px-4 py-2">{queue.doctor?.name || "N/A"}</td>
      <td className="border px-4 py-2">{queue.doctor?.specialty || "N/A"}</td>
      <td className="border px-4 py-2">{queue.appointmentTime || "N/A"}</td>
      <td className="border px-4 py-2">{queue.arrivalTime || "N/A"}</td>
      <td className="border px-4 py-2">{queue.waitTime || "N/A"}</td>
      <td className="border px-4 py-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(queue.priority)}`}>
          {queue.priority || "N/A"}
        </span>
      </td>
      <td className="border px-4 py-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(queue.status)}`}>
          {queue.status || "N/A"}
        </span>
      </td>
      <td className="border px-4 py-2 space-x-2">
        <Link to={`/admin/queues/${queue._id}`}>
          <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">View</button>
        </Link>
        <Link to={`/admin/queues/${queue._id}/edit`}>
          <button className="px-2 py-1 bg-yellow-500 text-white rounded text-sm">Edit</button>
        </Link>
        <button
          onClick={() => setDeleteId(queue._id)}
          className="px-2 py-1 bg-red-500 text-white rounded text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
  {filteredQueues.length === 0 && (
    <tr>
      <td colSpan="9" className="text-center py-4 text-gray-500">
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
