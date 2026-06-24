import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "../styles/home.css";

function Home() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
      
        "http://college-event-management-system-cem.vercel.app/api/events"
    );

      // only first 3 events
      console.log(res.data);
     // console.log(process.env.REACT_APP_API_URL);
      setEvents(res.data.slice(0, 3));

    } catch (error) {
      console.error("Error fetching events:", error);
    }
   }; 
  return (
    <div className="home">

      {/* Navbar */}
      {/* <nav className="navbar">
        <h2 className="logo">College Event Hub</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav> */}


      {/* Hero Section */}
      <section className="hero">
         
        <div className="hero-content">
          <h1>
            Welcome to College Event Management System
          </h1>

          <p>
            Discover exciting college events, workshops,
            hackathons, cultural fests, seminars, and
            technical competitions all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/events">
              <button className="btn">Explore Events</button>
            </Link>

            <Link to="/register">
              <button className="btn-secondary">
                Join Now
              </button>
            </Link>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="features-section">

        <h2>Why Use Our Platform?</h2>

        <div className="feature-container">

          <div className="feature-card">
            <h3>📅 Easy Event Registration</h3>
            <p>
              Register for events instantly with a simple
              and user-friendly interface.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔔 Notifications</h3>
            <p>
              Get updates about upcoming events,
              deadlines, and announcements.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Admin Dashboard</h3>
            <p>
              Manage events, students, registrations,
              and analytics efficiently.
            </p>
          </div>

        </div>

      </section>

      


      <div className="stats-section">

            <div className="stat-box">
              <h2>500+</h2>
              <p>Students</p>
            </div>

            <div className="stat-box">
              <h2>50+</h2>
              <p>Events Conducted</p>
            </div>

            <div className="stat-box">
              <h2>20+</h2>
              <p>Workshops</p>
            </div>

            <div className="stat-box">
              <h2>15+</h2>
              <p>Departments</p>
            </div>

          </div>


       {/* Motion Image Gallery */}

      <section className="gallery-section">

        <h2>
          Campus Event Highlights
        </h2>

        <div className="gallery-container">

          <motion.img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUAIHpNtd2-WmN-J6gB8lE9R9wBdDOuq28KQ&s"
            alt="Event"

            className="gallery-image"

            whileHover={{
              scale: 1.08
            }}

            initial={{
              opacity: 0,
              x: -100
            }}

            whileInView={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.8
            }}
          />



          <motion.img
            src="data:image/jpeg;base64,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"
            alt="Workshop"

            className="gallery-image"

            whileHover={{
              scale: 1.08
            }}

            initial={{
              opacity: 0,
              y: 100
            }}

            whileInView={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.8
            }}
          />



          <motion.img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzllB7LPFqhmAqoejRu96iLr2RacD5cc2TUw&s"
            alt="Seminar"

            className="gallery-image"

            whileHover={{
              scale: 1.08
            }}

            initial={{
              opacity: 0,
              x: 100
            }}

            whileInView={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.8
            }}
          />

        </div>

      </section>



      {/* Upcoming Events Section */}
      <section className="events-preview">
        <h2>Upcoming Events</h2>

        <div className="events-container">
          {events.length > 0 ? (
            events.map((event) => (
              <div className="event-card" key={event._id}>
                <h3>{event.title}</h3>

                <p>
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>

                <p>
                  Venue: {event.venue}
                </p>
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>

         <Link to="/events">
            <button className="btn" style={{ marginTop: "20px" }}>
              View All Events
            </button>
          </Link> 

      </section>
      




      <div className="testimonial-section">

          <h2>What Students Say</h2>

          <div className="testimonial-container">

            <div className="testimonial-card">
              <p>
                "Amazing platform for managing events."
              </p>

              <h4>- Rahul Sharma</h4>
            </div>

            <div className="testimonial-card">
              <p>
                "Registration process became very easy."
              </p>

              <h4>- Saumya Singh</h4>
            </div>

          </div>

        </div>




        <div className="cta-section">

            <h2>
              Ready to Explore Campus Events?
            </h2>

            <button>
              Join Now
            </button>

          </div>




    </div>
  );
}

export default Home;