import React from "react";

function HomeUser({ handleLogout }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <h1>HomeUser</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default HomeUser;
