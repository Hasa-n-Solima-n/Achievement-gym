// src/components/AddSession.jsx

import React, { useState } from "react";
import "./AddSession.css";
import NavBar from "./UI/NavBar";
import Header from "./UI/Header";

const DynamicInputGroup = ({
  exercise,
  handleInputChange,
  index,
  muscleGroups,
  exercisesList,
}) => {
  return (
    <div className="dynamic-input-group">
      <select
        className="dynamic-select"
        name="muscleGroup"
        value={exercise.muscleGroup}
        onChange={(e) => handleInputChange(index, e)}
      >
        <option value="">Select Muscle Group</option>
        <option value="Core">Core</option>
        <option value="Back">Back</option>
        <option value="Legs">Legs</option>
        <option value="Full Body">Full Body</option>
        <option value="Chest">Chest</option>
        <option value="Abs">Abs</option>
        <option value="Triceps">Triceps</option>
        <option value="Hamstrings">Hamstrings</option>
        <option value="Biceps">Biceps</option>
        <option value="Shoulders">Shoulders</option>
        <option value="Quadriceps">Quadriceps</option>
      </select>
      <select
        className="dynamic-select"
        name="exerciseName"
        value={exercise.exerciseName}
        onChange={(e) => handleInputChange(index, e)}
      >
        <option value="">Select Exercise</option>
        {/* في مشروع حقيقي، سيتم عرض الخيارات بناءً على exerciseList */}
        {exercisesList.map((ex, i) => (
          <option key={i} value={ex}>
            {ex}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="dynamic-input"
        name="weight"
        value={exercise.weight}
        onChange={(e) => handleInputChange(index, e)}
        placeholder="Weight (kg)"
      />
    </div>
  );
};

function AddSession() {
  const [sessionData, setSessionData] = useState({
    // memberName: "",
    duration: "",
    date: "",
    exercises: [{ muscleGroup: "", exerciseName: "", weight: "" }],
  });

  const getExercisesByMuscleGroup = (muscleGroup) => {
    switch (muscleGroup) {
      case "Core":
        return ["Plank", "Crunches", "Leg Raises"];
      case "Back":
        return ["Deadlift", "Pull-ups", "Rows"];
      case "Legs":
        return ["Squats", "Lunges", "Leg Press"];
      default:
        return [];
    }
  };

  const handleSessionDataChange = (e) => {
    const { name, value } = e.target;
    setSessionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddExercise = () => {
    setSessionData((prevData) => ({
      ...prevData,
      exercises: [
        ...prevData.exercises,
        { muscleGroup: "", exerciseName: "", weight: "" },
      ],
    }));
  };

  const handleDynamicInputChange = (index, e) => {
    const { name, value } = e.target;
    const newExercises = [...sessionData.exercises];
    newExercises[index][name] = value;
    setSessionData((prevData) => ({
      ...prevData,
      exercises: newExercises,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Session data:", sessionData);
    alert("Session saved successfully");
  };

  return (
    <div className="add-session-app-container">
      {/* الشريط الجانبي */}
      <NavBar />
      {/* المحتوى الرئيسي */}
      <div className="main-content">
        <Header />
        <main className="add-session-section">
          <h2 className="add-session-title">Add session</h2>
          <form onSubmit={handleSave} className="add-session-form">
            <div className="top-inputs">
              <div className="form-group">
                {/* <label className="form-label">Gym member Name</label>
                <input
                  type="text"
                  name="memberName"
                  value={sessionData.memberName}
                  onChange={handleSessionDataChange}
                  className="form-input"
                  required
                /> */}
              </div>
              <div className="form-group">
                <label className="form-label">Duration (min)</label>
                <input
                  type="number"
                  name="duration"
                  min={1}
                  max={120}
                  value={sessionData.duration}
                  onChange={handleSessionDataChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={sessionData.date}
                  onChange={handleSessionDataChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="dynamic-inputs-container">
              {sessionData.exercises.map((exercise, index) => (
                <DynamicInputGroup
                  key={index}
                  exercise={exercise}
                  handleInputChange={handleDynamicInputChange}
                  index={index}
                  exercisesList={getExercisesByMuscleGroup(
                    exercise.muscleGroup
                  )}
                />
              ))}
              <button
                type="button"
                className="add-item-button"
                onClick={handleAddExercise}
              >
                +
              </button>
            </div>

            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </main>

        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">B</div>
              <div className="social-icons">
                <a href="l">
                  <span className="social-icon">X</span>
                </a>
                <a href="l">
                  <span className="social-icon">O</span>
                </a>
                <a href="l">
                  <span className="social-icon">in</span>
                </a>
              </div>
            </div>
            <div className="footer-links-container">
              <div className="footer-links">
                <h5>Use cases</h5>
                <ul>
                  <li>UI design</li>
                  <li>UX design</li>
                  <li>Wireframing</li>
                  <li>Diagramming</li>
                  <li>Brainstorming</li>
                </ul>
              </div>
              <div className="footer-links">
                <h5>Explore</h5>
                <ul>
                  <li>Design</li>
                  <li>Prototyping</li>
                  <li>Development features</li>
                  <li>Design systems</li>
                  <li>Collaboration features</li>
                </ul>
              </div>
              <div className="footer-links">
                <h5>Resources</h5>
                <ul>
                  <li>Blog</li>
                  <li>Best practices</li>
                  <li>Tools</li>
                  <li>Color wheel</li>
                  <li>Support</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AddSession;
