import React, { useState } from "react";
//import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "./Forgot.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const history = useHistory();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNextClick = async(e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Account Type:", accountType);
    
    const response = await fetch("http://localhost:7900/api/users/forgetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, accountType }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Response:", data.success);
      history.push("/Reset");
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-image-section">
        <img
          src="path/to/your/image.jpg"
          alt="Workout"
          className="reset-password-hero-image"
        />
      </div>

      <div className="reset-password-form-section">
        <div className="header-button">
          <button
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
            className="bake-button"
          >
            Back
          </button>
        </div>

        <div className="form-content">
          <h2 className="form-title">Forgot Password?</h2>
          <p className="form-subtitle">
            Enter your email address associated with your account
          </p>

          <form onSubmit={handleNextClick}>
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Hello@gmail.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="accountType" className="input-label">
                Account Type
              </label>
              <select
                id="accountType"
                className="form-input"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="">account type</option>
                <option value="GymMember">Gym Member</option>
                <option value="Coach">Coach</option>
              </select>
            </div>

            <button type="submit" className="next-button">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
