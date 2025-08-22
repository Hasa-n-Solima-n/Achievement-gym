import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-placeholder"></div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/homePost" className="nav-item">
              <span className="nav-icon"></span>Home
            </Link>
          </li>
          <li>
            <Link to="/members" className="nav-item">
              <span className="nav-icon"></span>Members
            </Link>
          </li>
          {/* <li>
            <Link to="/addSession" className="nav-item">
              <span className="nav-icon"></span>Add Session
            </Link>
          </li> */}
          <li>
            <Link to="/sessions" className="nav-item">
              <span className="nav-icon"></span>Sessions
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
