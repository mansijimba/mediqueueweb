import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';  

export default function BookAppointmentForm({ doctor }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    contact: '',
    appointmentDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5050/api/appointment', {
        doctorId: doctor._id,
        patientName: user?.name,  // Automatically use logged-in user's name
        contact: formData.contact,
        appointmentDate: formData.appointmentDate,
      });
      alert('Appointment booked successfully!');
      navigate('/doctor');
    } catch (err) {
      console.error('Error booking appointment:', err);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <div>
        <label className="block mb-1">Contact Number</label>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1">Appointment Date</label>
        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        Confirm Appointment
      </button>
    </form>
  );
}
