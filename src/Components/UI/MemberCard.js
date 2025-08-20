// src/components/MemberCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../MembersPage.css";

const MemberCard = ({ member }) => {
  const { memberId, firstName, lastName, imageUrl } = member;

  const getImageUrl = (path) => {
    if (!path) return "https://placehold.co/100x100/A0A0A0/ffffff?text=User";
    if (/^https?:\/\//i.test(path)) return path;
    const baseStaticUrl = "http://localhost:9700"; // adjust if your static base differs
    return `${baseStaticUrl}${path.replace(/\\/g, "/")}`;
  };

  const fullImageUrl = getImageUrl(imageUrl);
  const fullName = `${firstName} ${lastName}`;

  return (
    <Link to={`/member/${memberId}`} className="member-card-link">
      <div className="member-card">
        <div className="member-image-container">
          <img
            src={fullImageUrl}
            alt={fullName}
            className="member-image"
            onError={(e) => {
              // Fallback to a placeholder image on error
              e.target.onerror = null; // prevents infinite loop
              e.target.src =
                "https://placehold.co/100x100/A0A0A0/ffffff?text=User";
            }}
          />
        </div>
        <div className="member-info">
          <h4 className="member-name">{fullName}</h4>
        </div>
      </div>
    </Link>
  );
};

export default MemberCard;
