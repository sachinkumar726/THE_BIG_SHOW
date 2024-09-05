import React from 'react';
import { Topnav } from '../templates/Topnav';
import { Sidenav } from '../templates/Sidenav';

function Forget() {
  return (
    <div className="w-screen h-screen bg-[#303030] flex">
      <Sidenav menuset={false} /> {/* You can control the menuset based on your logic */}
      <div className="w-[80%] sm:w-full min-h-full overflow-auto overflow-x-hidden">
        {/* <Topnav menuhendlaer={() => {}} menuset={false} /> */}
        <div className="flex items-center justify-center min-h-full">
          <div className="bg-gray-900 text-gray-100 p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Forget Password</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-100 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your registered email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors duration-300"
              >
                Reset Password
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                Remember your password?{' '}
                <a href="/login" className="text-blue-700 hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forget;
