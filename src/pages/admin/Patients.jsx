import React, { useState } from "react";
import { useAdminPatients } from "../../hooks/admin/useAdminPatients"; // You need to create this hook

export default function PatientsPage() {
  const { patients, isPending, error } = useAdminPatients();
  const [searchTerm, setSearchTerm] = useState("");

  if (isPending) return <div>Loading patients...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredPatients = patients.filter((patient) =>
    [patient.name, patient.id, patient.email, patient.phone]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow border">
      <h2 className="text-2xl font-semibold mb-4">Patients List</h2>

      <input
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
      />

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white text-gray-700 text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Age/Gender</th>
              <th className="px-4 py-3 border">Contact</th>
              <th className="px-4 py-3 border">Last Visit</th>
              <th className="px-4 py-3 border">Upcoming</th>
              <th className="px-4 py-3 border">Doctor</th>
              <th className="px-4 py-3 border text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border font-medium">{p.name}<div className="text-xs text-gray-500">{p.id}</div></td>
                  <td className="px-4 py-3 border">{p.age} / {p.gender}</td>
                  <td className="px-4 py-3 border">
                    <div>{p.email}</div>
                    <div className="text-xs text-gray-500">{p.phone}</div>
                  </td>
                  <td className="px-4 py-3 border">{p.lastVisit || "N/A"}</td>
                  <td className="px-4 py-3 border">{p.upcomingAppointment || "N/A"}</td>
                  <td className="px-4 py-3 border">{p.doctor || "N/A"}</td>
                  <td className="px-4 py-3 border text-right">
                    <button className="text-blue-600 hover:underline text-sm">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500 font-medium">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
