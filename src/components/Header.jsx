import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.scss";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => handleNavigation("/")}>
        <div className="logo-icon">PB</div>
        <span className="logo-text">PlayBit</span>
      </div>

      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={isMenuOpen ? "line open" : "line"}></span>
        <span className={isMenuOpen ? "line open" : "line"}></span>
        <span className={isMenuOpen ? "line open" : "line"}></span>
      </button>

      <nav className={isMenuOpen ? "nav-links active" : "nav-links"}>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/"); }}>Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}>Find Coaches</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}>Tournaments</a>
        <div className="auth-buttons-mobile">
          <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
      </nav>

      <div className="auth-buttons">
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div 
          className="menu-overlay" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}

export default Header;