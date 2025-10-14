import React from "react";
import "../styles/header.scss";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">PB</div>
        <span className="logo-text">PlayBit</span>
      </div>

      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Find Coaches</a>
        <a href="#">Tournaments</a>
      </nav>

      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
}

export default Header;
