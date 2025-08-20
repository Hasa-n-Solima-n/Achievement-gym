import React, { useState, useEffect } from "react";
import "./HomePost.css";
import Post from "./Post";
import NavBar from "./UI/NavBar";
import Header from "./UI/Header";
function HomePost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const dummyPosts = [
      {
        id: 1,
        author: "Khder Hidar",
        date: "16/4/2025",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      },
      {
        id: 2,
        author: "Khder Hidar",
        date: "16/4/2025",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      },
    ];
    setPosts(dummyPosts);
  }, []);

  return (
    <div className="app-container">
      <NavBar />

      {/* المحتوى الرئيسي */}
      <div className="main-content">
        <Header />

        {/* قسم البوستات */}
        <main className="posts-section">
          <div className="create-post-bar">
            <div className="avatar"></div>
            <input
              type="text"
              placeholder="Create Post"
              className="create-post-input"
            />
            <input
              type="file"
              accept="image/*"
              className="create-post-file-input"
              style={{ display: "none" }}
              id="create-post-image-input"
              onChange={(e) => {
                // You can handle the file change here if needed
              }}
            />
            <label
              htmlFor="create-post-image-input"
              className="create-post-image-label"
            >
              <span
                role="img"
                aria-label="Add Photo"
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  marginRight: "2px",
                  marginLeft: "8px",
                 
                  marginBottom: "8px",
                }}
              >
                📷
              </span>
            </label>
            <button className="create-post-button">
              <span role="img" aria-label="Create Post">
                &#9998;
              </span>
            </button>
          </div>

          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>

        {/* الفوتر */}
        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">B</div>
              <div className="social-icons">
                <a href="/src/Components/HomePost.js">
                  <span className="social-icon">X</span>
                </a>
                <a href="/src/Components/HomePost.js">
                  <span className="social-icon">O</span>
                </a>
                <a href="/src/Components/HomePost.js">
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

export default HomePost;
