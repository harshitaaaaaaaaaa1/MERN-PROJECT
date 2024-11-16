import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cnfPassword, setCnfPassword] = useState("");
  let navigate = useNavigate();

  let submitForm = () => {
    let payload = {
      name,
      email,
      cnfPassword,
    };
    if (!name || !email || !cnfPassword) {
      alert("To register Fill all the fields..!");
    } else {
      if (password === cnfPassword) {
        axios
          .post("http://localhost:4001/register", payload)
          .then((e) => {
            alert(e.data);
            navigate("/");
          })
          .catch((e) => {
            alert("problem in sending data to the Backend.!");
          });
      } else {
        alert("both password should be matched..");
      }
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-3">Sign Up</h1>
      <div className="border text-center  max-w-[300px] mx-auto my-5 p-8 justify-center align-center">
        <div>
          <input
            className=" text-black my-3 placeholder-black  border-black border-2 rounded-lg text-center w-full p-3"
            placeholder="Enter Full Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <input
            required
            className=" text-black my-3 placeholder-black  border-black border-2 rounded-lg text-center w-full p-3"
            placeholder="Enter Email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            required
            className=" text-black my-3 placeholder-black  border-black border-2 rounded-lg text-center w-full p-3"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className=" text-black my-3 placeholder-black  border-black border-2 rounded-lg text-center w-full p-3"
            placeholder="Retype Password"
            type="password"
            value={cnfPassword}
            onChange={(e) => {
              setCnfPassword(e.target.value);
            }}
          />
          <button
            className="bg-blue-500    hover:bg-blue-200 "
            onClick={submitForm}
          >
            <b>Sign Up</b>
          </button>
          <br />
          <p>
            Already have an account?
            <button className="underline text-blue-500" variant="outlined">
              <Link to="/">
                {" "}
                <b>Sign In</b>
              </Link>
            </button>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
