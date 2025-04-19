import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 ">
      <nav className="flex justify-between items-center py-4 md:px-10 lg:px-15">
        {/**Navbar left */}
        <NavLink to="/">
          <img
            className="w-[150px]"
            src="./logo-light.png"
            alt="website logo"
          />
        </NavLink>

        {/**Navbar right */}
        <ul className="hidden   md:flex items-center gap-14 md:gap-8 md:mr-14  text-lg  ">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return (
                  (isActive
                    ? " border-green-300 border-b-3"
                    : "text-gray-800 hover:text-green-500 ") +
                  " transition duration-300"
                );
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => {
                return isActive
                  ? " border-green-300 border-b-3"
                  : "text-gray-800 hover:text-green-500 transition duration-300";
              }}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service"
              className={({ isActive }) => {
                return isActive
                  ? " border-green-300 border-b-3"
                  : "text-gray-800 hover:text-green-500 transition duration-300";
              }}
            >
              Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => {
                return isActive
                  ? " border-green-300 border-b-3"
                  : "text-gray-800 hover:text-green-500 transition duration-300";
              }}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/**Mobile menu button */}
        <button className="hidden"></button>
      </nav>

      {/**Mobile menu */}
      <div className="hidden"></div>
    </header>
  );
};

export default Header;
