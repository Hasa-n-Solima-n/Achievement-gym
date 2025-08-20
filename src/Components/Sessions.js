// src/components/Sessions.jsx
import React, { useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import "./Sessions.css";
import Header from "./UI/Header";
import NavBar from "./UI/NavBar";

const dummyData = {
  success: true,
  message: "sessions retrieved successfully",
  data: {
    sessions: [
      {
        sessionId: 6,
        duration: 100,
        status: "Pending",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Triceps", "Core"],
      },
      {
        sessionId: 6,
        duration: 100,
        status: "Pending",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Triceps", "Core"],
      },
      {
        sessionId: 6,
        duration: 100,
        status: "Pending",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Triceps", "Core"],
      },
      {
        sessionId: 6,
        duration: 100,
        status: "Pending",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Triceps", "Core"],
      },
      {
        sessionId: 7,
        duration: 100,
        status: "Pending",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Shoulders", "Triceps", "Core", "Back"],
      },
      {
        sessionId: 2,
        duration: 100,
        status: "Pending",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Triceps", "Core"],
      },
      {
        sessionId: 4,
        duration: 100,
        status: "Completed",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Triceps", "Core"],
      },
      {
        sessionId: 3,
        duration: 100,
        status: "Completed",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Core", "Triceps"],
      },
      {
        sessionId: 5,
        duration: 100,
        status: "Pending",
        date: "2025-05-04T21:00:00.000Z",
        memberName: "Ali",
        memberEmail: "ali@gmail.com",
        targetMuscles: ["Triceps", "Core"],
      },
    ],
  },
};

function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // In a real app, this would be a fetch call to your API
    setSessions(dummyData.data.sessions);
  }, []);

  const column1 = sessions.filter((_, index) => index % 2 === 0);
  const column2 = sessions.filter((_, index) => index % 2 !== 0);

  return (
    <div className="app-container">
      <NavBar />

      <div className="main-content">
        <Header />

        <main className="sessions-main-content">
          <div className="sessions-content">
            <div className="sessions-column">
              {column1.map((session) => (
                <SessionCard key={session.sessionId} session={session} />
              ))}
            </div>
            <div className="sessions-column">
              {column2.map((session) => (
                <SessionCard key={session.sessionId} session={session} />
              ))}
            </div>
          </div>
        </main>

        {/* Footer Component */}
        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">B</div>
              <div className="social-icons">
                <a href="#">
                  <span className="social-icon">X</span>
                </a>
                <a href="#">
                  <span className="social-icon">O</span>
                </a>
                <a href="#">
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

export default Sessions;
