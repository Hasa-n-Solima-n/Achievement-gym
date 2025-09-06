// src/components/CreateAccount.jsx

import React, { useState, useEffect } from "react";
import "./CreateAccount.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const AccountInfoStep = ({
  nextStep,
  formData,
  handleChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => (
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
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            autoComplete="new-password"
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
      </div>

      <div className="input-group">
        <label htmlFor="confirmPassword" className="input-label">
          Confirm Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="********"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
            style={{ paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
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
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <button type="submit" className="next-button">
        Next
      </button>
    </form>
  </div>
);

const ProfileInfoStep2 = ({
  prevStep,
  handleSubmit,
  formData,
  handleChange,
  submitting,
  submitError,
}) => {
  const [coaches, setCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(false);
  const [coachesError, setCoachesError] = useState("");

  useEffect(() => {
    let isCancelled = false;
    const fetchCoaches = async () => {
      if (formData.accountType !== "GymMember") return;
      if (!formData.sportType) return;
      setLoadingCoaches(true);
      setCoachesError("");
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}/api/profiles/getAllCoaches/${encodeURIComponent(
            formData.sportType
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        if (!response.ok) throw new Error("Failed to load coaches");
        const data = await response.json();
        const list = data && data.data;
        const normalized = Array.isArray(list)
          ? list.map((c, idx) => {
              // if (typeof c === "string") return { id: c, name: c };
              const id = c.coachId;
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
  }, [formData.accountType, formData.sportType]);

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
            {/* <option value="">Select a sport</option> */}
            <option value="Powerlifting">Power Lifting</option>
            <option value="Body building">Body building</option>
            <option value="Calisthenics">Calisthenics</option>
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
              name="accountType"
              value="Coach"
              checked={formData.accountType === "Coach"}
              onChange={handleChange}
            />
            <span className="radio-text">Coach</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="accountType"
              value="GymMember"
              checked={formData.accountType === "GymMember"}
              onChange={handleChange}
            />
            <span className="radio-text">Gym Member</span>
          </label>
        </div>
        {formData.accountType === "GymMember" && (
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
              <span
                style={{ color: "#e74c3c", display: "block", marginTop: 6 }}
              >
                {coachesError}
              </span>
            )}
          </div>
        )}

        {submitError && (
          <div className="input-group" role="alert" aria-live="polite">
            <span style={{ color: "#e74c3c", display: "block" }}>
              {submitError}
            </span>
          </div>
        )}
        <button type="submit" className="start-button" disabled={submitting}>
          {submitting ? "Creating..." : "Start"}
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
    accountType: "Coach",
    coachId: "", // Keep as empty string
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!formData.sportType) {
      setSubmitError("Please select a sport type");
      return;
    }
    if (formData.accountType === "GymMember" && !formData.coachId) {
      setSubmitError("Please select a coach");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("accountType", formData.accountType);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("phoneNumber", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("sportType", formData.sportType);
    if (formData.image) {
      formDataToSend.append("imageUrl", formData.image);
    }
    if (formData.accountType === "GymMember") {
      formDataToSend.append("coachId", parseInt(formData.coachId) || 0);
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${REACT_APP_API_URL}/api/users/signup`, {
        method: "POST",
        body: formDataToSend, // Remove Content-Type header for FormData
      });

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        const apiMessage =
          data && (data.message || data.error || data.errors?.[0]?.msg);
        throw new Error(apiMessage || `Signup failed (${response.status})`);
      }
      navigate.push("/login");
      alert("Account created successfully");
      setStep(1);
      setFormData((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        sportType: "",
        bio: "",
        image: null,
        accountType: "Coach",
        coachId: "",
      }));
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
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
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        ) : (
          <ProfileInfoStep2
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            submitting={submitting}
            submitError={submitError}
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
