import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const history = useHistory();
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleReEnterPasswordChange = (e) => {
    setReEnterPassword(e.target.value);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (newPassword !== reEnterPassword) {
      alert("The Passwords you entered doesn't match");
      return;
    }
    console.log(newPassword);
    alert("Your new password is saved");
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
          <h2 className="form-title">Reset Password</h2>

          <form onSubmit={handleSaveClick}>
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
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
