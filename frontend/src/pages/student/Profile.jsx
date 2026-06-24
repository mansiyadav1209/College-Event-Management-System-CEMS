// import React, {

//   useEffect,
//   useState

// } from "react";

// import axios from "axios";

// import { motion } from "framer-motion";

// import "../../styles/profile.css";

// function Profile() {




//   // User State

//   const [user, setUser] =
//     useState({

//       name: "",
//       email: "",
//       course: "",
//       year: "",
//       phone: "",
//       college: ""

//     });





//   // Fetch User Data

//   useEffect(() => {

//     fetchProfile();

//   }, []);





//   const fetchProfile = async () => {

//     try {

//       const token =
//         localStorage.getItem("token");





//       const loggedInUser =
//         JSON.parse(

//           localStorage.getItem("user")

//         );





//       const res = await axios.get(

//         `http://localhost:5000/api/students/profile/${loggedInUser.id}`,

//         {

//           headers: {

//             Authorization: token

//           }

//         }

//       );





//       setUser(res.data);

//     } catch (err) {

//       console.log(err);

//     }

//   };





//   // Handle Input Change

//   const handleChange = (e) => {

//     setUser({

//       ...user,

//       [e.target.name]:
//         e.target.value

//     });

//   };





//   // Update Profile

//   const handleSubmit =
//     async (e) => {

//     e.preventDefault();





//     try {

//       const token =
//         localStorage.getItem("token");





//       await axios.put(

//         `http://localhost:5000/api/students/profile/${user.id}`,

//         user,

//         {

//           headers: {

//             Authorization: token

//           }

//         }

//       );





//       alert(
//         "Profile Updated Successfully"
//       );

//     } catch (err) {

//       console.log(err);





//       alert(

//         err.response?.data?.message ||

//         "Failed to Update Profile"

//       );

//     }

//   };





//   return (

//     <div className="profile-page">

//       <motion.div

//         className="profile-container"

//         initial={{

//           opacity: 0,

//           y: 50

//         }}

//         animate={{

//           opacity: 1,

//           y: 0

//         }}

//         transition={{

//           duration: 0.6

//         }}

//       >

//         <h1>

//           Student Profile

//         </h1>





//         {/* Profile Image */}

//         <div className="profile-image-section">

//           <img

//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

//             alt="profile"

//           />

//         </div>





//         {/* Profile Form */}

//         <form onSubmit={handleSubmit}>





//           <input

//             type="text"

//             name="name"

//             value={user.name || ""}

//             onChange={handleChange}

//             placeholder="Full Name"

//           />





//           <input

//             type="email"

//             name="email"

//             value={user.email || ""}

//             onChange={handleChange}

//             placeholder="Email"

//           />





//           <input

//             type="text"

//             name="course"

//             value={user.course || ""}

//             onChange={handleChange}

//             placeholder="Course"

//           />





//           <input

//             type="text"

//             name="year"

//             value={user.year || ""}

//             onChange={handleChange}

//             placeholder="Year"

//           />





//           <input

//             type="text"

//             name="phone"

//             value={user.phone || ""}

//             onChange={handleChange}

//             placeholder="Phone Number"

//           />





//           <input

//             type="text"

//             name="college"

//             value={user.college || ""}

//             onChange={handleChange}

//             placeholder="College Name"

//           />





//           <button type="submit">

//             Save Changes

//           </button>

//         </form>

//       </motion.div>

//     </div>

//   );

// }

// export default Profile;
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { motion } from "framer-motion";

import "../../styles/profile.css";

function Profile() {

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    course: "",
    year: "",
    phone: "",
    college: "",
    role: ""
  });

  // Fetch Profile

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const loggedInUser =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!loggedInUser) return;

      const res = await axios.get(

        `https://college-event-management-system-cem.vercel.app/api/students/profile/${loggedInUser.id}`,

        {
          headers: {
            Authorization: token
          }
        }

      );

      setUser(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // Input Change

  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]:
        e.target.value

    });

  };

  // Update Profile

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `https://college-event-management-system-cem.vercel.app/api/students/profile/${user.id}`,

        user,

        {
          headers: {
            Authorization: token
          }
        }

      );

      // Update LocalStorage

      localStorage.setItem(

        "user",

        JSON.stringify({

          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role

        })

      );

      alert(
        "Profile Updated Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Failed to Update Profile"

      );

    }

  };

  return (

    <div className="profile-page">

      <motion.div

        className="profile-container"

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
          Student Profile
        </h1>

        {/* Profile Image */}

        <div className="profile-image-section">

          <img

            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

            alt="profile"

          />

        </div>

        {/* Profile Form */}

        <form onSubmit={handleSubmit}>

          <input

            type="text"

            name="name"

            value={user.name || ""}

            onChange={handleChange}

            placeholder="Full Name"

          />

          <input

            type="email"

            name="email"

            value={user.email || ""}

            onChange={handleChange}

            placeholder="Email"

          />

          <input

            type="text"

            name="course"

            value={user.course || ""}

            onChange={handleChange}

            placeholder="Course"

          />

          <input

            type="text"

            name="year"

            value={user.year || ""}

            onChange={handleChange}

            placeholder="Year"

          />

          <input

            type="text"

            name="phone"

            value={user.phone || ""}

            onChange={handleChange}

            placeholder="Phone Number"

          />

          <input

            type="text"

            name="college"

            value={user.college || ""}

            onChange={handleChange}

            placeholder="College Name"

          />

          <button type="submit">

            Save Changes

          </button>

        </form>

      </motion.div>

    </div>

  );

}

export default Profile;