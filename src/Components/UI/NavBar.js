import React from "react";
import { Link } from "react-router-dom";
const REACT_APP_MY_URL = process.env.REACT_APP_MY_URL;
const logo = REACT_APP_MY_URL + "/logo.jpg";
const homeIcon = REACT_APP_MY_URL + "/home.jpg";
const membersIcon = REACT_APP_MY_URL + "/members.jpg";
const profileIcon = REACT_APP_MY_URL + "/profile.jpg";
const sessionsIcon = REACT_APP_MY_URL + "/sessions.jpg";
const NavBar = () => {
  const accountType = localStorage.getItem("accountType");
  const memberId = localStorage.getItem("memberId");
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        {/* <div className="logo-placeholder"></div> */}
        <img className="logo-placeholder" src={logo} />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/homePost" className="nav-item">
              {/* <span className="nav-icon"></span>Home */}
              <img className="nav-icon" src={homeIcon} />
              Home
            </Link>
          </li>
          {accountType === "Coach" ? (
            <li>
              <Link to="/members" className="nav-item">
                {/* <span className="nav-icon"></span>Members */}
                <img className="nav-icon" src={membersIcon} />
                Members
              </Link>
            </li>
          ) : accountType === "GymMember" && memberId ? (
            <li>
              <Link to={`/profile/${memberId}`} className="nav-item">
                {/* <span className="nav-icon"></span>Profile */}
                <img className="nav-icon" src={profileIcon} />
                Profile
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
              <img
                className="nav-icon"
                src={sessionsIcon}
              />
              Sessions
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
