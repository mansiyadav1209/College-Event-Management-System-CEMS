import API from "./api";




// Get All Events

export const getAllEvents = async () => {

  try {

    const res = await API.get("/events");

    return res.data;

  } catch (err) {

    throw err.response?.data || err;

  }

};




// Get Single Event

export const getSingleEvent = async (id) => {

  try {

    const res = await API.get(
      `/events/${id}`
    );

    return res.data;

  } catch (err) {

    throw err.response?.data || err;

  }

};




// Register for Event

export const registerForEvent = async (eventId) => {

  try {

    const res = await API.post(
      "/register-event",

      {
        event_id: eventId
      }
    );

    return res.data;

  } catch (err) {

    throw err.response?.data || err;

  }

};




// Create Event (Admin)

export const createEvent = async (eventData) => {

  try {

    const res = await API.post(
      "/events",
      eventData
    );

    return res.data;

  } catch (err) {

    throw err.response?.data || err;

  }

};




// Update Event (Admin)

export const updateEvent = async (

  id,

  updatedData

) => {

  try {

    const res = await API.put(

      `/events/${id}`,

      updatedData

    );

    return res.data;

  } catch (err) {

    throw err.response?.data || err;

  }

};




// Delete Event (Admin)

export const deleteEvent = async (id) => {

  try {

    const res = await API.delete(
      `/events/${id}`
    );

    return res.data;

  } catch (err) {

    throw err.response?.data || err;

  }

};