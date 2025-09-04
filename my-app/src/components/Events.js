import React from "react";
import Footer from './Footer';
import "./Events.css";
import event1 from "./Assets/event1.jpg"; 
import event2 from "./Assets/event2.jpg";
import event3 from "./Assets/event3.jpg";
import event4 from "./Assets/event4.jpg";
import event5 from "./Assets/event5.jpg";
import event6 from "./Assets/event6.jpg";
import event7 from "./Assets/event7.jpg";
import event8 from "./Assets/event8.jpg";

const EventsSection = () => {
  return (
    <>
      <div className="container py-5">
        <h1 className="text-center text-warning mb-4">Events</h1>
        <h2 className="text-center mb-5">TECH EXPO 2023</h2> {/* Color is black due to CSS */}

        {/* First Event Section */}
        <div className="row g-4">
          {/* Left Side */}
          <div className="col-md-7">
            <img src={event1} alt="Main Event" className="img-fluid rounded shadow" />
            <div className="d-flex gap-3 mt-3">
              <img src={event2} alt="Event 2" className="img-fluid small-event" />
              <img src={event3} alt="Event 3" className="img-fluid small-event" />
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-5">
            <img src={event4} alt="Right Event" className="img-fluid event-img-large shadow" />
          </div>
        </div>

        {/* BELOW SECTION WITH HEADING */}
        <h2 className="text-center mt-5">Christmas Day Function 2024</h2> {/* Black text */}

        <div className="row g-4 mt-3">
          {/* Left Side */}
          <div className="col-md-7">
            <img src={event5} alt="Main Event" className="img-fluid rounded shadow" />
            <div className="d-flex gap-3 mt-3">
              <img src={event6} alt="Event 6" className="img-fluid small-event" />
              <img src={event7} alt="Event 7" className="img-fluid small-event" />
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-5">
            <img src={event8} alt="Right Event" className="img-fluid event-img-large shadow" />
          </div>
        </div>
      </div>

      {/* Footer Added */}
      <Footer />
    </>
  );
};

export default EventsSection;
