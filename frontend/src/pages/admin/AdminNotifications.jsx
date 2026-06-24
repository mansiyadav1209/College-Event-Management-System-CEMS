import React, { useState } from "react";
import axios from "axios";
import "../../styles/AdminNotifications.css";

function AdminNotifications() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetRole, setTargetRole] =
    useState("all");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://college-event-management-system-cem.vercel.app/api/notifications/admin/send",
        {
          title,
          message,
          target_role: targetRole
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert(
        "Notification Sent Successfully"
      );

      setTitle("");
      setMessage("");

    } catch (err) {

      console.log(err);
      console.log(err.response?.data);

      alert(
        "Failed To Send Notification"
      );

    }

  };

  return (
    <div className="admin-notification-page">

    <div className="admin-notification-container">

      <h1>
        Send Notification
      </h1>

      <form className="notification-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e)=>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e)=>
            setMessage(e.target.value)
          }
        />

        <select
          value={targetRole}
          onChange={(e)=>
            setTargetRole(
              e.target.value
            )
          }
        className="notification-select">

          <option value="student">
            Students
          </option>

          <option value="faculty">
            Faculties
          </option>

          <option value="all">
            Everyone
          </option>

        </select>
        <br></br>
        <button type="submit">
          Send
        </button>

      </form>

    </div>
    </div>

  );

}

export default AdminNotifications;