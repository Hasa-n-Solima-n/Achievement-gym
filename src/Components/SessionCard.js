// src/components/SessionCard.jsx
import React from "react";
import "./Sessions.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SessionCard = ({ session }) => {
  const isCompleted = session.status === "Complited";
  const statusClass = isCompleted ? "Completed" : "Pending";

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}h ${mins
      .toString()
      .padStart(2, "0")}min`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Link to={`/SessionData/${session.sessionId}`}>
      <div className="session-card">
        <div className="card-header">
          <div className="member-info">
            <span className="member-name">
              {session.memberName || "Hasan Soliman"}
            </span>
            <p className="target-muscles">{session.targetMuscles.join(", ")}</p>
          </div>
          <div className={`status-circle-${statusClass}`}></div>
        </div>
        <div className="card-body">
          <div className="detail-row">
            <span className="detail-label">Duration</span>
            <span className="detail-value">
              {formatDuration(session.duration)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date</span>
            <span className="detail-value">{formatDate(session.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SessionCard;
