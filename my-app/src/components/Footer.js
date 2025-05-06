import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show the scroll-to-top button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer py-4">
      <div className="container">
        <div className="row text-center text-md-start">
          
          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link">› About Us</Link></li>
              <li><Link to="/contact" className="footer-link">› Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5 className="footer-title">Contact</h5>
            <p>📍 Department of BCA & MSc NT&IT,</p>
            <p>St John's College, Palayamkottai</p>
            <p>📞 +91 97913 11365</p>
            <p>✉ departmentofbcasjc@gmail.com</p>
            <div className="d-flex gap-3 mt-2">
              <a href="https://www.instagram.com/bca_msc_ntandit/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/share/16DNxtR2GR/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center mt-3">
          <p>
            © <span className="highlight">Department of BCA SJC</span>, All Rights Reserved. Designed by 
            <span className="highlight"> Gnanasingh.M & Iyyappan.S</span>
          </p>
        </div>
      </div>

      {/* Scroll-to-top button */}
      {showScroll && (
        <div className="scroll-up" onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      )}
    </footer>
  );
};

export default Footer;
