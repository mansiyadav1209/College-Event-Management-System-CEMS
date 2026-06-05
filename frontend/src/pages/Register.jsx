import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();




  // Form State

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: "",

    role: "student"

  });





  // Handle Input Change

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };





  // Handle Register

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await registerUser(formData);

      alert(res.message);

      navigate("/login");

    } catch (err) {

      alert(

        err.message ||

        "Registration Failed"

      );

    }

  };





  return (

    <div className="auth-container">

      <form

        className="auth-form"

        onSubmit={handleSubmit}

      >

        <h2>Create Account</h2>





        {/* Name */}

        <input

          type="text"

          name="name"

          placeholder="Enter Name"

          value={formData.name}

          onChange={handleChange}

          required

        />





        {/* Email */}

        <input

          type="email"

          name="email"

          placeholder="Enter Email"

          value={formData.email}

          onChange={handleChange}

          required

        />





        {/* Password */}

        <input

          type="password"

          name="password"

          placeholder="Enter Password"

          value={formData.password}

          onChange={handleChange}

          required

        />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </select>




        {/* Button */}

        <button type="submit">

          Register

        </button>





        {/* Login Link */}

        <p>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;