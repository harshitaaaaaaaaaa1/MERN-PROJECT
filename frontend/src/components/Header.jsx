import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 fixed top-0 w-full z-10 shadow-md">
      <nav>
        <ul className="flex justify-around">
          <li>
            <Link to="/dashbord/:ID" className="hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/create-employee" className="hover:text-blue-300">
              Create Employee
            </Link>
          </li>
          <li>
            <Link to="/employee-list" className="hover:text-blue-300">
              Employee List
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:text-blue-300">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
