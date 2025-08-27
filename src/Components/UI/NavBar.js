import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const accountType = localStorage.getItem("accountType");
  const memberId = localStorage.getItem("memberId");
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        {/* <div className="logo-placeholder"></div> */}
        <img className="logo-placeholder" src="logo.jpg"/>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/homePost" className="nav-item">
              {/* <span className="nav-icon"></span>Home */}
              <img className="nav-icon" src="home.jpg"/>Home
            </Link>
          </li>
          {accountType === "Coach" ? (
            <li>
              <Link to="/members" className="nav-item">
                {/* <span className="nav-icon"></span>Members */}
                <img className="nav-icon" src="members.jpg"/>Members
              </Link>
            </li>
          ) : accountType === "GymMember" && memberId ? (
            <li>
              <Link to={`/profile/${memberId}`} className="nav-item">
                {/* <span className="nav-icon"></span>Profile */}
                <img className="nav-icon" src="profile.jpg"/>Profile
              </Link>
            </li>
          ) : null}
          {/* <li>
            <Link to="/addSession" className="nav-item">
              <span className="nav-icon"></span>Add Session
            </Link>
          </li> */}
          <li>
            <Link to="/sessions" className="nav-item">
              {/* <span className="nav-icon"></span>Sessions */}
              <img className="nav-icon" src="sessions.jpg"/>Sessions
            </Link>
          </li>
          {/* <li>
            <Link to="/profile" className="nav-item">
              <span className="nav-icon"></span>Profile
            </Link>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default NavBar;
