import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/FacultyNotifications.css";

function FacultyNotifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://college-event-management-system-cem.vercel.app/api/notifications/faculty",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      setNotifications(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="faculty-notifications-page">

  <h2>Notifications</h2>

  {notifications.length === 0 ? (

    <div className="no-notifications">
      No notifications available
    </div>

  ) : (

    <div className="notifications-container">

      {notifications.map((n) => (

        <div
          key={n.id}
          className={`notification-card ${n.type}`}
        >

          <div className="notification-title">
            {n.title || "Event Notification"}
          </div>

          <div className="notification-message">
            {n.message}
          </div>

          <div className="notification-date">
            {new Date(n.created_at).toLocaleString()}
          </div>

        </div>

      ))}

    </div>

  )}

</div>
 
  );
}

export default FacultyNotifications;