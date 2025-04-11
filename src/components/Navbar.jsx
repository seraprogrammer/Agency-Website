import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, isAdmin, handleLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-white font-bold text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Blog Platform
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center">
                <div className="flex flex-col items-end mr-4">
                  <span className="text-white font-medium text-sm">
                    {user.displayName}
                  </span>
                  <span className="text-blue-200 text-xs">{user.email}</span>
                </div>
                {isAdmin && (
                  <span className="bg-yellow-500 text-blue-900 text-xs px-2 py-1 rounded-full mr-3 font-semibold">
                    Admin
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-3 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-700 hover:bg-blue-50 py-2 px-4 rounded-md font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
