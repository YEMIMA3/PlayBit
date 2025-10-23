import React from "react";
import "../styles/footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 style={{fontSize:"20px", fontFamily:"'Lora', serif",letterSpacing:"1px"}}>PlayBit</h3>
          <p>Bridging Players and Coaches worldwide.</p>
        </div>

        <div className="footer-section">
          <h4 style={{fontSize:"20px", fontFamily:"'Lora', serif",letterSpacing:"1px"}}>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Coaches</a></li>
            <li><a href="#">Tournaments</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 style={{fontSize:"20px", fontFamily:"'Lora', serif",letterSpacing:"0.5px"}}>Connect with Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sports Connect. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
