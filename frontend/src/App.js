// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
//     <div>
//       <h1>College Event Management System</h1>

//     </div>
//   );
// }

// export default App;
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* Public Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

/* Student Pages */
import StudentDashboard from "./pages/student/Dashboard";
import MyEvents from "./pages/student/MyEvents";
import Profile from "./pages/student/Profile";
import Notifications from "./pages/student/Notifications";

// faculty Pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyEvents from "./pages/faculty/FacultyEvents";
import FacultyNotifications from "./pages/faculty/FacultyNotifications";
import FacultyProfile from "./pages/faculty/FacultyProfile";

/* Admin Pages */
import AdminDashboard from "./pages/admin/Dashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import AddEvent from "./pages/admin/AddEvent";
import ManageStudents from "./pages/admin/ManageStudents";
import Analytics from "./pages/admin/Analytics";
import AdminNotifications from "./pages/admin/AdminNotifications";

function App() {

  return (

    <BrowserRouter>
     
     <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/events" element={<Events />} />

        <Route path="/events/:id" element={<EventDetails />} />



        {/* Student Dashboard Routes */}

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/student/my-events"
          element={<MyEvents />}
        />

        <Route
          path="/student/profile"
          element={<Profile />}
        />

        <Route
          path="/student/notifications"
          element={<Notifications />}
        />




       {/* Faculty Dashboard Routes */}

       <Route
        path="/faculty-dashboard"
        element={<FacultyDashboard />}
        />

        <Route
          path="/faculty-events"
          element={<FacultyEvents />}
        />

       <Route
        path="/faculty-notifications"
        element={<FacultyNotifications />}
      />

      <Route
        path="/faculty/profile"
        element={<FacultyProfile />}
      />


        {/* Admin Dashboard Routes */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/manage-events"
          element={<ManageEvents />}
        />

        <Route
          path="/admin/add-event"
          element={<AddEvent />}
        />

        <Route
          path="/admin/manage-students"
          element={<ManageStudents />}
        />

        <Route
          path="/admin/analytics"
          element={<Analytics />}
        />

        <Route
          path="/admin/notifications"
          element={<AdminNotifications />}
        />



        {/* 404 Page */}

        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center" }}>
              404 Page Not Found
            </h1>
          }
        />

      </Routes>
      <Footer/>

    </BrowserRouter>

  );
}

export default App;