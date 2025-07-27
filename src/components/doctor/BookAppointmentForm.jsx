import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentImage from '../../assets/images/bookapp.png';

export default function BookAppointmentForm({ doctor }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [appointmentDateTime, setAppointmentDateTime] = useState(null);
  const [type, setType] = useState('Check-up');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointmentDateTime || !type) {
      toast.error('Please select date, time, and appointment type');
      return;
    }

    try {
      await axios.post('http://localhost:5050/api/appointment/book', {
        doctorId: doctor._id,
        patientId: user?._id,
        specialty: doctor.specialty,
        date: appointmentDateTime.toISOString().split('T')[0], // 'YYYY-MM-DD'
        time: appointmentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type,
        status: 'pending',
      });

      toast.success('Appointment booked successfully!');
      setTimeout(() => navigate('/doctor'), 1500);
    } catch (err) {
      console.error('Error booking appointment:', err);
      toast.error('Failed to book appointment. Try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded shadow overflow-hidden max-w-4xl mx-auto mt-8">
      <ToastContainer position="top-center" />

      {/* Left Image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src={AppointmentImage}
          alt="Book Appointment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 w-full p-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1">Select Date & Time</label>
            <DatePicker
              selected={appointmentDateTime}
              onChange={(date) => setAppointmentDateTime(date)}
              showTimeSelect
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full border rounded px-3 py-2"
              minDate={new Date()}
              placeholderText="Choose date and time"
            />
          </div>

          <div>
            <label className="block mb-1">Appointment Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="Check-up">Check-up</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
