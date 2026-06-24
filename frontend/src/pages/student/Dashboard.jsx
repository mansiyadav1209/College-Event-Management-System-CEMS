
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "../../styles/studentDashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({
    availableEvents: 0,
    registeredEvents: 0,
    upcomingEvents: 0,
    notifications: 0
  });

  const [upcomingEventsList, setUpcomingEventsList] = useState([]);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(

        `http://college-event-management-system-cem.vercel.app/api/students/dashboard/${user.id}`,

        {
          headers: {
            Authorization: token
          }
        }

      );
      console.log("Dashboard API:", res.data);

      setStats({
        availableEvents: res.data.availableEvents || 0,
        registeredEvents: res.data.registeredEvents || 0,
        upcomingEvents: res.data.upcomingEvents || 0,
        notifications: res.data.notifications || 0
      });

      setUpcomingEventsList(
        res.data.upcomingEventsList || []
      );

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="student-dashboard">

      {/* Sidebar */}
      <div className="student-sidebar">

        <h2 className="student-logo">
          Student Panel
        </h2>

        <ul>

          <li>
            <Link to="/student/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/events">
              Explore Events
            </Link>
          </li>

          <li>
            <Link to="/student/my-events">
              My Events
            </Link>
          </li>

          <li>
            <Link to="/student/profile">
              Profile
            </Link>
          </li>

          <li>
            <Link to="/student/notifications">
              Notifications
            </Link>
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="student-content">

        <h1>
          Welcome Student 👋
        </h1>

        <p>
          Explore events, manage registrations,
          and stay updated with campus activities.
        </p>

        {/* Dashboard Cards */}
        <div className="student-cards">

          <motion.div
            className="student-card"
            whileHover={{ scale: 1.05 }}
          >
            <h2>{stats.availableEvents}</h2>
            <p>Available Events</p>
          </motion.div>

          <motion.div
            className="student-card"
            whileHover={{ scale: 1.05 }}
          >
            <h2>{stats.registeredEvents}</h2>
            <p>Registered Events</p>
          </motion.div>

          <motion.div
            className="student-card"
            whileHover={{ scale: 1.05 }}
          >
            <h2>{stats.upcomingEvents}</h2>
            <p>Upcoming Events</p>
          </motion.div>

          <motion.div
            className="student-card"
            whileHover={{ scale: 1.05 }}
          >
            <h2>{stats.notifications}</h2>
            <p>Notifications</p>
          </motion.div>

        </div>

        {/* Upcoming Events */}
        <div className="upcoming-section">

          <h2>
            Upcoming Events
          </h2>

          <div className="upcoming-events">

            {upcomingEventsList.length === 0 ? (

              <p>No Upcoming Events</p>

            ) : (

              upcomingEventsList.map((event) => (

                <motion.div

                  key={event.id}

                  className="upcoming-card"

                  whileHover={{
                    scale: 1.03
                  }}

                >

                  <h3>
                    {event.title}
                  </h3>

                  <p>
                    📅 {new Date(event.date)
                      .toLocaleDateString()}
                  </p>

                  <p>
                    📍 {event.venue}
                  </p>

                </motion.div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;