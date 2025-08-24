import React, { useState, useEffect } from "react";
import MemberCard from "./UI/MemberCard";
import "./MembersPage.css";
import "./HomePost.css";
import NavBar from "./UI/NavBar";
import Header from "./UI/Header";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          "http://localhost:7900/api/profiles/getMyMembers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2FjaElkIjoxLCJlbWFpbCI6Im1vaGFtbWVkbW8xaGFtbTJlZDQ5MzE4ODVAZ21haWwuY29tIiwic3BvcnRUeXBlIjoiQ2FsaXN0aGVuaWNzIiwiYWNjb3VudFR5cGUiOiJDb2FjaCIsImlhdCI6MTc1NjA0MTA0MX0.5r6JLdvVuzGF5FoRfYDiEBmNqNFiGdJsAZS8U2WjuLE`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch members data.");
        }

        const result = await response.json();
        const membersData = result.data.gymMembers || [];
        setMembers(membersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (isLoading) {
    return <div className="loading-message">Loading members...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content">
        <Header />
        <main className="members-page-container">
          <h1 className="members-title">Members</h1>
          <div className="members-list">
            {members.length > 0 ? (
              members.map((member) => (
                <MemberCard key={member.memberId} member={member} />
              ))
            ) : (
              <div className="no-members-message">No members found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MembersPage;
