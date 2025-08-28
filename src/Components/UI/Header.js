const Header = () => {
  return (
    <header className="main-header">
      <div className="header-tabs">
        <h1 className="gym-title">Achievement Gym</h1>
      </div>
      <div className="header-actions">
        <button className="header-icon-button">
          <span role="img" aria-label="Create Post">
            &#9998;
          </span>
        </button>
        {/* <div className="header-avatar"></div> */}
        <img className="header-avatar" src="http://localhost:3000/logo.jpg" />
      </div>
    </header>
  );
};

export default Header;
