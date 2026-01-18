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
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        // 1️⃣ Get CSRF token first
        const csrfRes = await axios.get(
          "http://localhost:5050/api/auth/csrf-token",
          { withCredentials: true } // send cookies
        );
        setCsrfToken(csrfRes.data.csrfToken);

        // 2️⃣ Fetch profile with CSRF header
        const profileRes = await axios.get(
          "http://localhost:5050/api/auth/profile",
          {
            withCredentials: true,
            headers: {
              "X-CSRF-Token": csrfRes.data.csrfToken,
            },
          }
        );
        setProfile(profileRes.data.user);

        // 3️⃣ Fetch appointments
        const appointmentsRes = await axios.get(
          `http://localhost:5050/api/appointment?patientId=${user._id}`,
          { withCredentials: true }
        );
        setAppointments(appointmentsRes.data.appointments);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?._id]);

  const handleViewQueue = () => {
    navigate("/queue");
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-teal-900 mb-4">
            Your Profile
          </h1>

          {isEditing ? (
            <ProfileEdit
              profile={profile}
              setProfile={setProfile}
              setIsEditing={setIsEditing}
              csrfToken={csrfToken} // ✅ pass CSRF token
            />
          ) : (
            <ProfileView
              profile={profile}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-teal-900 mb-6">
            Appointment History
          </h2>

          {appointments.length > 0 ? (
            <AppointmentHistory
              appointments={appointments}
              onViewQueue={handleViewQueue}
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
