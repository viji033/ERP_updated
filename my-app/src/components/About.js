import React from "react";
import Footer from './Footer'
import "./About.css";
import college from "./Assets/college.jpg"; // Ensure the image is inside the assets folder
import { FaGraduationCap, FaBook, FaHome, FaGlobe } from "react-icons/fa"; // Import icons

const AboutSection = () => {
  return (
    <>
    <h1 className="cj">About us</h1>
      {/* First Section - About Image & Text */}
      <section className="about-container">
        <img src={college} alt="College Entrance" className="about-image" />

        <section className="about-text">
          <h2>Department of BCA, M.Sc NT&IT</h2>

          <p>
          Bachelor of Computer Application [BCA] started in the year of 2005 through Satellite Centre in our college and 48 students were admitted in this course. Then The Bachelor of Computer Application [BCA] was shifted from Satellite Centre to Self-Financed stream in the year of 2013 with high tech lab facilities, till the course is successfully running in our college.
          </p>

          <p>
          In the year 2001, Satellite Centre for Information Technology introduced M.S.I.T in St.John's College, with 82 students in two sections. After that it was renamed as M.Sc Networking and Information Technology by Manonmaniam Sundaranar University and has been introduced in our college from 20th August 2003 with well equipped lab facilities. Our college decided to shift M.Sc NT & IT from Satellite Course to Self-Financed stream in the year of 2013, Now the M.Sc [NT & IT] course is running successfully upto till date.
          </p>

          <ul className="about-list">
            <li> University Certificate</li>
            <li> Events</li>
            <li> Skilled Professors</li>
            <li> Discipline</li>
          </ul>
        </section>
      </section>

      {/* Second Section - Four Boxes */}
      <section className="four-box-container">
        <article className="box">
          <FaGraduationCap className="icon" />
          <h3>Academic Excellence</h3>
          <p>We ensure high-quality education with experienced faculty and structured coursework.</p>
          
        </article>

        <article className="box">
          <FaBook className="icon" />
          <h3>Library & Resources</h3>
          <p>Our library is stocked with thousands of books, journals, and digital learning materials.</p>
          
        </article>

        <article className="box">
          <FaHome className="icon" />
          <h3>Campus Life</h3>
          <p>We provide a dynamic campus experience with modern facilities and student clubs.</p>
          
        </article>

        <article className="box">
          <FaGlobe className="icon" />
          <h3>Global Exposure</h3>
          <p>Opportunities to study abroad and collaborate with international universities.</p>
          
        </article>
      </section>
      <Footer />
    </>
  );
};

export default AboutSection;
