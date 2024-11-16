import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const EditEmployee = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState();
  let [designation, setDesignation] = useState();
  let [gender, setGender] = useState();
  let [courses, setCourses] = useState([]);
  let [image, setImage] = useState();

  let idObj = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:4001/employee-list/${idObj.ID}`)
      .then((e) => {
        setName(e.data.name);
        setEmail(e.data.email);
        setPhone(e.data.phone);
        setDesignation(e.data.designation);
        setGender(e.data.gender);
        setCourses(e.data.course);
      })
      .catch(() => {
        console.log("erro");
      });
  }, []);

  // checkBox handling
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCourses([...courses, value]);
    } else {
      setCourses(courses.filter((course) => course !== value));
    }
  };

  let formHandle = (e) => {
    e.preventDefault();
    let payload = {
      name: name,
      email: email,
      phone: phone,
      image: image,
      designation: designation,
      gender: gender,
      course: courses,
    };
    axios
      .put(`http://localhost:4001/employee-list/${idObj.ID}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((e) => {
        alert(e.data);
      })
      .catch(() => {
        console.log("err ");
      });

    navigate("/employee-list");
  };

  return (
    <div>
      <Header />

      <h1 className="text-center font-bold text-3xl my-3">Create Employee</h1>
      <div className="border text-center  max-w-[300px] mx-auto my-5 p-8 justify-center align-center">
        <input
          className="text-black my-3 placeholder-black  border-black border-2 rounded-lg text-center w-full p-3"
          placeholder="Enter Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="text-black my-3 placeholder-black  border-black border-2 rounded-lg text-center w-full p-3 "
          placeholder="Enter Email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className=" text-black my-3 placeholder-black  border-black border-2 rounded-lg  text-center  w-full p-3 "
          placeholder="Enter Phone Number"
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />

        {/* designation dropdown */}

        <label htmlFor="">Designation</label>
        <select
          name="gender"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>

        {/* Gender radio button */}

        <label htmlFor="">Gender : </label>
        <br />
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          checked={gender === "Male"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="male"> Male </label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          checked={gender === "Female"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="female"> Female </label>
        <br />

        {/* Courses check boxes */}

        <label>Course :</label>
        <br />
        <input
          type="checkbox"
          id="MCA"
          name="course"
          value="MCA"
          checked={courses.includes("MCA")}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="MCA"> MCA </label>
        <input
          type="checkbox"
          id="BCA"
          name="course"
          value="BCA"
          checked={courses.includes("BCA")}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="BCA"> BCA </label>
        <input
          type="checkbox"
          id="BSC"
          name="course"
          value="BSC"
          checked={courses.includes("BSC")}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="BSC"> BSC </label>

        <br />
        <br />
        <label htmlFor="">Upload your photo</label>
        <br />
        <input
          className="text-center align-middle"
          type="file"
          name="image"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <br />
        <br />
        <button className="bg-blue-600 text-white p-4" onClick={formHandle}>
          <b> Update Details</b>
        </button>
      </div>
    </div>
  );
};

export default EditEmployee;
