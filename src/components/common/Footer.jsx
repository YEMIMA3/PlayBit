import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../../styles/common/footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 style={{ fontSize: "25px", fontFamily: "'Lora', serif", letterSpacing: "1px" }}>
            PlayBit
          </h3>
          <p style={{color:"grey"}}>Connecting athletes with professional coaches worldwide.</p>
        </div>

        <div className="footer-section" style={{marginLeft:"180px"}}>
          <h4 style={{ fontSize: "25px", fontFamily: "'Lora', serif", letterSpacing: "1px" }}>
            Quick Links
          </h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Coaches</a></li>
            <li><a href="#">Tournaments</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section" style={{marginLeft:"130px"}}>
          <h4 style={{ fontSize: "25px", fontFamily: "'Lora', serif", letterSpacing: "0.5px" }}>
            Connect With Us
          </h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
          <span style={{fontSize:"20px", color:"grey"}}>support@playbit.com</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sports Connect. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
