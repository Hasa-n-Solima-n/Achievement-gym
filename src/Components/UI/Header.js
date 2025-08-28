import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  const navigate = useHistory();

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem("authToken");
    localStorage.removeItem("accountType");
    localStorage.removeItem("coachId");
    localStorage.removeItem("memberId");
    localStorage.removeItem("email");
    // Redirect to login page
    navigate.push("/login");
  };

  return (
    <header className="main-header">
      <div className="header-tabs">
        <h1 className="gym-title">Achievement Gym</h1>
      </div>
      <div className="header-actions">
        <img
          src="http://localhost:3000/LogOUt.jpg"
          alt="Logout"
          onClick={handleLogout}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#aaaaaa",
            marginRight: "15px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        {/* <button className="logout-button">Logout</button> */}
        {/* <div className="header-avatar"></div> */}
        <img
          className="header-avatar"
          src="http://localhost:3000/logo.jpg"
          alt="A"
        />
      </div>
    </header>
  );
};

export default Header;
