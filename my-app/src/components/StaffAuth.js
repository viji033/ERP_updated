import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import Footer from "./Footer";
import "./StaffAuth.css";

const StaffAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [staffIdVerified, setStaffIdVerified] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const UNIQUE_STAFF_ID = "7"; // Staff verification ID

  // Clear error message after 5 seconds
  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleStaffIdVerification = (e) => {
    e.preventDefault();
    if (staffId.trim() === UNIQUE_STAFF_ID) {
      setStaffIdVerified(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Unauthorized: Incorrect Staff ID.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!validateEmail(formData.email)) {
      setErrorMessage("Invalid email format.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const url = isLogin
        ? "http://localhost:8000/api/auth/signin"
        : "http://localhost:8000/api/auth/signup";

      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "staff", // Assigning user role
          };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(formData.email);
      localStorage.setItem("email", formData.email);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isLogin ? "Invalid credentials" : "Registration failed"));
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", "staff");
      navigate("/staff-profile");
    } catch (error) {
      setErrorMessage(error.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Error message component
  const ErrorMessage = ({ message }) => {
    if (!message) return null;
    
    return (
      <div className="error-message">
        {/* Triangle exclamation icon with amber color */}
        <FaExclamationTriangle style={{ color: '#e6a23c', marginRight: '8px' }} />
        {message}
      </div>
    );
  };

  if (!staffIdVerified) {
    return (
      <>
        <div className="auth-container">
          <div className="auth-box">
            <h2>Staff Verification</h2>
            <ErrorMessage message={errorMessage} />
            <form onSubmit={handleStaffIdVerification}>
              <input
                type="text"
                placeholder="Enter Staff ID"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value.trim())}
                required
              />
              <button type="submit">Verify</button>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? "Staff Login" : "Staff Registration"}</h2>
          <ErrorMessage message={errorMessage} />
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {!isLogin && (
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            )}

            <button type="submit" disabled={isLoading} className={isLoading ? "loading" : ""}>
              {isLoading ? (isLogin ? "Signing In..." : "Creating Account...") : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          <p onClick={() => setIsLogin(!isLogin)} className="toggle-text">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaffAuth;