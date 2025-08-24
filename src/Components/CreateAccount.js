// src/components/CreateAccount.jsx

import React, { useState, useEffect } from "react";
import "./CreateAccount.css"; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const COACHES_ENDPOINT = `localhost:7900/api/profiles/getAllCoaches/`;

const AccountInfoStep = ({ nextStep, formData, handleChange }) => (
  <div className="form-content">
    <h2 className="form-title">Create Account</h2>
    <p className="form-subtitle">First, tell us about yourself.</p>

    <form className="account-info-form" onSubmit={nextStep}>
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="firstName" className="input-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-input"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName" className="input-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-input"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          placeholder="Hello@gmail.com"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="phone" className="input-label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-input"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="confirmPassword" className="input-label">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form-input"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="********"
          required
        />
      </div>

      <button type="submit" className="next-button">
        Next
      </button>
    </form>
  </div>
);

const ProfileInfoStep = ({
  prevStep,
  handleSubmit,
  formData,
  handleChange,
}) => {
  const [coaches, setCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(false);
  const [coachesError, setCoachesError] = useState("");
  
  useEffect(() => {
    let isCancelled = false;
    const fetchCoaches = async () => {
      if (formData.userType !== "gymMember") return;
      setLoadingCoaches(true);
      setCoachesError("");
      try {
        const response = await fetch(`${COACHES_ENDPOINT}`);
        if (!response.ok) throw new Error("Failed to load coaches");
        const data = await response.json();
        const list =
          (data && data.data && (data.data.coaches || data.data)) ||
          data.coaches ||
          data ||
          [];
        const normalized = Array.isArray(list)
          ? list.map((c, idx) => {
              if (typeof c === "string") return { id: c, name: c };
              const id = c.id || c._id || c.userId || idx;
              const name =
                c.name ||
                [c.firstName, c.lastName].filter(Boolean).join(" ") ||
                c.email ||
                String(id);
              return { id, name };
            })
          : [];
        if (!isCancelled) setCoaches(normalized);
      } catch (err) {
        if (!isCancelled) setCoachesError("Could not load coaches");
      } finally {
        if (!isCancelled) setLoadingCoaches(false);
      }
    };
    fetchCoaches();
    return () => {
      isCancelled = true;
    };
  }, [formData.userType]);

  return (
    <div className="form-content">
      <div className="header-button">
        <button className="bake-button" onClick={prevStep}>
          Back
        </button>
      </div>
      <h2 className="form-title">Create Account</h2>
      <p className="form-subtitle">Profile Information</p>

      <form className="profile-info-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="sportType" className="input-label">
            Sport Type
          </label>
          <select
            id="sportType"
            name="sportType"
            className="form-input"
            value={formData.sportType}
            onChange={handleChange}
            required
          >
            <option value="">Select a sport</option>
            <option value="fitness">Fitness</option>
            <option value="running">Running</option>
            <option value="swimming">Swimming</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="bio" className="input-label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            className="form-input textarea-input"
            value={formData.bio}
            onChange={handleChange}
            maxLength="500"
            placeholder="Tell us about yourself..."
          ></textarea>
          <span className="char-count">{formData.bio.length}/500</span>
        </div>
        <div className="input-group">
          <label htmlFor="image" className="input-label">
            Image
          </label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="image"
              name="image"
              className="file-input"
              onChange={handleChange}
            />
            <label htmlFor="image" className="file-input-label">
              <span>Choose File</span>
              <span className="upload-icon">&#8682;</span>
            </label>
          </div>
        </div>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="coach"
              checked={formData.userType === "coach"}
              onChange={handleChange}
            />
            <span className="radio-text">Coach</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="gymMember"
              checked={formData.userType === "gymMember"}
              onChange={handleChange}
            />
            <span className="radio-text">Gym Member</span>
          </label>
        </div>
        {formData.userType === "gymMember" && (
          <div className="input-group">
            <label htmlFor="coachId" className="input-label">
              Coach
            </label>
            <select
              id="coachId"
              name="coachId"
              className="form-input"
              value={formData.coachId || ""}
              onChange={handleChange}
              required
              disabled={loadingCoaches}
            >
              <option value="">
                {loadingCoaches ? "Loading coaches..." : "Select a coach"}
              </option>
              {!loadingCoaches &&
                coaches.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            {coachesError && (
              <span className="char-count" style={{ color: "#e74c3c" }}>
                {coachesError}
              </span>
            )}
          </div>
        )}

        <button type="submit" className="start-button">
          Start
        </button>
      </form>
    </div>
  );
};

function CreateAccount() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    sportType: "",
    bio: "",
    image: null,
    userType: "gymMember",
    coachId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("You have entered two different passwords");
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    //to bu hammodi backend legend
    console.log("All form data", formData);
    alert("Account created successfully");
  };

  const navigate = useHistory();
  const handleBackClick = () => {
    navigate.push("/login");
  };

  return (
    <div className="create-account-container">
      <div className="create-account-image-section">
        <img
          src="photo_2025-08-01_16-49-36.jpg"
          alt="Workout"
          className="create-account-hero-image"
        />
      </div>

      <div className="create-account-form-section">
        {step === 1 ? (
          <AccountInfoStep
            nextStep={nextStep}
            formData={formData}
            handleChange={handleChange}
          />
        ) : (
          <ProfileInfoStep
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        <div className="login-footer">
          <button className="signup-button">Sign Up</button>
          <button className="login-button" onClick={handleBackClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
