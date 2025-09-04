import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Events from "./components/Events";
import Contact from "./components/Contact";
import StudentAuth from "./components/StudentsAuth";
import StaffAuth from "./components/StaffAuth";
import Students from "./components/Students";
import Staff from "./components/Staff"; // Fixed import

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // If no token, redirect to login
  if (!token || !userRole) {
    return <Navigate to="/staff-auth" state={{ from: location }} replace />;
  }

  // If role is not allowed, redirect to home
  if (!allowedRoles.includes(userRole)) {
    navigate("/");
    return null;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    const updateAuthState = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
      setUserRole(localStorage.getItem("userRole"));
    };

    window.addEventListener("storage", updateAuthState);
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication Routes */}
        <Route path="/student-auth" element={<StudentAuth />} />
        <Route path="/staff-auth" element={<StaffAuth />} />

        {/* Protected Routes */}
        <Route
          path="/Students"
          element={
           
              <Students />
         
          }
        />
        <Route
          path="/staff-profile"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <Staff />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
