import React from "react";
import { Link } from "react-router-dom";
import "../MembersPage.css";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const MemberCard = ({ member }) => {
  const { memberId, firstName, lastName, imageUrl } = member;

  const getImageUrl = (path) => {
    if (!path) return "uploads/avatar.jpg";
    // if (/^https?:\/\//i.test(path)) return path;
    const baseStaticUrl = `${REACT_APP_API_URL}/`; // adjust if your static base differs
    return `${baseStaticUrl}${path.replace(/\\/g, "/")}`;
  };

  const fullImageUrl = getImageUrl(imageUrl);
  const fullName = `${firstName} ${lastName}`;
  
  return (
    <Link to={`/profile/${memberId}`} className="member-card-link">
      <div className="member-card">
        <div className="member-image-container">
          <img
            src={fullImageUrl}
            alt={fullName}
            className="member-image"
            onError={(e) => {
              // Fallback to a placeholder image on error
              e.target.onerror = null; // prevents infinite loop
              e.target.src = `${REACT_APP_API_URL}/uploads/avatar.jpg`;
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
