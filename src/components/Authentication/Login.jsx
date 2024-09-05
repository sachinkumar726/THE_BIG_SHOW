import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidenav } from '../templates/Sidenav';
import Loading from '../Loading';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      navigate('/home'); // Navigate to the desired page after login
    }, 3000); // Simulating a 2-second delay
  };

  return (
    <div className="w-screen h-screen bg-[#303030] flex">
      <Sidenav menuset={false} />
      <div className="w-[80%] sm:w-full min-h-full overflow-auto overflow-x-hidden">
        <div className="flex items-center justify-center min-h-full">
          {loading ? (
            <Loading />  // Show the loading animation while the request is being processed
          ) : (
            <div className="bg-gray-900 p-8 text-gray-100 rounded shadow-md w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-100 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-100 mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex justify-end items-center mb-6">
                  <Link to="/forget" className="text-sm text-blue-700 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors duration-300"
                >
                  Login
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-gray-700">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-700 hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
