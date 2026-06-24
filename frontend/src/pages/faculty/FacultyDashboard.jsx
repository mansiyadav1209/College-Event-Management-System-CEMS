import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/FacultyDashboard.css";

function FacultyDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    students: 0,
    notifications: 0,
  });

 
  const user = JSON.parse(localStorage.getItem("user"));
 
  useEffect(() => {
    
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const eventsRes = await axios.get(
        `https://college-event-management-system-cem.vercel.app/api/events/faculty/${user.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      let totalStudents = 0;

      for (const event of eventsRes.data) {
        try {
          const studentRes = await axios.get(
            `https://college-event-management-system-cem.vercel.app/api/events/students/${event.id}`
          );

          totalStudents += studentRes.data.length;
        } catch (err) {
          console.log(err);
        }
      }

      const notificationRes = await axios.get(
        "https://college-event-management-system-cem.vercel.app/api/notifications/faculty",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setStats({
        events: eventsRes.data.length,
        students: totalStudents,
        notifications: notificationRes.data.length,
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="faculty-layout">

      {/* Sidebar */}
      <div className="faculty-sidebar">

        <h2 className="faculty-logo">
          Faculty Panel
        </h2>

        <div className="faculty-menu">

          <Link to="/faculty-dashboard">
            Dashboard
          </Link>

          <Link to="/faculty-events">
            My Events
          </Link>

          <Link to="/faculty-notifications">
            Notifications
          </Link>

          <Link to="/faculty/profile">
            Profile
          </Link>

        </div>

      </div>

      {/* Content */}
      <div className="faculty-content">

        <div className="faculty-header">
          <h2>Faculty Dashboard</h2>

          <p>
            Welcome, {user?.name}
          </p>
        </div>

        {/* Stats */}
        <div className="faculty-stats">

          <div className="stat-card">
            <h2>{stats.events}</h2>
            <p>Assigned Events</p>
          </div>

          <div className="stat-card">
            <h2>{stats.students}</h2>
            <p>Total Students</p>
          </div>

          <div className="stat-card">
            <h2>{stats.notifications}</h2>
            <p>Notifications</p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="quick-actions">

          <h3>Quick Actions</h3>

          <div className="quick-buttons">

            <Link
              to="/faculty-events"
              className="view-btn"
            >
              Manage Events
            </Link>

            <Link
              to="/faculty-notifications"
              className="send-btn"
            >
              View Notifications
            </Link>

            <Link
              to="/faculty/profile"
              className="view-btn"
            >
              Edit Profile
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FacultyDashboard;