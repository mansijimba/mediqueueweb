import React from "react";
import { useAdminPatients } from "../../hooks/admin/useAdminPatient";

export default function PatientsPage() {
  const { patients, isPending, error } = useAdminPatients();

  if (isPending)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg font-medium">
        Loading patients...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500 text-lg font-semibold">
        Error: {error.message || "Something went wrong"}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-teal-50 to-white rounded-2xl shadow-xl border border-teal-200">
      <h2 className="text-4xl font-extrabold text-teal-800 mb-12 text-center drop-shadow-md">
        Patients List
      </h2>

      {patients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {patients.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 cursor-default"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-bold text-xl uppercase">
                    {p.fullName?.charAt(0) || "P"}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{p.fullName}</h3>
              </div>
              <div className="text-gray-700 mb-2">
                <span className="font-semibold text-teal-600">Email:</span> {p.email}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold text-teal-600">Phone:</span> {p.phone}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 font-semibold py-20 text-xl">
          No patients found.
        </div>
      )}
    </div>
  );
}
