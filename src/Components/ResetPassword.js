import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleReEnterPasswordChange = (e) => {
    setReEnterPassword(e.target.value);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    
    // التحقق من تطابق كلمات المرور
    if (newPassword !== reEnterPassword) {
      setError("The Passwords you entered doesn't match");
      return;
    }

    // التحقق من وجود التوكن
    if (!token.trim()) {
      setError("Please enter the token from your email");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:7900/api/users/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
          token: token
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Password reset successful:", data);
        alert("Your new password is saved successfully!");
        history.push("/login");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Reset password failed:", err.message);
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-image-section">
        <img
          src="http://localhost:3000/photo_2025-08-01_16-49-36.jpg"
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
          <h2 className="form-title">Reset Password</h2>

          <form onSubmit={handleSaveClick}>
            <div className="input-group">
              <label htmlFor="token" className="input-label">
                Token
              </label>
              <input
                type="text"
                id="token"
                className="form-input"
                placeholder="Enter the token from your email"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="new-password" className="input-label">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="form-input"
                placeholder="*******"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="re-enter-password" className="input-label">
                Re-enter Password
              </label>
              <input
                type="password"
                id="re-enter-password"
                className="form-input"
                placeholder="*******"
                value={reEnterPassword}
                onChange={handleReEnterPasswordChange}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="save-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
