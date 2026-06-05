import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { motion } from "framer-motion";

import "../../styles/manageStudents.css";

function ManageStudents() {

  const [students, setStudents] =
    useState([]);

  // Fetch Students

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(

        "http://localhost:5000/api/admin/students",

        {
          headers: {
            Authorization: token
          }
        }

      );
      console.log("Students Data:", res.data);
      setStudents(res.data);

    } catch (err) {

      console.log(err);

      alert(
        "Failed to Fetch Students"
      );

    }

  };

  // Remove Student

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to remove this student?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `http://localhost:5000/api/admin/students/${id}`,

        {
          headers: {
            Authorization: token
          }
        }

      );

      setStudents(

        students.filter(

          (student) =>
            student.registraion_id !== id

        )

      );

      alert(
        "Student Removed Successfully"
      );

    } catch (err) {

      console.log(err);
      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
        "Failed to Remove Student"
      );

    }

  };

  return (

    <div className="manage-students-page">

      <h1>
        Manage Students
      </h1>

      <div className="students-table-container">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Course</th>

              <th>Year</th>

              <th>Event</th>

              <th>Date</th>

              <th>Assigned Faculty Name</th>

              <th>Faculty Phone no.</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {students.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign: "center"
                  }}
                >
                  No Students Found
                </td>

              </tr>

            ) : (

              students.map((student) => (

                <motion.tr

                  key={student.registration_id}

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

                >

                  <td>
                    {student.id}
                  </td>

                  <td>
                    {student.name}
                  </td>

                  <td>
                    {student.email}
                  </td>

                  <td>
                    {student.phone || "-"}
                  </td>

                  <td>
                    {student.course || "-"}
                  </td>

                  <td>
                    {student.year || "-"}
                  </td>

                  <td>
                    {student.event_title || "-"}
                  </td>

                  <td>
                    {new Date(student.event_date)
                      .toLocaleDateString()}

                  </td>

                  <td>
                    {student.faculty_name || "-"}
                  </td>

                  <td>
                    {student.faculty_phone || "-"}
                  </td>

                  <td>
                    <button
                          className="delete-btn"
                          onClick={() => {
                            console.log("STUDENT FULL:", JSON.stringify(student));
                            console.log("ID:", student.id);
                            handleDelete(student.registration_id);
                          }}
                        >
                          Remove
                        </button>
                    {/* <button

                      className="delete-btn"

                      onClick={() =>
                        handleDelete(
                          student.id
                        )
                      }

                    >

                      Remove

                    </button> */}

                  </td>

                </motion.tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ManageStudents;