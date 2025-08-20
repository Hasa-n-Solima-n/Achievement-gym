import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("LoginPage component mounted");
  }, []);

  const validateForm = () => {
    if (!email.includes("@")) {
      setError("Email must contain @");
      return false;
    }

    if (password.trim().length < 7) {
      setError("Password must be 7 characters or more");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // ** Code for real API integration **
      const response = await fetch("https://your-api-url.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Login failed. Please check your credentials."
        );
      }

      // Extract data from the response (assuming the response contains a token)
      const data = await response.json();

      // Store the token in the browser's local storage
      localStorage.setItem("authToken", data.token);

      console.log("Login Successful! Token stored:", data.token);
      // Redirect to the home page or sessions page
      navigate.push("/sessions");
    } catch (err) {
      console.error("Login Failed:", err.message);
      setError(err.message);
    } finally {
      // Stop the loading state regardless of the outcome
      setIsSubmitting(false);
    }
  };

  const handleSignUpClick = () => {
    navigate.push("/Create");
  };

  const handLogInClick = () => {
    navigate.push("/login");
  };

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
        </div>
        <form className="login-form" onSubmit={handleFormSubmit}>
          <label htmlFor="email-input" className="input-label">
            Email
          </label>
          <input
            type="email"
            id="email-input"
            placeholder="example@gmail.com"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="password-input" className="input-label">
            Password
          </label>
          <input
            type="password"
            id="password-input"
            placeholder="*******"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <div className="error-message">{`${error}...!`}</div>}

          <Link to="/Forgot" className="forgot-password">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="start-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Starting..." : "Start"}
          </button>
        </form>
        <div className="login-footer">
          <button
            className="signup-button"
            type="button"
            onClick={handleSignUpClick}
          >
            Create a new account
          </button>
          <button
            className="login-button"
            type="button"
            onClick={handLogInClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
