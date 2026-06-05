import React from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();




  // Check Login

  const token =
    localStorage.getItem("token");




  // Get User

  const user = JSON.parse(

    localStorage.getItem("user")

  );





  // Logout

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");





    alert(
      "Logged Out Successfully"
    );





    navigate("/");

  };





  return (

    <nav className="navbar">




      {/* Logo */}

      <div className="navbar-logo">

        <Link to="/">

          College Events

        </Link>

      </div>





      {/* Navigation Links */}

      <ul className="navbar-links">




        {/* Home */}

        <li>

          <Link to="/">

            Home

          </Link>

        </li>





        {/* Events */}

        <li>

          <Link to="/events">

            Events

          </Link>

        </li>





        {/* If User Not Logged In */}

        {!token ? (

          <>

            <li>

              <Link to="/login">

                Login

              </Link>

            </li>





            <li>

              <Link to="/register">

                Register

              </Link>

            </li>

          </>

        ) : (

          <>




            {/* Dashboard Based On Role */}

            <li>
              <Link
                  to={
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : user?.role === "faculty"
                      ? "/faculty-dashboard"
                      : "/student/dashboard"
                  }
                >
                  Dashboard
                </Link>


            </li>





            {/* Logout */}

            <li>

              <button

                className="logout-btn"

                onClick={handleLogout}

              >

                Logout

              </button>

            </li>

          </>

        )}

      </ul>

    </nav>

  );

}

export default Navbar;