/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function HomeStaff({ handleLogout }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <h1>HomeStaff</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default HomeStaff;