// import "../../styles/FacultyProfile.css";

// import React, {
//   useEffect,
//   useState
// } from "react";

// import axios from "axios";

// function FacultyProfile() {
  
//   const user =
//     JSON.parse(
//       localStorage.getItem("user")
//     );

//   const [profile, setProfile] =
//     useState({
//       name:"",
//       email:"",
//       phone: "",
//       department: ""
//     });

//   useEffect(() => {
   
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {

//     const res = await axios.get(
//       `https://college-event-management-system-cem.vercel.app/api/faculties/profile/${user.id}`
//     );

//     setProfile(res.data);

//   };

//   const updateProfile = async () => {
 
//       const user = JSON.parse(
//         localStorage.getItem("user")
//       );

//     try {

//       await axios.put(
//         `https://college-event-management-system-cem.vercel.app/api/faculties/profile/${user.id}`,
//         {
//           phone: profile.phone,
//           department:
//             profile.department
//         }
//       );

//       alert(
//         "Profile Updated Successfully"
//       );

//     } catch (err) {

//       console.log(err);

//       alert(
//         "Failed to Update Profile"
//       );

//     }

//   };

//   return (
    
//   <div className="faculty-profile-container">
//     <div className="faculty-profile-card">

//       <div className="faculty-profile-avatar">
//         {profile.name?.charAt(0).toUpperCase()}
//       </div>

//       <h2 className="faculty-profile-title">
//         Faculty Profile
//       </h2>

//       <p className="profile-info-text">
//         Update your contact details and department
//       </p>

//       <div className="faculty-profile-form">

//         <div className="faculty-form-group">
//           <label>Name</label>
//           <input
//             value={profile.name}
//             disabled
//           />
//         </div>

//         <div className="faculty-form-group">
//           <label>Email</label>
//           <input
//             value={profile.email}
//             disabled
//           />
//         </div>

//         <div className="faculty-form-group">
//           <label>Phone Number</label>
//           <input
//             value={profile.phone || ""}
//           />
//         </div>

//         <div className="faculty-form-group">
//           <label>Department</label>
//           <input
//             value={profile.department || ""}
//           />
//         </div>

//         <button
//           className="faculty-update-btn"
//           onClick={updateProfile}
//         >
//           Update Profile
//         </button>

//       </div>
//     </div>
//   </div>
// );

// }

// export default FacultyProfile;
import "../../styles/FacultyProfile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function FacultyProfile() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });

  useEffect(() => {
    if(user?.id){
      
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `https://college-event-management-system-cem.vercel.app/api/faculties/profile/${user.id}`
      );

      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
    fetchProfile();}
  }, [user?.id]);

  // const fetchProfile = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://college-event-management-system-cem.vercel.app/api/faculties/profile/${user.id}`
  //     );

  //     setProfile(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async () => {
    try {
      await axios.put(
        `https://college-event-management-system-cem.vercel.app/api/faculties/profile/${user.id}`,
        {
          phone: profile.phone,
          department: profile.department
        }
      );

      alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to Update Profile");
    }
  };

  return (
    <div className="faculty-profile-container">
      <div className="faculty-profile-card">

        <div className="faculty-profile-avatar">
          {profile.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="faculty-profile-title">
          Faculty Profile
        </h2>

        <p className="profile-info-text">
          Update your contact details and department
        </p>

        <div className="faculty-profile-form">

          <div className="faculty-form-group">
            <label>Name</label>
            <input
              value={profile.name}
              disabled
            />
          </div>

          <div className="faculty-form-group">
            <label>Email</label>
            <input
              value={profile.email}
              disabled
            />
          </div>

          <div className="faculty-form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div className="faculty-form-group">
            <label>Department</label>
            <input
              name="department"
              value={profile.department || ""}
              onChange={handleChange}
            />
          </div>

          <button
            className="faculty-update-btn"
            onClick={updateProfile}
          >
            Update Profile
          </button>

        </div>
      </div>
    </div>
  );
}

export default FacultyProfile;