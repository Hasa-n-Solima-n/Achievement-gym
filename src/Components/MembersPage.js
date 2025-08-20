import React, { useState, useEffect } from "react";
import MemberCard from "./UI/MemberCard";
import "./MembersPage.css";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:9700/gymMembers");

        if (!response.ok) {
          throw new Error("Failed to fetch members data.");
        }

        const result = await response.json();
        // json-server returns the array directly for /gymMembers
        setMembers(result);
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
    <div className="members-page-container">
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
    </div>
  );
};

export default MembersPage;
