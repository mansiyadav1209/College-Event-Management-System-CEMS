// const express = require("express");

// const router = express.Router();

// router.get("/", (req, res) => {

//   const events = [

//     {
//       id: 1,
//       title: "Hackathon 2026",
//       description: "24-hour coding competition",
//       date: "15 June 2026",
//       venue: "Auditorium",
//       category: "Technical",
//       image:
//         "https://images.unsplash.com/photo-1511578314322-379afb476865"
//     },

//     {
//       id: 2,
//       title: "Cultural Fest",
//       description: "Dance, music and fun activities",
//       date: "22 June 2026",
//       venue: "College Ground",
//       category: "Cultural",
//       image:
//         "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
//     },
//     {
//       id: 3,
//       title: "AI & ML Workshop",
//       description: "Hands-on workshop on Artificial Intelligence and Machine Learning.",
//       date: "25 June 2026",
//       venue: "Lab 4",
//       category: "Workshop",
//       image:
//         "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
//     },

//     {
//       id: 4,
//       title: "Startup Seminar",
//       description: "Learn startup building strategies from industry experts.",
//       date: "28 June 2026",
//       venue: "Seminar Hall",
//       category: "Business",
//       image:
//         "https://images.unsplash.com/photo-1515169067868-5387ec356754"
//     },

//     {
//       id: 5,
//       title: "Gaming Tournament",
//       description: "Compete in exciting multiplayer gaming challenges.",
//       date: "2 July 2026",
//       venue: "Computer Lab",
//       category: "Gaming",
//       image:
//         "https://images.unsplash.com/photo-1542751371-adc38448a05e"
//     },

//     {
//       id: 6,
//       title: "Robotics Competition",
//       description: "Build and showcase innovative robotic projects.",
//       date: "5 July 2026",
//       venue: "Innovation Center",
//       category: "Technical",
//       image:
//         "https://images.unsplash.com/photo-1531746790731-6c087fecd65a"
//     },

//     {
//       id: 7,
//       title: "Photography Contest",
//       description: "Capture the best campus moments and win prizes.",
//       date: "8 July 2026",
//       venue: "Media Club",
//       category: "Creative",
//       image:
//         "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4"
//     },

//     {
//       id: 8,
//       title: "Sports Meet",
//       description: "Annual inter-department sports competition.",
//       date: "12 July 2026",
//       venue: "Sports Ground",
//       category: "Sports",
//       image:
//         "https://images.unsplash.com/photo-1517649763962-0c623066013b"
//     },

//     {
//       id: 9,
//       title: "Web Development Bootcamp",
//       description: "Learn React, Node.js and full-stack development.",
//       date: "15 July 2026",
//       venue: "Lab 2",
//       category: "Workshop",
//       image:
//         "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
//     },

//     {
//       id: 10,
//       title: "Music Night",
//       description: "Enjoy live performances by college bands and singers.",
//       date: "18 July 2026",
//       venue: "Open Stage",
//       category: "Entertainment",
//       image:
//         "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
//     },
//     {
//         id: 11,
//         title: "Cyber Security Challenge",
//         description: "Participate in ethical hacking and cyber security problem-solving competition.",
//         date: "22 July 2026",
//         venue: "Cyber Security Lab",
//         category: "Cyber Security",
//         image:
//             "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
//     },

//     {
//         id: 12,
//         title: "Project Expo 2026",
//         description: "Showcase innovative final-year projects and technical models.",
//         date: "28 July 2026",
//         venue: "Exhibition Hall",
//         category: "Exhibition",
//         image:
//             "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
//     }

//   ];

//   res.json(events);

// });




// router.get("/:id", (req, res) => {

//   const events = [

//     {
//       id: 1,
//       title: "Hackathon 2026",
//       description: "24-hour coding competition for innovative projects.",
//       date: "15 June 2026",
//       venue: "Auditorium Hall",
//       category: "Technical",
//       image:
//         "https://images.unsplash.com/photo-1511578314322-379afb476865"
//     },

//     {
//       id: 2,
//       title: "Cultural Fest",
//       description: "Dance, music, fashion show and fun activities.",
//       date: "22 June 2026",
//       venue: "College Ground",
//       category: "Cultural",
//       image:
//         "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
//     },

//     {
//       id: 3,
//       title: "AI & ML Workshop",
//       description: "Hands-on workshop on Artificial Intelligence and Machine Learning.",
//       date: "25 June 2026",
//       venue: "Lab 4",
//       category: "Workshop",
//       image:
//         "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
//     },

//     {
//       id: 4,
//       title: "Startup Seminar",
//       description: "Learn startup building strategies from industry experts.",
//       date: "28 June 2026",
//       venue: "Seminar Hall",
//       category: "Business",
//       image:
//         "https://images.unsplash.com/photo-1515169067868-5387ec356754"
//     },

