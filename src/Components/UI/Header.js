import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const REACT_APP_MY_URL = process.env.REACT_APP_MY_URL;
const logoutIcon = REACT_APP_MY_URL + "/LogOUt.jpg";
const logo = REACT_APP_MY_URL + "/logo.jpg";

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
          src={logoutIcon}
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
        <img className="header-avatar" src={logo} alt="A" />
      </div>
    </header>
  );
};

export default Header;
