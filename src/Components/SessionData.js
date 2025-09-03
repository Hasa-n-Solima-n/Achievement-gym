import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./SessionData.css";
import Header from "./UI/Header";
import NavBar from "./UI/NavBar";

const SessionData = ({ memberName }) => {
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { sessionId } = useParams();

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `http://localhost:7900/api/sessions/getSession/${sessionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        console.log(response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch session data.");
        }

        const result = await response.json();
        setSessionData(result.data);
        console.log(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  if (isLoading) {
    return <div className="loading-message">Loading session data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!sessionData) {
    return <div className="no-data-message">No session data available.</div>;
  }

  const { duration, date, status, exercises } = sessionData;

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Function to format the duration (assuming it's in minutes)
  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  };

  // Function to toggle session status
  const toggleSessionStatus = async () => {
    if (isUpdating || !sessionData) return;

    setIsUpdating(true);
    try {
      const token = localStorage.getItem("authToken");
      const newStatus =
        sessionData.status === "Panding" ? "Complited" : "Panding";

      const response = await fetch(
        "http://localhost:7900/api/sessions/updateSessionStatus",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            memberId: sessionData.memberId,
            sessionId: parseInt(sessionId),
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update session status");
      }

      // Update local state
      setSessionData((prev) => ({
        ...prev,
        status: newStatus,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
      console.log(sessionData);
    }
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content">
        <Header />
        <main className="sessions-main-content">
          <div className="sessions-content">
            <div className="session-card">
              <div className="card-header">
                <h3 className="member-name">
                  {sessionData.memberName || memberName || ""}
                </h3>
                <button
                  className={`session-status-button ${status.toLowerCase()}`}
                  onClick={toggleSessionStatus}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : status}
                </button>
              </div>
              <div className="card-details">
                <div className="detail-item">
                  <p className="detail-label">Duration</p>
                  <p className="detail-value">{formatDuration(duration)}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Date</p>
                  <p className="detail-value">{formatDate(date)}</p>
                </div>
              </div>
              <div className="card-table">
                <div className="table-header">
                  <div className="table-column">Exercise Name</div>
                  <div className="table-column">Weight (kg)</div>
                </div>
                <div className="table-body">
                  {exercises.length > 0 ? (
                    exercises.map((exercise) => (
                      <div className="table-row" key={exercise.exerciseId}>
                        <div className="table-cell">
                          {exercise.exerciseName}
                        </div>
                        <div className="table-cell">{exercise.weight}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-exercises">
                      No exercises listed for this session.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">B</div>
              <div className="social-icons">
                <a href="/">
                  <span className="social-icon">X</span>
                </a>
                <a href="/">
                  <span className="social-icon">O</span>
                </a>
                <a href="/">
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
};

export default SessionData;
