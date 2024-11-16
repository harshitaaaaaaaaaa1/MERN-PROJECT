import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data (e.g., authentication token, user info)
    localStorage.removeItem("user-token"); // Or sessionStorage.removeItem if you're using sessionStorage
    localStorage.removeItem("user-info"); // Clear other user-related data, if applicable

    // Optionally, you can also reset other session-related data like cart or preferences
    // localStorage.removeItem('cart');
    // localStorage.removeItem('preferences');

    // Redirect to login page or home page after logout
    navigate("/"); // Redirect to the Home or Login page
  };

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">
        You have been successfully logged out
      </h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Logout;
