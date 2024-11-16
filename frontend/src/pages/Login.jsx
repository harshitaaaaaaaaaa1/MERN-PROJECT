import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Button from '@mui/material/Button';

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  let login = () => {
    let payload = { email, password };
    axios.post("http://localhost:4001/login", payload).then((e) => {
      if (e.data.status == "success") {
        navigate(`/dashbord/${e.data.id}`);
      } else if (e.data.status == "fail") {
        alert("wrong password");
      } else if (e.data.status == "noUser") {
        alert("Invalid Email");
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <p className="text-gray-500">Please enter your details below</p>
        </div>

        <div className="max-w-[300px] mx-auto space-y-6">
          <input
            className="w-full px-4 py-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <br />
          <input
            className="w-full px-4 py-3 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
            onClick={login}
          >
            LOGIN
          </button>
          <br />
          <p>
            Do not have an Account ? &nbsp;
            <button className="underline text-blue-400" variant="outlined">
              <Link to="/register"> Sign Up</Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
