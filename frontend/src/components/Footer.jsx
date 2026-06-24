import React from "react";

import "../styles/footer.css";

function Footer() {

  return (

    <footer className="footer">




      {/* Top Section */}

      <div className="footer-container">




        {/* About */}

        <div className="footer-section">

          <h2>

            College Event Management

          </h2>





          <p>

            Manage college events, registrations,
            workshops, cultural activities,
            and student participation easily.

          </p>

        </div>





        {/* Quick Links */}

        <div className="footer-section">

          <h3>

            Quick Links

          </h3>





          <ul>

            <li>

              Home

            </li>





            <li>

              Events

            </li>





            <li>

              Dashboard

            </li>





            <li>

              Contact

            </li>

          </ul>

        </div>





        {/* Contact */}

        <div className="footer-section">

          <h3>

            Contact Us

          </h3>





          <p>

            📍 ABC Engineering College

          </p>





          <p>

            📧 support@collegeevents.com

          </p>





          <p>

            📞 +91 **********

          </p>

        </div>

      </div>





      {/* Bottom Section */}

      <div className="footer-bottom">

        <p>

          © 2026 College Event Management System.
          All Rights Reserved.
          <br></br>
         <h6> Made by institute with ♡</h6>

        </p>

      </div>

    </footer>

  );

}

export default Footer;