import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookAppointmentForm from '../../components/doctor/BookAppointmentForm';

export default function BookAppointmentPage() {
  const { id } = useParams(); // match the route param name here
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/doctor/${id}`);
        setDoctor(res.data.data || res.data); // adjust based on API response
      } catch (err) {
        console.error('Error fetching doctor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <p>Loading doctor info...</p>;
  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div>
      <h1>Book Appointment with Dr. {doctor.name}</h1>
      <BookAppointmentForm doctor={doctor} />
    </div>
  );
}
