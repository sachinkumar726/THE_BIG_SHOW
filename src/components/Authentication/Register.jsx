import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Topnav } from '../templates/Topnav';
import { Sidenav } from '../templates/Sidenav';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  // Handles input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Registration form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for password matching
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Replace this with actual registration API request
      // Example using axios:
      // await axios.post('/api/register', formData);

      // Reset form and error state on successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setError('');
      
      // Redirect to login or home page on success
      // navigate('/login');
      alert('Registration successful!');
    } catch (err) {
      // Handle registration errors (e.g., show error messages)
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-screen h-screen bg-[#303030] flex">
      <Sidenav menuset={false} />
      <div className="w-[80%] sm:w-full min-h-full overflow-auto overflow-x-hidden">
        {/* Uncomment Topnav if needed */}
        {/* <Topnav menuhendlaer={() => {}} menuset={false} /> */}
        <div className="flex items-center justify-center min-h-full">
          <div className="bg-gray-900 text-gray-100 p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Register</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-100 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-100 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-100 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-100 mb-2">Retype Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Retype your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors duration-300"
              >
                Register
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                Already registered?{' '}
                <Link to="/login" className="text-blue-700 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
