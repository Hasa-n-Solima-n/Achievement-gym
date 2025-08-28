
import React, { useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import "./Sessions.css";
import Header from "./UI/Header";
import NavBar from "./UI/NavBar";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token=localStorage.getItem("authToken");
    const fetchSessions = async () => {
      try {
       
        const response = await fetch(
          "http://localhost:7900/api/sessions/getAllSessions",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch sessions data.");
        }

        const result = await response.json();
        const sessionsData = result.data.sessions || [];
        console.log(sessionsData);
        setSessions(sessionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (isLoading) {
    return (
      <div className="app-container">
        <NavBar />
        <div className="main-content">
          <Header />
          <div className="loading-message">Loading sessions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <NavBar />
        <div className="main-content">
          <Header />
          <div className="error-message">Error: {error}</div>
        </div>
      </div>
    );
  }

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
}

export default Sessions;
