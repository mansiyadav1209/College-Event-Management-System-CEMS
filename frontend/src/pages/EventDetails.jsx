import React, {

  useEffect,
  useState

} from "react";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import axios from "axios";

import {

  getSingleEvent

} from "../services/eventService";

import "../styles/eventDetails.css";

function EventDetails() {

  // Get Event ID

  const { id } = useParams();





  // State

  const [event, setEvent] = useState(null);





  // Fetch Event

  useEffect(() => {

    fetchEvent();

  }, []);


console.log("EVENT DETAILS:",event);


  const fetchEvent = async () => {

    try {

      const data =
        await getSingleEvent(id);

      setEvent(data);

    } catch (err) {

      console.log(err);

    }

  };





  // Register Event

  const handleRegister =
    async () => {

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

        "http://localhost:5000/api/events/register",

        {

          user_id: user.id,

          event_id: event.id

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





  // Loading State

  if (!event) {

    return (

      <h2 className="loading">

        Loading Event...

      </h2>

    );

  }


const user=JSON.parse(
  localStorage.getItem("user")
);


  return (

    <div className="details-page">

      <motion.div

        className="details-card"

        initial={{

          opacity: 0,

          y: 50

        }}

        animate={{

          opacity: 1,

          y: 0

        }}

        transition={{

          duration: 0.6

        }}

      >





        {/* Event Image */}

        <img

          src={event.image}

          alt={event.title}

          className="details-image"

        />





        {/* Event Content */}

        <div className="details-content">

          <h1>

            {event.title}

          </h1>





          <p className="description">

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
          
<br></br><br></br>
          <p>

            <strong>Faculty Cordinator:</strong>

            {event.faculty_name || "Not Assigned"}

          </p>
          
          <p>
            <strong>Email:</strong>
            {event.faculty_email || "N/A"}
          </p>


          <p>
            <strong>Phone no::</strong>
            {event.faculty_phone || "N/A"}
          </p>


          <p>
            <strong>Email:</strong>
            {event.faculty_department || "N/A"}
          </p>





          {/* Extra Info */}

          <div className="extra-info">

            <h3>

              Event Highlights

            </h3>





            <ul>

              <li>

                Participation certificate provided

              </li>





              <li>

                Exciting prizes for winners

              </li>





              <li>

                Networking opportunities

              </li>





              <li>

                Industry expert guidance

              </li>

            </ul>

          </div>





          {/* Register Button */}
          {user?.role ==="student" &&(
          <button

            onClick={handleRegister}

          >

            Register Now

          </button>
          )}
        </div>

      </motion.div>

    </div>

  );

}

export default EventDetails;