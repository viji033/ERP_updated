import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./StudentsAuth.css";

const StudentAuth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Email validation function
  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Handle form field changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage(""); // Clear error message on input change
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message
    setIsLoading(true);

    // Check if the email is valid
    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const email = formData.email.trim();
      const response = await fetch(
        `http://localhost:8000/api/student/profile?email=${encodeURIComponent(email)}`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Student not found");
      }

      // Save email and other relevant data in localStorage
      localStorage.setItem("userEmail", result.data.email);
      localStorage.setItem("userId", result.data._id); // Storing the user ID (MongoDB _id)

      // Navigate to the student's profile page
      navigate("/Students", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
          <h2>Student Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="College Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={isLoading ? "loading" : ""}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentAuth;
