import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./AddSession.css";
import NavBar from "./UI/NavBar";
import Header from "./UI/Header";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const DynamicInputGroup = ({
  exercise,
  handleInputChange,
  index,
  exercisesList,
}) => {
  return (
    <div className="dynamic-input-group">
      <select
        className="dynamic-select"
        name="targetMuscle"
        value={exercise.targetMuscle}
        onChange={(e) => handleInputChange(index, e)}
      >
        <option value="">Select Target Muscle</option>
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
        name="exerciseId"
        value={exercise.exerciseId}
        onChange={(e) => handleInputChange(index, e)}
      >
        <option value="">Select Exercise</option>
        {exercisesList && exercisesList.length > 0 ? (
          exercisesList.map((ex) => (
            <option key={ex.exerciseId} value={ex.exerciseId}>
              {ex.exerciseName}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No exercises available
          </option>
        )}
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
    duration: "",
    date: "",
    exercises: [{ targetMuscle: "", exerciseId: "", weight: "" }],
  });
  const [exercisesLists, setExercisesLists] = useState({}); // Changed to object to store lists per exercise
  const [isLoading, setIsLoading] = useState(false);
  const { memberId } = useParams();
  const token = localStorage.getItem("authToken");

  // Fetch exercises when targetMuscle changes
  const getExercisesByMuscleGroup = async (muscleGroup) => {
    if (!muscleGroup) return [];

    try {
      const response = await fetch(
        `${REACT_APP_API_URL}/api/exercises/getExrecises/${muscleGroup}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exercises.");
      }

      const result = await response.json();
      console.log(result.data.exercises);
      return result.data.exercises || [];
    } catch (err) {
      console.error("Error fetching exercises:", err);
      return [];
    }
  };

  // Handle muscle group change and fetch exercises
  const handleMuscleGroupChange = async (index, e) => {
    const { value } = e.target;
    const newExercises = [...sessionData.exercises];
    newExercises[index].targetMuscle = value;
    newExercises[index].exerciseId = ""; // Reset exercise selection

    setSessionData((prevData) => ({
      ...prevData,
      exercises: newExercises,
    }));

    // Fetch exercises for the selected muscle group and store it for this specific exercise
    if (value) {
      const exercises = await getExercisesByMuscleGroup(value);
      setExercisesLists((prev) => ({
        ...prev,
        [index]: exercises,
      }));
    } else {
      setExercisesLists((prev) => ({
        ...prev,
        [index]: [],
      }));
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
        { targetMuscle: "", exerciseId: "", weight: "" },
      ],
    }));
  };

  const handleDynamicInputChange = (index, e) => {
    const { name, value } = e.target;

    // Special handling for targetMuscle changes
    if (name === "targetMuscle") {
      handleMuscleGroupChange(index, e);
      return;
    }

    const newExercises = [...sessionData.exercises];
    newExercises[index][name] = value;
    setSessionData((prevData) => ({
      ...prevData,
      exercises: newExercises,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const apiData = {
      memberId: parseInt(memberId),
      duration: parseInt(sessionData.duration),
      date: sessionData.date,
      exercises: sessionData.exercises.map((exercise) => ({
        exerciseId: exercise.exerciseId,
        weight: parseInt(exercise.weight),
      })),
    };

    try {
      const response = await fetch(
        `${REACT_APP_API_URL}/api/sessions/addSession`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save session");
      }

      const result = await response.json();
      console.log("Session saved successfully:", result);
      alert("Session saved successfully");

      setSessionData({
        duration: "",
        date: "",
        exercises: [{ targetMuscle: "", exerciseId: "", weight: "" }],
      });
    } catch (err) {
      console.error("Error saving session:", err);
      alert("Failed to save session: " + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="add-session-app-container">
        <NavBar />
        <div className="main-content">
          <Header />
          <div className="loading-message">Loading...</div>
        </div>
      </div>
    );
  }

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
                  exercisesList={exercisesLists[index] || []}
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
