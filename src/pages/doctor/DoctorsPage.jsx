import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [snackbar, setSnackbar] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/doctor');
        setDoctors(res.data.data || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleBookAppointment = (id) => {
    const token = localStorage.getItem('token'); // or however you store auth
    if (!token) {
      setSnackbar('You must be logged in to book an appointment.');
      setTimeout(() => setSnackbar(''), 3000);
      return;
    }
    navigate(`/doctor/book/${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-teal-800 mb-10">
        Meet Our Doctors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <img
              src={
                doc.filepath
                  ? `http://localhost:5050/${doc.filepath.replace(/\\/g, '/')}`
                  : 'https://via.placeholder.com/300x200'
              }
              alt={doc.name}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800">{doc.name}</h3>
            <p className="text-teal-600 font-medium">{doc.specialty}</p>
            <p className="text-sm text-gray-600 mt-1">
              Availability: {doc.availability || 'N/A'}
            </p>
            <button
              onClick={() => handleBookAppointment(doc._id)}
              className="mt-4 w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {snackbar && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50">
          {snackbar}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
