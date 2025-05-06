import React, { useState, useEffect } from "react";
import './mk.css';

const StaffProfile = () => {
  const email = localStorage.getItem("email");
  console.log('email here ', email);
  const [staffProfile, setStaffProfile] = useState({
    name: "",
    email: "",
    image: localStorage.getItem("staffImage") || "https://via.placeholder.com/150",
  });

  const [loading, setLoading] = useState(true);
  const imageInputRef = React.createRef(); // Directly use ref without setter

  useEffect(() => {
    fetch(`http://localhost:8000/api/auth/profile?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);

        if (data && data.user.name && data.user.email) {
          setStaffProfile({
            name: data.user.name,
            email: data.user.email,
            image: data.user.image || "https://via.placeholder.com/150",
          });

          // Save image to localStorage
          if (data.user.image) {
            localStorage.setItem("staffImage", data.user.image);
          }
        }
      })
      .catch((error) => console.error("Error fetching staff data:", error))
      .finally(() => setLoading(false));
  }, []); // No dependency on token, just run once on mount

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStaffProfile((prev) => ({ ...prev, image: reader.result }));
        localStorage.setItem("staffImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <div className="section staff-section">
      <h2 className="text-center mb-4">Staff Profile</h2>

      {loading ? (
        <p className="text-center">Loading profile...</p>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded animate__animated animate__fadeIn">
            <div className="profile-image-container">
              <img
                src={staffProfile.image}
                className="card-img-top rounded-circle mx-auto d-block mt-3"
                alt="Staff"
                style={{ width: "80%", height: "80%", objectFit: "cover" }}
              />
              <button 
                className="edit-profile-image-btn" 
                onClick={triggerFileInput}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            </div>

            <input 
              type="file" 
              ref={imageInputRef}
              accept="image/*" 
              onChange={handleImageChange} 
              className="form-control my-2" 
              style={{ display: 'none' }}
            />

            <div className="card-body text-center">
              <h5 className="card-title">{staffProfile.name || "Staff Name"}</h5>
              <p className="card-text text-muted">{staffProfile.email || "email@example.com"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffProfile;
