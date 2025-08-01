// src/components/CreateAccount.jsx

import React, { useState } from "react";
import "./CreateAccount.css"; // استيراد ملف CSS

// المكون الأول: معلومات الحساب
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

// المكون الثاني: معلومات الملف الشخصي
const ProfileInfoStep = ({
  prevStep,
  handleSubmit,
  formData,
  handleChange,
}) => (
  <div className="form-content">
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
          {/* يمكن إضافة المزيد من الخيارات هنا */}
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
            <span className="upload-icon">
              {/* يمكن استبدال هذا بأيقونة SVG */}
              &#8682;
            </span>
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
      <button type="submit" className="start-button">
        Start
      </button>
      BACK
      <button type="button" onClick={prevStep}>
        Back
      </button>
    </form>
  </div>
);

// المكون الرئيسي الذي يدمج كل شيء
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
    userType: "gymMember", // قيمة افتراضية
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
      alert("كلمة المرور وتأكيدها غير متطابقين!");
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يتم إرسال formData إلى الواجهة الخلفية
    console.log("بيانات الحساب الكاملة:", formData);
    alert("تم إنشاء الحساب بنجاح!");
  };

  return (
    <div className="create-account-container">
      {/* القسم الأيسر - الصورة */}
      <div className="create-account-image-section">
        <img
          src="photo_2025-08-01_16-49-36.jpg"
          alt="Workout"
          className="create-account-hero-image"
        />
      </div>

      {/* القسم الأيمن - النموذج */}
      <div className="create-account-form-section">
        <div className="header-button">
          <button className="bake-button">Bake</button>
        </div>

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
          <button className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
