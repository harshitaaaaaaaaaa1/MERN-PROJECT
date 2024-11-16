import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Header from "../components/Header";

const EmployeeList = () => {
  const [infoFromDB, setInfoFromDB] = useState([]);
  const [reload, setReload] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4001/employee-list")
      .then((res) => {
        setInfoFromDB(res.data);
      })
      .catch((err) => {
        console.log("Error fetching employee data:", err);
      });
    setReload(1);
  }, [reload]);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:4001/employee-list/${id}`)
      .then(() => {
        setReload((prev) => prev + 1);
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
  };

  const toggleActiveStatus = (id, active) => {
    axios
      .put(`http://localhost:4001/employee-list/${id}`, { active: !active })
      .then(() => {
        setReload((prev) => prev + 1);
      })
      .catch((err) => {
        console.log("Error updating active status:", err);
      });
  };

  const filteredEmployees = infoFromDB.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item._id.includes(searchQuery) ||
      item.createdAt.split("T")[0].includes(searchQuery)
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;

      // For handling sorting based on ID (numeric sorting)
      if (key === "id") {
        const aId = a[key];
        const bId = b[key];
        if (aId < bId) return direction === "ascending" ? -1 : 1;
        if (aId > bId) return direction === "ascending" ? 1 : -1;
      }

      // For handling sorting based on Date (Date comparison)
      if (key === "createdAt") {
        const aDate = new Date(a[key]);
        const bDate = new Date(b[key]);
        if (aDate < bDate) return direction === "ascending" ? -1 : 1;
        if (aDate > bDate) return direction === "ascending" ? 1 : -1;
      }

      // For handling sorting based on Name and Email (string comparison)
      if (key === "name" || key === "email") {
        const aKey = a[key]?.toLowerCase?.() ?? a[key];
        const bKey = b[key]?.toLowerCase?.() ?? b[key];

        if (aKey < bKey) return direction === "ascending" ? -1 : 1;
        if (aKey > bKey) return direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const changePage = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      <Header />

      <div className="w-screen p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-700 font-semibold">
              Total Employees: {filteredEmployees.length}
            </p>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Search by Name, Email, ID or Date"
                className="border p-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Button variant="contained" color="primary">
            <Link to="/create-employee" className="text-white">
              Create Employee
            </Link>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  ID
                </th>
                <th className="border px-4 py-2">Image</th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  Name
                </th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("email")}
                >
                  Email
                </th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Designation</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">Course</th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("createdAt")}
                >
                  CreatedAt
                </th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((item, i) => (
                <tr
                  key={item._id}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                >
                  <td className="border px-4 py-2">{item._id}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={`http://localhost:4001/Images/${item.image}`}
                      alt="Employee"
                      className="h-50 w-50 "
                    />
                  </td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{item.phone}</td>
                  <td className="border px-4 py-2">{item.designation}</td>
                  <td className="border px-4 py-2">{item.gender}</td>
                  <td className="border px-4 py-2">{item.course.join(", ")}</td>
                  <td className="border px-4 py-2">
                    {item.createdAt.split("T")[0]}
                  </td>
                  <td className="border px-4 py-2">
                    <Switch
                      checked={item.active}
                      onChange={() => toggleActiveStatus(item._id, item.active)}
                      name="activeStatus"
                      inputProps={{ "aria-label": "active status toggle" }}
                    />{" "}
                    {item.active ? "Active" : "Deactive"}
                    <br />
                    <Link
                      to={`/edit-employee/${item._id}`}
                      className="p-2 mr-2 text-black underline"
                    >
                      Edit
                    </Link>
                    <button
                      className="p-2 text-black underline"
                      onClick={() => deleteUser(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            className="border px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => changePage(currentPage + 1)}
            className="border px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
