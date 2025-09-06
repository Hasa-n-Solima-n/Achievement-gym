import React, { useState, useEffect } from "react";
import MemberCard from "./UI/MemberCard";
import "./MembersPage.css";
import "./HomePost.css";
import NavBar from "./UI/NavBar";
import Header from "./UI/Header";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `${REACT_APP_API_URL}/api/profiles/getMyMembers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
