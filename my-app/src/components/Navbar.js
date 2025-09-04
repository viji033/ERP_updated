import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "./Assets/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setAccountDropdown(!accountDropdown);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
    setAccountDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>

        {/* Mobile Toggle Button */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Navbar Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link className="nav-link" to="/" onClick={handleLinkClick}>Home</Link>
          <Link className="nav-link" to="/about" onClick={handleLinkClick}>About</Link>
          <Link className="nav-link" to="/events" onClick={handleLinkClick}>Events</Link>
          <Link className="nav-link" to="/contact" onClick={handleLinkClick}>Contact</Link>

          {/* Account Dropdown */}
          <div className="nav-item dropdown" ref={dropdownRef}>
            <button className="account-btn" onClick={toggleDropdown}>
              Account
            </button>
            <div className={`dropdown-menu ${accountDropdown ? "active" : ""}`}>
              <Link className="dropdown-item" to="/staff-auth" onClick={handleLinkClick}>Staff</Link>
              <Link className="dropdown-item" to="/student-auth" onClick={handleLinkClick}>Students</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
