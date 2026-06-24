import React, {

  useEffect,
  useState

} from "react";

import { motion } from "framer-motion";

import axios from "axios";

import {

  getAllEvents,

  deleteEvent

} from "../../services/eventService";

import "../../styles/manageEvents.css";

function ManageEvents() {




  // States

  const [events, setEvents] =
    useState([]);

  const [faculties, setFaculties] = useState([]);



  const [editingEvent,
    setEditingEvent] =
    useState(null);





  // Fetch Events

  useEffect(() => {

    fetchEvents();
    fetchFaculties();

  }, []);


const fetchFaculties = async () => {
  try {
    const res = await axios.get(
      "https://college-event-management-system-cem.vercel.app/api/events/faculties"
    );

    setFaculties(res.data);
  } catch (err) {
    console.log(err);
  }
};


  const fetchEvents = async () => {

    try {

      const data =
        await getAllEvents();

      setEvents(data);

    } catch (err) {

      console.log(err);

    }

  };





  // Delete Event

  const handleDelete =
    async (id) => {

    const confirmDelete =
      window.confirm(

        "Are you sure you want to delete this event?"

      );





    if (!confirmDelete)
      return;





    try {

      const res =
        await deleteEvent(id);





      alert(res.message);





      // Remove Deleted Event

      setEvents(

        events.filter(

          (event) =>
            event.id !== id

        )

      );

    } catch (err) {

      alert(

        err.message ||

        "Failed to Delete Event"

      );

    }

  };





  // Update Event

  const updateEvent =
    async () => {

    try {

      // Get Token

      const token =
        localStorage.getItem("token");





      // API Request

      await axios.put(

        `https://college-event-management-system-cem.vercel.app/api/events/${editingEvent.id}`,

        editingEvent,

        {

          headers: {

            Authorization: token

          }

        }

      );





      alert(
        "Event Updated Successfully"
      );





      // Refresh Events

      fetchEvents();





      // Close Form

      setEditingEvent(null);

    } catch (err) {

      console.log(err);





      alert(

        err.response?.data?.message ||

        "Update Failed"

      );

    }

  };





  return (

    <div className="manage-events-page">

      <h1>

        Manage Events

      </h1>





      {/* Events List */}

      <div className="manage-events-container">

        {events.map((event) => (

          <motion.div

            key={event.id}

            className="manage-event-card"

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

              duration: 0.4

            }}

          >





            {/* Event Image */}

            <img

              src={event.image}

              alt={event.title}

            />





            {/* Event Details */}

            <div className="manage-event-content">

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

             

             <br></br><br></br>
          <p>

            <strong>Faculty Cordinator:</strong>

            {event.faculty_name || "Not Assigned"}

          </p>
          
          <p>
            <strong>Email:</strong>
            {event.faculty_email || "N/A"}
          </p>



              {/* Buttons */}

              <div className="manage-buttons">




                {/* Edit */}

                <button

                  className="edit-btn"

                  onClick={() =>

                    setEditingEvent(event)

                  }

                >

                  Edit

                </button>





                {/* Delete */}

                <button

                  className="delete-btn"

                  onClick={() =>

                    handleDelete(event.id)

                  }

                >

                  Delete

                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>





      {/* Edit Form */}

      {

        editingEvent && (

          <div className="edit-form">

            <h2>

              Edit Event

            </h2>





            <input

              type="text"

              placeholder="Title"

              value={editingEvent.title}

              onChange={(e) =>

                setEditingEvent({

                  ...editingEvent,

                  title: e.target.value

                })

              }

            />





            <textarea

              placeholder="Description"

              value={editingEvent.description}

              onChange={(e) =>

                setEditingEvent({

                  ...editingEvent,

                  description:
                    e.target.value

                })

              }

            />





            <input

              type="text"

              placeholder="Date"

              value={editingEvent.date}

              onChange={(e) =>

                setEditingEvent({

                  ...editingEvent,

                  date: e.target.value

                })

              }

            />





            <input

              type="text"

              placeholder="Venue"

              value={editingEvent.venue}

              onChange={(e) =>

                setEditingEvent({

                  ...editingEvent,

                  venue: e.target.value

                })

              }

            />





            <input

              type="text"

              placeholder="Category"

              value={editingEvent.category}

              onChange={(e) =>

                setEditingEvent({

                  ...editingEvent,

                  category: e.target.value

                })

              }

            />

            <div className="form-group">
            <select
                  value={editingEvent.faculty_id || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      faculty_id: e.target.value,
                    })
                  }
                className="faculty-select">
                  <option value="">
                    Select Faculty
                  </option>

                  {faculties.map((faculty) => (
                    <option
                      key={faculty.id}
                      value={faculty.id}
                    >
                      {faculty.name}
                    </option>
                  ))}
                </select>
               </div> 
               <br></br>

            <input

              type="text"

              placeholder="Image URL"

              value={editingEvent.image}

              onChange={(e) =>

                setEditingEvent({

                  ...editingEvent,

                  image: e.target.value

                })

              }

            />







            <button

              className="update-btn"

              onClick={updateEvent}

            >

              Update Event

            </button>

          </div>

        )

      }

    </div>

  );

}

export default ManageEvents;