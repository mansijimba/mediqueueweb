import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/doctor');
        console.log("fetch doctors", res.data);
        setDoctors(res.data.data || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Meet Our Doctors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc._id} className="bg-white p-4 rounded-lg shadow text-center">
            <img
              src={
                doc.filepath
                  ? `http://localhost:5050/uploads/${doc.filepath}`
                  : 'https://via.placeholder.com/300x200'
              }
              alt={doc.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">{doc.name}</h3>
            <p className="text-teal-600">{doc.specialty}</p>
            <p className="text-sm text-gray-600 mt-1">
              Availability: {doc.availability || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              Appointments: {doc.appointments}
            </p>
            <button
              className="mt-3 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              onClick={() => navigate(`/doctor/book/${doc._id}`)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
