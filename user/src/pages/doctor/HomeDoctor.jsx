import React from "react";

function HomeDoctor({ handleLogout }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <h1>HomeDoctor</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default HomeDoctor;
