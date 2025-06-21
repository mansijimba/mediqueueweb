import React from "react";
import { useAdminDoctors } from "../../hooks/admin/useAdminDoctor";

export default function DoctorTable() {
  const { doctors, isPending, error } = useAdminDoctors();
   console.log("Doctors:", doctors); 

  if (isPending) return <div>Loading doctors...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow border">
      <h2 className="text-2xl font-semibold mb-6">Doctor Availability</h2>

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
            </tr>
          </thead>
          <tbody>
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor) => {
                const appointmentFillWidth = Math.min(
                  (doctor.appointments / 10) * 100,
                  100
                );

                return (
                  <tr
                    key={doctor._id}
                    className="hover:bg-gray-50 border-b text-center"
                  >
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
                    <td className="px-4 py-3 border">{doctor.availability || "N/A"}</td>
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
                    <td className="px-4 py-3 border">{doctor.status}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
