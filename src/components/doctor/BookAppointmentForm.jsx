import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentImage from '../../assets/images/bookapp.png';

// ============ APPOINTMENT FEE STRUCTURE (ADDED FOR ESEWA PAYMENT INTEGRATION) ============
const APPOINTMENT_FEES = {
  'Check-up': 300,      // 300 NPR
  'Follow-up': 200,     // 200 NPR
  'Consultation': 400   // 400 NPR
};
// ============ END APPOINTMENT FEE STRUCTURE ============

export default function BookAppointmentForm({ doctor }) {
  const { user } = useContext(AuthContext);

  const [appointmentDateTime, setAppointmentDateTime] = useState(null);
  const [type, setType] = useState('Check-up');
  // ============ PAYMENT STATE (ADDED FOR ESEWA PAYMENT INTEGRATION) ============
  const [isProcessing, setIsProcessing] = useState(false);
  // ============ END PAYMENT STATE ============

  // ============ CALCULATE APPOINTMENT FEE (ADDED FOR ESEWA PAYMENT INTEGRATION) ============
  const appointmentFee = APPOINTMENT_FEES[type] || 300;
  // ============ END CALCULATE APPOINTMENT FEE ============

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointmentDateTime || !type) {
      toast.error('Please select date, time, and appointment type');
      return;
    }

    try {
      setIsProcessing(true);

      // ============ SINGLE ENDPOINT: Book + Get Payment Form (MODIFIED FOR ESEWA PAYMENT INTEGRATION) ============
      const response = await axios.post(
        'http://localhost:5050/api/appointment/book',
        {
          doctorId: doctor._id,
          patientId: user?._id,
          specialty: doctor.specialty,
          date: appointmentDateTime.toISOString().split('T')[0], // 'YYYY-MM-DD'
          time: appointmentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type,
        }
      );

      // ============ DEBUG LOGGING (ADDED TO TROUBLESHOOT) ============
      console.log('✅ API Response Status:', response.status);
      console.log('✅ API Response Data:', response.data);
      console.log('✅ Success Flag:', response.data.success);
      console.log('✅ Payment Data:', response.data.data?.payment);
      // ============ END DEBUG LOGGING ============

      if (!response.data.success) {
        toast.error('Failed to create appointment');
        setIsProcessing(false);
        return;
      }

      // ============ HANDLE RESPONSE STRUCTURE (ADDED FOR FLEXIBILITY) ============
      // Check if payment data is in response.data.data (new structure) or response.data (fallback)
      const responseData = response.data.data || response.data;
      const { payment } = responseData;
      
      if (!payment) {
        console.error('❌ No payment data found. Backend may not be updated.');
        console.error('Response structure:', response.data);
        toast.error('Backend not updated. Please restart server and try again.');
        setIsProcessing(false);
        return;
      }

      if (!payment.formData || !payment.esewaUrl) {
        console.error('❌ Invalid payment data:', payment);
        toast.error('Payment data incomplete. Please try again.');
        setIsProcessing(false);
        return;
      }
      // ============ END HANDLE RESPONSE STRUCTURE ============

      toast.success('Appointment created! Redirecting to payment...');

      // ============ AUTO-SUBMIT ESEWA FORM (ADDED FOR ESEWA PAYMENT INTEGRATION) ============
      setTimeout(() => {
        try {
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = payment.esewaUrl;

          Object.entries(payment.formData).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
          });

          console.log('📤 Submitting form to:', payment.esewaUrl);
          document.body.appendChild(form);
          form.submit();
        } catch (formErr) {
          console.error('❌ Error submitting form:', formErr);
          toast.error('Failed to open payment portal. Please try again.');
          setIsProcessing(false);
        }
      }, 1500);
      // ============ END AUTO-SUBMIT ESEWA FORM ============

    } catch (err) {
      console.error('❌ Error booking appointment:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error message:', err.message);
      toast.error(err.response?.data?.message || 'Failed to book appointment. Try again.');
      setIsProcessing(false);
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
              disabled={isProcessing}
            />
          </div>

          <div>
            <label className="block mb-1">Appointment Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              disabled={isProcessing}
            >
              <option value="Check-up">Check-up</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          {/* ============ APPOINTMENT FEE DISPLAY (ADDED FOR ESEWA PAYMENT INTEGRATION) ============ */}
          <div className="bg-teal-50 p-4 rounded border border-teal-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Consultation Fee:</span>
              <span className="text-lg font-bold text-teal-600">Rs. {appointmentFee}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Payment required via eSewa</p>
          </div>
          {/* ============ END APPOINTMENT FEE DISPLAY ============ */}

          {/* ============ PAY & CONFIRM BUTTON (MODIFIED FOR ESEWA PAYMENT INTEGRATION) ============ */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay & Confirm'}
          </button>
          {/* ============ END PAY & CONFIRM BUTTON ============ */}
        </form>
      </div>
    </div>
  );
}