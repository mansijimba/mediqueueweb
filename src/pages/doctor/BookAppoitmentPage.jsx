import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookAppointmentForm from '../../components/doctor/BookAppointmentForm';

export default function BookAppointmentPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/doctor/${id}`);
        setDoctor(res.data.data);
      } catch (err) {
        console.error('Error fetching doctor:', err);
      }
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) return <div className="text-center mt-10">Loading doctor details...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">
        Book Appointment with {doctor.name}
      </h2>
      <BookAppointmentForm doctor={doctor} />
    </div>
  );
}
