import React from "react";

function HomePage({ handleLogout }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default HomePage;