import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/FacultyDashboard.css";

function FacultyEvents() {

const [events, setEvents] = useState([]);
const [students, setStudents] = useState([]);
const [messages, setMessages] = useState({});

const user = JSON.parse(
localStorage.getItem("user")
);

useEffect(() => {
fetchEvents();
}, []);

const fetchEvents = async () => {


try {

  const res = await axios.get(
    `http://college-event-management-system-cem.vercel.app/api/events/faculty/${user.id}`
  );

  setEvents(res.data);

} catch (err) {

  console.log(err);

}


};

const fetchStudents = async (eventId) => {


try {

  const res = await axios.get(
    `http://college-event-management-system-cem.vercel.app/api/events/students/${eventId}`
  );

  setStudents(res.data);

} catch (err) {

  console.log(err);

}

};

const sendNotification = async (eventId) => {

const message = messages[eventId];

if (!message?.trim()) {

  alert("Enter a message first");
  return;

}

try {

  const token =
    localStorage.getItem("token");

  await axios.post(
    "http://college-event-management-system-cem.vercel.app/api/notifications/send",
    {
      event_id: eventId,
      message,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  alert("Notification Sent");

  setMessages({
    ...messages,
    [eventId]: "",
  });

} catch (err) {

  console.log(err);
  alert("Failed to send notification");

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

  {/* Main Content */}
  <div className="faculty-content">

    <div className="faculty-header">
      <h2>My Events</h2>
    </div>

    <h3 className="section-title">
      Assigned Events
    </h3>

    {events.length === 0 ? (

      <p>No events assigned.</p>

    ) : (

      <div className="events-container">

        {events.map((event) => (

          <div
            key={event.id}
            className="event-card"
          >

            <h4>{event.title}</h4>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.date)
                .toLocaleDateString()}
            </p>

            <p>
              <strong>Venue:</strong>{" "}
              {event.venue}
            </p>

            <button
              className="view-btn"
              onClick={() =>
                fetchStudents(event.id)
              }
            >
              View Registered Students
            </button>

            <div className="notification-box">

              <textarea
                placeholder="Send update to students..."
                value={
                  messages[event.id] || ""
                }
                onChange={(e) =>
                  setMessages({
                    ...messages,
                    [event.id]:
                      e.target.value,
                  })
                }
                rows="3"
                className="notification-textarea"
              />

              <button
                className="send-btn"
                onClick={() =>
                  sendNotification(event.id)
                }
              >
                Send Notification
              </button>

            </div>

          </div>

        ))}

      </div>

    )}

    <div className="students-section">

      <h3 className="section-title">
        Registered Students
      </h3>

      {students.length === 0 ? (

        <p>
          Click "View Registered Students"
          to see participants.
        </p>

      ) : (

        students.map((student) => (

          <div
            key={student.registration_id}
            className="student-card"
          >

            <p>
              <strong>Name:</strong>{" "}
              {student.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {student.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {student.phone}
            </p>

            <p>
              <strong>Course:</strong>{" "}
              {student.course}
            </p>

          </div>

        ))

      )}

    </div>

  </div>

</div>


);

}

export default FacultyEvents;
