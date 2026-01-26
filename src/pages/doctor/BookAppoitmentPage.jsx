import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookAppointmentForm from '../../components/doctor/BookAppointmentForm';

export default function BookAppointmentPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/doctor/${id}`);
        setDoctor(res.data.data || res.data);
      } catch (err) {
        console.error('Error fetching doctor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading doctor info...</p>;
  if (!doctor) return <p className="text-center mt-10 text-red-500">Doctor not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={
            doctor.filepath
              ? `http://localhost:5050/${doctor.filepath.replace(/\\/g, "/")}`
              : 'https://via.placeholder.com/150'
          }
          alt={doctor.name}
          className="w-32 h-32 object-cover rounded-full border-4 border-teal-500 shadow-md mb-4"
        />
        <h1 className="text-2xl font-bold text-teal-700">Book Appointment with Dr. {doctor.name}</h1>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-gray-500 text-sm mt-1">Availability: {doctor.availability || 'N/A'}</p>
      </div>

      <BookAppointmentForm doctor={doctor} />
    </div>
  );
}