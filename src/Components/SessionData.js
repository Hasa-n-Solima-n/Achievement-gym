import React, { useState, useEffect } from "react";
import "./SessionData.css";

const SessionData = ({ memberName }) => {
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("https://your-api-url.com/session-data");

        if (!response.ok) {
          throw new Error("Failed to fetch session data.");
        }

        const result = await response.json();
        setSessionData(result.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessionData();
  }, []); 

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

  return (
    <div className="session-card">
      <div className="card-header">
        <h3 className="member-name">{memberName}</h3>
        <span className={`session-status ${status.toLowerCase()}`}>
          {status}
        </span>
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
                <div className="table-cell">{exercise.exerciseName}</div>
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
  );
};

export default SessionData;
