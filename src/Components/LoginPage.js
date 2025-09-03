import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("gymMember");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await fetch("http://localhost:7900/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, accountType }),
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
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("accountType", data.data.accountType);
      localStorage.setItem("memberId", data.data.tokenInfo.memberId);
      localStorage.setItem("coachId", data.data.tokenInfo.coachId);
      localStorage.setItem("email", data.data.tokenInfo.email);

      console.log("Login Successful! Token stored:", data.token);
      console.log("Account Type:", accountType);
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
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password-input"
              placeholder="*******"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{ paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontSize: "1rem",
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <label htmlFor="accountType-input" className="input-label">
            Account Type
          </label>
          <select
            id="accountType-input"
            className="login-input"
            defaultValue="GymMember"
            onChange={(e) => setAccountType(e.target.value)}
            value={accountType}
            required
          >
            <option value="">account type</option>
            <option value="GymMember">Gym Member</option>
            <option value="Coach">Coach</option>
          </select>

          {error && <div className="error-messageL">{`${error}...!`}</div>}

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
