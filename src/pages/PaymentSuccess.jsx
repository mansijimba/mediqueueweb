import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// ============ PAYMENT SUCCESS PAGE (CREATED FOR ESEWA PAYMENT INTEGRATION) ============
export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [appointmentId] = useState(searchParams.get('appointmentId'));

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/doctor');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">
          Your appointment has been confirmed and payment received.
        </p>

        <div className="bg-green-50 border border-green-200 rounded p-3 mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Appointment ID:</span>
            <br />
            {appointmentId || 'Loading...'}
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Redirecting to doctor page in 5 seconds...
        </p>

        <button
          onClick={() => navigate('/doctor')}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          Go to Doctors
        </button>
      </div>
    </div>
  );
}
// ============ END PAYMENT SUCCESS PAGE ============