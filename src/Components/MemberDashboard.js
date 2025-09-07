// src/components/MemberDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import "./MemberDashboard.css";
import "./HomePost.css";
import NavBar from "./UI/NavBar";
import Header from "./UI/Header";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const MemberDashboard = () => {
  const [memberInfo, setMemberInfo] = useState(null);
  const [coachInfo, setCoachInfo] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");
  const { memberId } = useParams();
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  // Function to fetch member data and exercises from the API
  const fetchMemberData = async () => {
    try {
      const memberResponse = await fetch(
        `${REACT_APP_API_URL}/api/profiles/getMemberInfo/${memberId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const exercisesResponse = await fetch(
        `${REACT_APP_API_URL}/api/exercises/getProgressExercises/${memberId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!memberResponse.ok || !exercisesResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const memberResult = await memberResponse.json();
      const exercisesResult = await exercisesResponse.json();

      setMemberInfo(memberResult.data.memberInfo);
      setCoachInfo(memberResult.data.coachInfo);
      console.log(memberResult.data.memberInfo.coachInfo);
      setExercises(exercisesResult.data.exercises || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProgressData = async (exerciseId) => {
    setIsLoading(true);
    try {
      console.log(memberId, exerciseId);
      // Fetch progress data from the API based on the selected exerciseId
      const progressResponse = await fetch(
        `${REACT_APP_API_URL}/api/profiles/getProgressData/${memberId}/${exerciseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!progressResponse.ok) {
        throw new Error("Failed to fetch progress data.");
      }
      const progressResult = await progressResponse.json();
      console.log(progressResult.data.progress);
      setProgressData(progressResult.data.progress);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  const handleExerciseChange = (event) => {
    const exerciseId = event.target.value;
    setSelectedExercise(exerciseId);
    if (exerciseId) {
      fetchProgressData(exerciseId);
    } else {
      setProgressData([]);
    }
  };

  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const getImageUrl = (path) => {
    if (!path) return `${REACT_APP_API_URL}/uploads/avatar.jpg`;
    return path;
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content">
        <Header />
        <div className="dashboard-container">
          <div className="left-panel">
            <h2 className="panel-title">Member Info</h2>
            <div className="member-info-card">
              <div className="member-image-container-dash">
                <img
                  src={getImageUrl(memberInfo?.imageUrl)}
                  alt="Member"
                  className="member-image"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/100x100/A0A0A0/ffffff?text=User")
                  }
                />
              </div>
              <h3 className="member-name">
                {memberInfo?.firstName} {memberInfo?.lastName}
              </h3>
              <p className="member-bio">{memberInfo?.bio}</p>
              <div className="contact-info">
                <p>
                  <i className="fas fa-phone"></i> {memberInfo?.phoneNumber}
                </p>
                <p>
                  <i className="fas fa-envelope"></i> {memberInfo?.email}
                </p>
              </div>
              <div className="coach-info">
                <h4 className="coach-name">
                  <i className="fas fa-user-tie"></i> {coachInfo?.firstName}{" "}
                  {coachInfo?.lastName}
                </h4>
                <p className="sport-type">
                  <i className="fas fa-dumbbell"></i> {memberInfo?.sportType}
                </p>
              </div>
              {localStorage.getItem("accountType") === "Coach" && (
                <div className="add-session-btn-container">
                  <Link
                    to={`/addSession/${memberInfo?.memberId}`}
                    className="add-session-btn"
                  >
                    Add Session
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="right-panel">
            <h2 className="panel-title">Progress Chart</h2>
            <div className="select-container">
              <select
                className="exercise-select"
                value={selectedExercise}
                onChange={handleExerciseChange}
              >
                <option value="">Select an exercise</option>
                {exercises.map((exercise) => (
                  <option key={exercise.exerciseId} value={exercise.exerciseId}>
                    {exercise.exerciseName}
                  </option>
                ))}
              </select>
            </div>

            <div className="chart-container">
              {progressData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={progressData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey="date"
                      stroke="#999"
                      tick={{ fill: "#999" }}
                    />
                    <YAxis stroke="#999" tick={{ fill: "#999" }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="date"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-data-message">
                  Select an exercise to view the progress chart.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
