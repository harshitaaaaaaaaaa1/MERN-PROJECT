import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

const DashBord = () => {
  let [name, setname] = useState("");
  let ID = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4001/user/${ID.ID}`)
      .then((e) => {
        setname(e.data);
      })
      .catch(() => {
        console.log("unable to fetch data in Edit comp");
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar Section */}
      <div id="navbar" className="bg-skyblue-500 shadow-md">
        <ul className="flex justify-between items-center p-5 text-black">
          <li className="text-xl font-semibold">DASHBOARD</li>
          <div className="flex gap-8">
            <li>
              <Button variant="text" color="primary">
                <Link to="/dashbord/:ID">
                  <b> HOME</b>
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="text" color="primary">
                <Link to="/create-employee">
                  <b> CREATE EMPLOYEE </b>
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="text" color="primary">
                <Link to="/employee-list">
                  {" "}
                  <b> EMPLOYEE LIST </b>
                </Link>
              </Button>
            </li>
            <li className="p-1 text-black">
              <b>{name}</b>
            </li>
            <li>
              <Button variant="text" color="primary">
                <Link to="/logout">
                  <b>LOGOUT</b>
                </Link>
              </Button>
            </li>
          </div>
        </ul>
      </div>

      {/* Dashboard Title Section */}
      <div className="flex flex-col justify-center items-center mt-10">
        <p className="mt-4 text-lg text-gray-600">Welcome to the Admin Panel</p>
      </div>

      {/* Optional Content */}
      <div className="text-center mt-8">
        <p className="text-xl text-gray-700">
          You can manage employees, view the list, and perform other
          administrative tasks here.
        </p>
      </div>
    </div>
  );
};

export default DashBord;
