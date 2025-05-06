import React from "react";
import Slider from "react-slick";
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

// Import images
import Img1 from "./Assets/home1.jpg";
import Img2 from "./Assets/home2.jpg";

// Import alumni images
import Alumni1 from "./Assets/alumni1.jpg";
import Alumni2 from "./Assets/alumni2.jpg";
import Alumni3 from "./Assets/alumni3.jpg";
import Alumni4 from "./Assets/alumni4.jpg";

const Home = () => {
  // Sliding Carousel Settings
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: false,
  };

  return (
    <div className="home">
      {/* Full-Screen Sliding Image Carousel */}
      <section className="carousel-section">
        <Slider {...settings} className="container-fluid">
          <div className="slide-container">
            <img src={Img1} alt="Campus View" className="carousel-image" />
            <div className="text-overlay">
              <h2>WE HAVE MASTERS DEGREE IN</h2>
              
              <h1>Master of Science in Networking & Information Technology</h1>
              <p>The whole purpose of education is to turn mirrors into windows.</p>
              <a href="/apply" className="apply-btn">Apply Now</a>
            </div>
          </div>
          <div className="slide-container">
            <img src={Img2} alt="University Event" className="carousel-image" />
            <div className="text-overlay">
              <h2>WELCOME TO DEPARTMENT OF BCA & MSC NT&IT</h2>
              <p1>our professional cources</p1>
              <h1>Bachelor of Computer Applications</h1>
              <p>The purpose of the department is to prepare students with promise to enhance their intellectual,physical,social and artistic growth so that they may realize their power for good.</p>
              <a href="/apply" className="apply-btn">Apply Now</a>
            </div>
          </div>
        </Slider>
      </section>

      {/* Faculty Members Section */}
      <section className="faculty-section container my-5">
        <h2 className="text-center mb-4 text-warning fw-bold">Faculty Members</h2>
        <div className="row">
          {[
            { name: "Mrs. A. Bathsheba Parimala", title: "Head of the Department" },
            { name: "Mr. K. Appasamy", title: "Assistant Professor" },
            { name: "Mr. B. Edward Daniel Christopher", title: "Assistant Professor" },
            { name: "Mr. I. Thomas Jebasingh", title: "Assistant Professor" },
            { name: "Mr. S. Immanuel", title: "Assistant Professor" },
            { name: "Mrs. G. Priskillal", title: "Assistant Professor" },
            { name: "Mr. L. Abraham David", title: "Assistant Professor" },
          ].map((faculty, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card faculty-card p-3 text-center shadow">
                <p className="fw-bold text-primary">{faculty.name}</p>
                <p className="text-muted">{faculty.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notable Alumni Section */}
      <section className="alumni-section container my-5">
        <h2 className="text-center mb-4 text-warning fw-bold">Notable Alumni</h2>
        <div className="row">
          {[
            { img: Alumni1, name: "J. John Wesley Moses (BCA)", degree: "Associate Consultant, HCL Technologies Bangalore." },
            { img: Alumni2, name: "Blessing Newman (BCA)", degree: "Software Engineer, Cognizant Technology Solutions." },
            { img: Alumni3, name: "S. Gowri Sankar (M.Sc [MT&IT])", degree: "Senior Executive Engineer, Reliance Jio Infocomm Pvt Ltd Tenkasi" },
            { img: Alumni4, name: "M. John Victor (BCA)", degree: "Managing Director, Oramate Technology & Great Minds Technology Chennai" },
          ].map((alumni, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card alumni-card text-center p-3 shadow">
                <img src={alumni.img} alt={"Alumni " + (index + 1)} className="alumni-image rounded-circle" />
                <p className="fw-bold text-warning mt-2">{alumni.name}</p>
                <p className="text-muted">{alumni.degree}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
