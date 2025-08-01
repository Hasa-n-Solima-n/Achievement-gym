import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginPage.css";
//import { useState } from "react";

const LoginPage = () => {
  //const [password, setPassword] = useState("");
  //const [email,setEmail]=useState();

  //const passwordHandeler =()=>{

  //}
  return (
    <div className="login-container">
      <div className="login-image-section">
        <img
          src="photo_2025-08-01_16-49-36.jpg"
          alt="Man lifting weights in a gym"
          className="login-hero-image"
        />
      </div>
      <div className="login-form-section">
        <div className="login-header">
          <h2>Login</h2>
          <button className="bake-button">Back</button>
        </div>
        <form className="login-form">
          <label htmlFor="email-input" className="input-label">
            Email
          </label>
          <input
            type="email"
            id="email-input"
            placeholder="Hello@gmail.com"
            className="login-input"
          />

          <label htmlFor="password-input" className="input-label">
            Password
          </label>
          <input
            type="password"
            id="password-input"
            placeholder="*******"
            className="login-input"
          />
          <Link to="./Forgot" className="forgot-password">
            Forgot Password
          </Link>
          <button type="submit" className="start-button">
            Start
          </button>
        </form>
        <div className="login-footer">
          <button className="signup-button">Sign Up</button>
          <button className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
