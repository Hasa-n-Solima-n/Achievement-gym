import React, { useState } from "react";
//import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "./Forgot.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
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
