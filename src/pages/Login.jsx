import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/loginForm';
import { AuthContext } from '../auth/AuthProvider';

export default function Login() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const returnToHome = (event) => {
    if (event) event.preventDefault();
    navigate('/');
  };

  if (user) {
    return <div>You are already logged in</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <NavLink to="/" className="text-blue-600 hover:underline">
          Go Back
        </NavLink>
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </div>

      <button
        onClick={returnToHome}
        className="mb-4 bg-gray-200 px-4 py-2 rounded"
      >
        Return Home
      </button>

      <button
        onClick={(event) => returnToHome(event)}
        className="mb-4 bg-gray-300 px-4 py-2 rounded ml-2"
      >
        Return Home Callback
      </button>

      <div>
        <LoginForm />
      </div>
    </div>
  );
}
