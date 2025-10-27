import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../../styles/common/footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <h3 className="footer-brand">PlayBit</h3>
          <p className="footer-description">
            Connecting athletes with professional coaches worldwide. Find your perfect coach, 
            improve your skills, and achieve your sports goals with our verified platform.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="social-icon">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/coaches">Find Coaches</a></li>
            <li><a href="/tournaments">Tournaments</a></li>
            <li><a href="/sports">Sports</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-title">Contact Info</h4>
          <div className="contact-info">
            <p className="contact-email">
              <span>Email:</span>
              <a href="mailto:support@playbit.com">support@playbit.com</a>
            </p>
            <p className="contact-phone">
              <span>Phone:</span>
              <a href="tel:+11234567890">+1 (123) 456-7890</a>
            </p>
            <p className="contact-address">
              <span>Address:</span>
              123 Sports Avenue, Coach City, CC 12345
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PlayBit. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;