import React, {

  useEffect,
  useState

} from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import axios from "axios";

import {

  getAllEvents

} from "../services/eventService";

import "../styles/events.css";

function Events() {

  const [events, setEvents] =
    useState([]);





  // Fetch Events

  useEffect(() => {

    fetchEvents();

  }, []);





  const fetchEvents =
    async () => {

    try {

      const data =
        await getAllEvents();

      setEvents(data);

    } catch (err) {

      console.log(err);

    }

  };





  // Register Event

  const handleRegister =
    async (eventId) => {

    try {

      const token =
        localStorage.getItem("token");





      const user =
        JSON.parse(

          localStorage.getItem("user")

        );





      // Check Login

      if (!token || !user) {

        alert(

          "Please Login First"

        );

        return;

      }





      const res = await axios.post(

        "http://college-event-management-system-cem.vercel.app/api/events/register",

        {

          user_id: user.id,

          event_id: eventId

        },

        {

          headers: {

            Authorization: token

          }

        }

      );





      alert(

        res.data.message

      );

    } catch (err) {

      console.log(err);





      alert(

        err.response?.data?.message ||

        "Registration Failed"

      );

    }

  };


const user=JSON.parse(
  localStorage.getItem("user")
);


  return (

    <div className="events-page">

      <h1 className="events-title">

        Upcoming College Events

      </h1>





      <div className="events-container">

        {events.map((event) => (

          <motion.div

            key={event.id}

            className="event-card"

            whileHover={{

              scale: 1.05

            }}

            initial={{

              opacity: 0,

              y: 50

            }}

            whileInView={{

              opacity: 1,

              y: 0

            }}

            transition={{

              duration: 0.5

            }}

          >





            {/* Event Image */}

            <img

              src={

                event.image ||

                "https://images.unsplash.com/photo-1511578314322-379afb476865"

              }

              alt={event.title}

              className="event-image"

            />





            {/* Event Content */}

            <div className="event-content">

              <h2>

                {event.title}

              </h2>





              <p>

                {event.description}

              </p>





              <p>

                📅 <strong>Date:</strong>

                {event.date}

              </p>





              <p>

                📍 <strong>Venue:</strong>

                {event.venue}

              </p>





              <p>

                🎯 <strong>Category:</strong>

                {event.category}

              </p>

              <p>
                Faculty: {event.faculty_name || "Not Assigned"}
              </p>





              {/* Buttons */}

              <div className="event-buttons">

                <Link to={`/events/${event.id}`}>

                  <button className="details-btn">

                    View Details

                  </button>

                </Link>



              {user?.role ==="student" &&(

              

                <button

                  className="register-btn"

                  onClick={() =>

                    handleRegister(event.id)

                  }

                >

                  Register Now

                </button>

                )}

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  );

}

export default Events;