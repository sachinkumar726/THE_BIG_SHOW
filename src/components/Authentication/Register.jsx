import React from 'react';
import { Link } from 'react-router-dom';
import { Topnav } from '../templates/Topnav';
import { Sidenav } from '../templates/Sidenav';

function Register() {
  return (
    <div className="w-screen h-screen bg-[#303030] flex">
      <Sidenav menuset={false} /> {/* You can control the menuset based on your logic */}
      <div className="w-[80%] sm:w-full min-h-full overflow-auto overflow-x-hidden">
        {/* <Topnav menuhendlaer={() => {}} menuset={false} /> */}
        <div className="flex items-center justify-center min-h-full">
          <div className="bg-gray-900 text-gray-100 p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Register</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-100 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
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
              <div className="mb-6">
                <label htmlFor="confirm-password" className="block text-gray-100 mb-2">Retype Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Retype your password"
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
