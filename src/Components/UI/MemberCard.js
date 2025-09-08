import React from "react";
import { Link } from "react-router-dom";
import "../MembersPage.css";
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const REACT_APP_MY_URL = process.env.REACT_APP_MY_URL;
const MemberCard = ({ member }) => {
  const { memberId, firstName, lastName, imageUrl } = member;

  // const getImageUrl = (path) => {
  //   if (!path) return `${REACT_APP_API_URL}/uploads/avatar.jpg`;
  //   return path;
  // };

  // const fullImageUrl = getImageUrl(imageUrl);
  const fullName = `${firstName} ${lastName}`;
const getImageUrl = (path) => {
  if (!path) {
    // صورة افتراضية لو مافي صورة
    return `${REACT_APP_MY_URL}/avatar.jpg`;
  }
  if (path.startsWith("http")) {
    // لو الرابط Cloudinary (أو أي رابط خارجي) رجّعه كما هو
    return path;
  }
  return `${REACT_APP_API_URL}/${path}`;
};
  return (
    <Link to={`/profile/${memberId}`} className="member-card-link">
      <div className="member-card">
        <div className="member-image-container">
          <img
            src={getImageUrl(imageUrl)}
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