//     {
//       id: 5,
//       title: "Gaming Tournament",
//       description: "Compete in exciting multiplayer gaming challenges.",
//       date: "2 July 2026",
//       venue: "Computer Lab",
//       category: "Gaming",
//       image:
//         "https://images.unsplash.com/photo-1542751371-adc38448a05e"
//     },

//     {
//       id: 6,
//       title: "Robotics Competition",
//       description: "Build and showcase innovative robotic projects.",
//       date: "5 July 2026",
//       venue: "Innovation Center",
//       category: "Technical",
//       image:
//         "https://images.unsplash.com/photo-1531746790731-6c087fecd65a"
//     },

//     {
//       id: 7,
//       title: "Photography Contest",
//       description: "Capture the best campus moments and win prizes.",
//       date: "8 July 2026",
//       venue: "Media Club",
//       category: "Creative",
//       image:
//         "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4"
//     },

//     {
//       id: 8,
//       title: "Sports Meet",
//       description: "Annual inter-department sports competition.",
//       date: "12 July 2026",
//       venue: "Sports Ground",
//       category: "Sports",
//       image:
//         "https://images.unsplash.com/photo-1517649763962-0c623066013b"
//     },

//     {
//       id: 9,
//       title: "Web Development Bootcamp",
//       description: "Learn React, Node.js and full-stack development.",
//       date: "15 July 2026",
//       venue: "Lab 2",
//       category: "Workshop",
//       image:
//         "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
//     },

//     {
//       id: 10,
//       title: "Music Night",
//       description: "Enjoy live performances by college bands and singers.",
//       date: "18 July 2026",
//       venue: "Open Stage",
//       category: "Entertainment",
//       image:
//         "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
//     },

//     {
//       id: 11,
//       title: "Cyber Security Challenge",
//       description: "Participate in ethical hacking and cyber security problem-solving competition.",
//       date: "22 July 2026",
//       venue: "Cyber Security Lab",
//       category: "Cyber Security",
//       image:
//         "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
//     },

//     {
//       id: 12,
//       title: "Project Expo 2026",
//       description: "Showcase innovative final-year projects and technical models.",
//       date: "28 July 2026",
//       venue: "Exhibition Hall",
//       category: "Exhibition",
//       image:
//         "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
//     }

//   ];

//   const event = events.find(
//     (e) => e.id === parseInt(req.params.id)
//   );

//   if (!event) {

//     return res.status(404).json({
//       message: "Event not found"
//     });

//   }

//   res.json(event);

// });



// module.exports = router;
const express = require("express");

const router = express.Router();




// Import Controllers

const {

  getAllEvents,

  getSingleEvent,

  addEvent,

  updateEvent,

  deleteEvent,

  registerEvent,

  getMyRegisteredEvents,

  cancelRegistration,

  getRegisteredStudents,
  getFacultyEvents,
  getFaculties
 


} = require("../controllers/eventController");




// Import Middleware

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");




// ==============================
// EVENT ROUTES
// ==============================
// GET ALL EVENTS
router.get("/", getAllEvents);

// FACULTIES
router.get("/faculties", getFaculties);

// FACULTY EVENTS
router.get("/faculty/:id", getFacultyEvents);

// REGISTERED STUDENTS
router.get("/students/:eventId", getRegisteredStudents);

// REGISTER EVENT
router.post("/register", authMiddleware, registerEvent);

router.get(
  "/registered/:userId",
  authMiddleware,
  getMyRegisteredEvents
);

router.delete(
  "/cancel-registration",
  authMiddleware,
  cancelRegistration
);

// ADD EVENT
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addEvent
);

// UPDATE EVENT
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateEvent
);

// DELETE EVENT
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteEvent
);

// GET SINGLE EVENT  ← ALWAYS LAST
router.get(
  "/:id",
  authMiddleware,
  getSingleEvent
);



// // GET ALL EVENTS

// router.get(

//   "/",

//   getAllEvents

// );




// // GET SINGLE EVENT

// router.get(

//   "/:id",

//   getSingleEvent

// );




// // ADD EVENT (ADMIN ONLY)

// router.post(

//   "/",

//   authMiddleware,

//   adminMiddleware,

//   addEvent

// );




// // UPDATE EVENT (ADMIN ONLY)

// router.put(

//   "/:id",

//   authMiddleware,

//   adminMiddleware,

//   updateEvent

// );




// // DELETE EVENT (ADMIN ONLY)

// router.delete(

//   "/:id",

//   authMiddleware,

//   adminMiddleware,

//   deleteEvent

// );




// // REGISTER EVENT

// router.post(

//   "/register",

//   authMiddleware,

//   registerEvent

// );

// router.get(

//   "/registered/:userId",

//   authMiddleware,

//   getMyRegisteredEvents

// );

// router.delete(

//   "/cancel-registration",

//   authMiddleware,

//   cancelRegistration

// );


// router.get(
//   "/students/:eventId",
//   getRegisteredStudents
// );


// router.get(
//  "/faculty/:id",
//  getFacultyEvents
// );

// router.get(
//   "/faculties",
//   getFaculties
// );
// EXPORT

module.exports = router;