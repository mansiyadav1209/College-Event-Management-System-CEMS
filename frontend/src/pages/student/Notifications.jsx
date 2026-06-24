import React, {

  useEffect,
  useState

} from "react";

import axios from "axios";

import { motion } from "framer-motion";

import "../../styles/notifications.css";

function Notifications() {




  // State

  const [notifications,
    setNotifications] =
    useState([]);





  // Fetch Notifications

  useEffect(() => {

    fetchNotifications();

  }, []);





  const fetchNotifications =
    async () => {

    try {

      const token =
        localStorage.getItem("token");





      const user =
        JSON.parse(

          localStorage.getItem("user")

        );





      const res = await axios.get(

        `http://college-event-management-system-cem.vercel.app/api/notifications/student/${user.id}`,

        {

          headers: {

            Authorization: token

          }

        }

      );





      setNotifications(res.data);

    } catch (err) {

      console.log(err);

    }

  };





  return (

    <div className="notifications-page">

      <h1>

        Notifications

      </h1>





      <div className="notifications-container">

        {

          notifications.length === 0 ? (

            <h2 className="no-notification">

              No Notifications Found

            </h2>

          ) : (

            notifications.map((item) => (

              <motion.div

                key={item.id}

                className="notification-card"

                initial={{

                  opacity: 0,

                  x: -50

                }}

                animate={{

                  opacity: 1,

                  x: 0

                }}

                transition={{

                  duration: 0.4

                }}

                whileHover={{

                  scale: 1.02

                }}

              >

                <h2>{item.event_title}</h2>





                <p>

                  {item.message}

                </p>





                <span>

                  {

                    new Date(item.created_at)

                    .toLocaleString()

                  }

                </span>

              </motion.div>

            ))

          )

        }

      </div>

    </div>

  );

}

export default Notifications;