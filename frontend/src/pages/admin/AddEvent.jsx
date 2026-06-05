import React, { useState,useEffect } from "react";

import { motion } from "framer-motion";

import { createEvent } from "../../services/eventService";

import axios from "axios";

import "../../styles/addEvent.css";

function AddEvent() {

  // Form State

  const [formData, setFormData] = useState({

    title: "",

    description: "",

    date: "",

    venue: "",

    category: "",

    image: ""

  });



  const [faculties, setFaculties] = useState([]);





  // Handle Input Change

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };





  // Submit Form

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await createEvent(formData);

      alert(res.message);





      // Reset Form

      setFormData({

        title: "",

        description: "",

        date: "",

        venue: "",

        category: "",

        image: ""

      });

    } catch (err) {

      alert(

        err.message ||

        "Failed to Add Event"

      );

    }

  };


useEffect(() => {

 fetchFaculties();

}, []);

const fetchFaculties = async () => {

 const res = await axios.get(
   "http://localhost:5000/api/faculties"
 );

 setFaculties(res.data);
};


  return (

    <div className="add-event-page">

      <motion.div

        className="add-event-container"

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

        <h1>

          Add New Event

        </h1>





        <form onSubmit={handleSubmit}>





          {/* Event Title */}

          <input

            type="text"

            name="title"

            placeholder="Event Title"

            value={formData.title}

            onChange={handleChange}

            required

          />





          {/* Description */}

          <textarea

            name="description"

            placeholder="Event Description"

            value={formData.description}

            onChange={handleChange}

            required

          />





          {/* Date */}

          <input

            type="date"

            name="date"

            value={formData.date}

            onChange={handleChange}

            required

          />





          {/* Venue */}

          <input

            type="text"

            name="venue"

            placeholder="Venue"

            value={formData.venue}

            onChange={handleChange}

            required

          />





          {/* Category */}

          <input

            type="text"

            name="category"

            placeholder="Category"

            value={formData.category}

            onChange={handleChange}

            required

          />





          {/* Image URL */}

          <input

            type="text"

            name="image"

            placeholder="Image URL"

            value={formData.image}

            onChange={handleChange}

          />

        <div className="form-group">
          <label>Assign Faculty</label>

          <select
            name="faculty_id"
            value={formData.faculty_id}
            onChange={handleChange}
            className="faculty-select"
          >
            <option value="">Select Faculty</option>

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
        {/* <select
            name="faculty_id"
            value={formData.faculty_id}
            onChange={handleChange}
            >
            <option value="">
              Select Faculty
            </option>

            {faculties.map(f => (
              <option
                key={f.id}
                value={f.id}
              >
                {f.name}
              </option>
            ))}
            </select> */}

          <br></br>

          {/* Submit Button */}

          <button type="submit">

            Add Event

          </button>

        </form>

      </motion.div>

    </div>

  );

}

export default AddEvent;