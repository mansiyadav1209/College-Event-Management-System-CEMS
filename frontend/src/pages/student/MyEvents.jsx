import React, {

  useEffect,
  useState

} from "react";

import axios from "axios";

import { motion } from "framer-motion";

import "../../styles/myEvents.css";

function MyEvents() {

  const [myEvents, setMyEvents] =
    useState([]);





  // Fetch Registered Events

  useEffect(() => {

    fetchMyEvents();

  }, []);





  const fetchMyEvents =
    async () => {

    try {

      const token =
        localStorage.getItem("token");





      const user =
        JSON.parse(

          localStorage.getItem("user")

        );





      const res = await axios.get(

        `https://college-event-management-system-cem.vercel.app/api/events/registered/${user.id}`,

        {

          headers: {

            Authorization: token

          }

        }

      );





      setMyEvents(res.data);

    } catch (err) {

      console.log(err);

    }

  };





  // Cancel Registration

  const handleCancel = (id) => {

    const updatedEvents =

      myEvents.filter(

        (event) =>

          event.id !== id

      );





    setMyEvents(updatedEvents);





    alert(

      "Registration Removed"

    );

  };





  return (

    <div className="my-events-page">

      <h1>

        My Registered Events

      </h1>





      <div className="my-events-container">

        {

          myEvents.length === 0 ? (

            <h2>

              No Registered Events

            </h2>

          ) : (

            myEvents.map((event) => (

              <motion.div

                key={event.id}

                className="my-event-card"

                whileHover={{

                  scale: 1.03

                }}

                initial={{

                  opacity: 0,

                  y: 40

                }}

                whileInView={{

                  opacity: 1,

                  y: 0

                }}

                transition={{

                  duration: 0.5

                }}

              >





                {/* Image */}

                <img

                  src={event.image}

                  alt={event.title}

                />





                {/* Content */}

                <div className="my-event-content">

                  <h2>

                    {event.title}

                  </h2>





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





                  <button

                    onClick={() =>

                      handleCancel(event.id)

                    }

                  >

                    Cancel Registration

                  </button>

                </div>

              </motion.div>

            ))

          )

        }

      </div>

    </div>

  );

}

export default MyEvents;