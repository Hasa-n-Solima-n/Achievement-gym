import React from "react";
import "./HomePost.css";

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <div className="avatar"></div>
          <div className="meta">
            <span className="username">{post.author}</span>
            <span className="date">{post.date}</span>
          </div>
        </div>
        <div className="post-actions">
          <button className="action-button">
            <span role="img" aria-label="Edit">
              &#9998;
            </span>
          </button>
          <button className="action-button">
            <span role="img" aria-label="Delete">
              &#128465;
            </span>
          </button>
        </div>
      </div>
      <div className="post-body">
        <p className="post-text">{post.content}</p>
        <div className="post-image-placeholder"></div>
      </div>
    </div>
  );
};

export default Post;
