import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/doctor');
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again.
        </p>

        <div className="bg-red-50 border border-red-200 rounded p-3 mb-6">
          <p className="text-sm text-red-600">
            Your appointment booking has been saved as pending. You can retry the payment anytime.
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Redirecting to doctor page in 7 seconds...
        </p>

        <button
          onClick={() => navigate('/doctor')}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
        >
          Return to Doctors
        </button>
      </div>
    </div>
  );
}
