import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentHistory = ({ appointments = [], onViewQueue }) => {
  const [localAppointments, setLocalAppointments] = useState(appointments);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    setLocalAppointments(appointments);
  }, [appointments]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    setCancelingId(id);
    try {
      await axios.post(`http://localhost:5050/api/appointment/${id}/cancel`);
      setLocalAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "cancelled" } : appt
        )
      );
      alert("Appointment canceled successfully.");
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert("Failed to cancel appointment.");
    } finally {
      setCancelingId(null);
    }
  };

  if (!Array.isArray(localAppointments)) {
    console.warn("Appointments is not an array:", localAppointments);
    return <p>No appointments to display.</p>;
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <h3 className="font-bold text-lg mb-4">Appointment History</h3>

      {localAppointments.length === 0 ? (
        <p>No appointment history available.</p>
      ) : (
        <div className="flex gap-6 flex-wrap">
          {localAppointments.map((appt) => (
            <div
              key={appt._id}
              className="border border-teal-300 rounded p-4 text-sm max-w-xs relative flex flex-col justify-between"
            >
              <div>
                {appt.status === "cancelled" && (
                  <p className="text-red-500 font-bold mb-2">Cancelled</p>
                )}
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(appt.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {appt.time}
                </p>
                <p>
                  <span className="font-semibold">Doctor:</span>{" "}
                  {appt.doctor?.name || "Unknown Doctor"}
                </p>
                <p>
                  <span className="font-semibold">Specialty:</span> {appt.specialty}
                </p>
                <p>
                  <span className="font-semibold">Type:</span> {appt.type}
                </p>
              </div>

              <div className="mt-4 flex flex-col space-y-2">
                <button
                  onClick={() => onViewQueue && onViewQueue(appt._id)}
                  disabled={appt.status === "cancelled"}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                  View Queue Status
                </button>

                <button
                  onClick={() => handleCancel(appt._id)}
                  disabled={cancelingId === appt._id || appt.status === "cancelled"}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {cancelingId === appt._id ? "Canceling..." : "Cancel Appointment"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
