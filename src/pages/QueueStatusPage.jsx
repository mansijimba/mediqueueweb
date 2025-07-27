import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthProvider";

const QueueStatusPage = () => {
  const { user } = useContext(AuthContext);
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueueStatus = async () => {
      if (!user || !user._id) return;

      try {
        const res = await axios.get(`http://localhost:5050/api/queue/status`, {
          params: { patientId: user._id },
        });
        setQueueStatus(res.data);
      } catch (err) {
        console.error("Error fetching queue status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueueStatus();
  }, [user]);

  if (loading)
    return <div className="p-10 text-center font-semibold">Loading...</div>;

  if (!queueStatus || !queueStatus.success)
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        You are not in the queue.
      </div>
    );

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Your Queue Status
        </h2>
        <p className="text-lg mb-2">
          <strong>Status:</strong> {queueStatus.status}
        </p>
        <p className="text-lg mb-2">
          <strong>Position in Queue:</strong> {queueStatus.position}
        </p>
        <p className="text-lg mb-2">
          <strong>Patients Ahead:</strong> {queueStatus.totalAhead}
        </p>
        {/* Removed Recommended Arrival Time */}
      </div>
    </div>
  );
};

export default QueueStatusPage;
