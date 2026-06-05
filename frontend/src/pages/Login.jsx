import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();




  // Form State

  const [formData, setFormData] = useState({

    email: "",

    password: ""

  });





  // Handle Input Change

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };





  // Handle Login

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await loginUser(formData);

      console.log("FULL RESPONSE:", res);
console.log("USER:", res.user);
console.log("ROLE:", res.user?.role);



      alert(res.message);





      // Save Token

      localStorage.setItem(

        "token",

        res.token

      );





      // Save User

      localStorage.setItem(

        "user",

        JSON.stringify(res.user)

      );





      // Redirect Based On Role

      if (res.user.role === "admin") {

        navigate("/admin/dashboard");

      } else if(res.user.role === "faculty"){

             navigate("/faculty-dashboard");

        }
        else {

        navigate("/student/dashboard");

      }

    } catch (err) {

      alert(

        err.message ||

        "Login Failed"

      );

    }

  };





  return (

    <div className="auth-container">

      <form

        className="auth-form"

        onSubmit={handleSubmit}

      >

        <h2>Login</h2>





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





        {/* Button */}

        <button type="submit">

          Login

        </button>





        {/* Register Link */}

        <p>

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Login;