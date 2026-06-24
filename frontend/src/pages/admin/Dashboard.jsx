import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import "../../styles/adminDashboard.css";

function Dashboard() {

  const [stats, setStats] =
    useState({

      totalEvents: 0,

      registeredStudents: 0,

      upcomingEvents: 0,

      totalRegistrations: 0

    });

  useEffect(() => {

    fetchDashboardStats();

  }, []);

  const fetchDashboardStats =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await axios.get(

            "https://college-event-management-system-cem.vercel.app/api/admin/dashboard",

            {
              headers: {
                Authorization: token
              }
            }

          );
        console.log(res.data);
        setStats(res.data);

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="admin-dashboard">

      {/* Sidebar */}

      <div className="sidebar">

        <h2 className="logo">

          Admin Panel

        </h2>

        <ul>

          <li>

            <Link to="/admin/dashboard">

              Dashboard

            </Link>

          </li>

          <li>

            <Link to="/admin/manage-events">

              Manage Events

            </Link>

          </li>

          <li>

            <Link to="/admin/add-event">

              Add Event

            </Link>

          </li>

          <li>

            <Link to="/admin/manage-students">

              Manage Students

            </Link>

          </li>

          <li>

            <Link to="/admin/analytics">

              Analytics

            </Link>

          </li>

          <li>

            <Link to="/admin/notifications">

              Notifications

            </Link>

          </li>

        </ul>

      </div>

      {/* Main Content */}

      <div className="dashboard-content">

        <h1>

          Welcome Admin 👋

        </h1>

        <p>

          Manage college events, students,
          registrations and analytics from here.

        </p>

        {/* Cards */}

        <div className="dashboard-cards">

          <motion.div

            className="dashboard-card"

            whileHover={{
              scale: 1.05
            }}

          >

            <h2>

              {stats.totalEvents}

            </h2>

            <p>

              Total Events

            </p>

          </motion.div>

          <motion.div

            className="dashboard-card"

            whileHover={{
              scale: 1.05
            }}

          >

            <h2>

              {stats.registeredStudents}

            </h2>

            <p>

              Registered Students

            </p>

          </motion.div>

          <motion.div

            className="dashboard-card"

            whileHover={{
              scale: 1.05
            }}

          >

            <h2>

              {stats.upcomingEvents}

            </h2>

            <p>

              Upcoming Events

            </p>

          </motion.div>

          <motion.div

            className="dashboard-card"

            whileHover={{
              scale: 1.05
            }}

          >

            <h2>

              {stats.totalRegistrations}

            </h2>

            <p>

              Event Registrations

            </p>

          </motion.div>

        </div>

        {/* Recent Activities */}

        <div className="recent-section">

          <h2>

            Recent Activities

          </h2>

          <div className="activity-box">

            <p>

              Total Events:
              {" "}
              {stats.totalEvents}

            </p>

            <p>

              Registered Students:
              {" "}
              {stats.registeredStudents}

            </p>

            <p>

              Upcoming Events:
              {" "}
              {stats.upcomingEvents}

            </p>

            <p>

              Event Registrations:
              {" "}
              {stats.totalRegistrations}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;