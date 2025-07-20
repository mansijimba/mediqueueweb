import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProfileView from "../components/User/ProfileView";
import ProfileEdit from "../components/User/ProfileEdit";
import AppointmentHistory from "../components/User/AppointmtentHistory";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user._id) {
        console.error("User not found in context!");
        setLoading(false);
        return;
      }

      try {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
          console.error("No token found!");
          setLoading(false);
          return;
        }

        const profileRes = await axios.get("http://localhost:5050/api/auth/profile", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setProfile(profileRes.data);

        const appointmentsRes = await axios.get(
          `http://localhost:5050/api/appointment?patientId=${user._id}`
        );
        setAppointments(appointmentsRes.data.appointments);
      } catch (error) {
        console.error("Error fetching profile or appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleViewQueue = (appointmentId) => {
    // You can customize this if needed — for now, just navigate to /queue
    navigate("/queue");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-teal-300">
        <div className="text-teal-900 text-lg font-semibold animate-pulse">Loading...</div>
      </div>
    );

  if (!profile)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-100 to-red-300">
        <div className="text-red-700 text-lg font-semibold">No profile data found.</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-white shadow-lg rounded-lg p-8 border border-teal-200">
          <h1 className="text-3xl font-bold text-teal-900 mb-4">Your Profile</h1>
          {isEditing ? (
            <ProfileEdit
              profile={profile}
              setProfile={setProfile}
              setIsEditing={setIsEditing}
            />
          ) : (
            <ProfileView profile={profile} onEdit={() => setIsEditing(true)} />
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 border border-teal-200">
          <h2 className="text-2xl font-semibold text-teal-900 mb-6">Appointment History</h2>
          {appointments.length > 0 ? (
            <AppointmentHistory
              appointments={appointments}
              onViewQueue={handleViewQueue}  // pass handler here
            />
          ) : (
            <p className="text-gray-500 italic">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
