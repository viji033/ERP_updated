import React from "react";
import Footer from "../components/Footer";
import "./Contact.css"; 

const Contact = () => {
  return (
    <>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center">
            <h6 className="section-title bg-white text-warning px-3 d-inline-block fw-bold">
              Contact Us
            </h6>
            <h1 className="mb-5 ">Contact For Any Query</h1>
          </div>

          <div className="row g-4">
            {/* Contact Details */}
            <div className="col-lg-4 col-md-6">
              <h5 className="text-warning fw-bold">Get In Touch</h5>
              <p className="mb-4">
                We'd love to hear from you! Contact us at{" "}
                <b className="text-warning">departmentofbcasjc@gmail.com</b> or use our contact form.
              </p>

              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-warning text-white p-3 rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-geo-alt-fill fs-4"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-warning fw-bold">Location</h5>
                  <p className="mb-0">
                    Department of BCA & MSc NT&IT, St John's College, Palayamkottai
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-warning text-white p-3 rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-telephone-fill fs-4"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-warning fw-bold">Mobile</h5>
                  <p className="mb-0">+91 97913 11365</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="icon-box bg-warning text-white p-3 rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-envelope-fill fs-4"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-warning fw-bold">Email</h5>
                  <p className="mb-0">departmentofbcasjc@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="col-lg-4 col-md-6">
              <div className="rounded shadow">
                <iframe
                  className="rounded w-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1950238410973!2d77.7424014!3d8.720898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b041200f0305679%3A0x50105518a2b0bdbb!2sSt.%20John&#39;s%20College!5e0!3m2!1sen!2sin!4v1710434692197!5m2!1sen!2sin"
                  frameBorder="0"
                  style={{ minHeight: "300px", border: "0" }}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-4 col-md-12">
              <div className="card border-warning shadow">
                <div className="card-body">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control border-warning"
                            id="name"
                            placeholder="Your Name"
                            required
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control border-warning"
                            id="email"
                            placeholder="Your Email"
                            required
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control border-warning"
                            id="subject"
                            placeholder="Subject"
                            required
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control border-warning"
                            placeholder="Leave a message here"
                            id="message"
                            style={{ height: "150px" }}
                            required
                          ></textarea>
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-warning w-100 py-3 text-white fw-bold" type="submit">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
