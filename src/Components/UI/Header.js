const Header = () => {
    return (
      <header className="main-header">
        <div className="header-tabs"></div>
        <div className="header-actions">
          <button className="header-icon-button">
            <span role="img" aria-label="Create Post">
              &#9998;
            </span>
          </button>
          <div className="header-avatar"></div>
        </div>
      </header>
    );
};
 
export default Header;
