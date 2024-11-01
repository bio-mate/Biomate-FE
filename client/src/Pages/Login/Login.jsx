// src/components/Login.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token, userData } = response.data; // Adjust based on your API response
        login(token, userData); // Call login from context
        // const userId = userData._id; // Access the user ID from the response
        //login(token, { ...userData, userId }); // Pass user ID along with user data
        setMessage("Login successful!");
        navigate("/profile");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      setMessage(
        error.response.data.message || "An error occurred during login."
      );
    } else if (error.request) {
      setMessage("No response received from the server.");
    } else {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="container" style={{marginTop:"5rem"}}>
      <h1
        className="text-center mb-4"
        style={{ fontFamily: "Cursive", color: "#d75b1c" }}
      >
        Hello Again!
      </h1>
      <h2
        className="text-center mb-4"
        style={{ fontFamily: "Cursive", color: "#d75b1c" }}
      >
        Welcome back you've been missed!
      </h2>
      {/* <h2 className="text-center mb-4" style={{ fontFamily: 'Cursive', color: '#d75b1c' }}>Login</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" style={{ fontWeight: "bold" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            style={{ border: "1px solid #d75b1c" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ fontWeight: "bold" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            style={{ border: "1px solid #d75b1c" }}
          />
        </div>
        <p style={{ float: "right" }}>
          <a href="/forgot-password" style={{ color: "#d75b1c" }}>
            Forgot Password?
          </a>
        </p>
        <button
          type="submit"
          className="btn btn-primary btn-block mt-3 login-btn"
          style={{ backgroundColor: "#d75b1c", border: "none"}}
        >
          Login
        </button>
      </form>
      {message && <p className="text-danger text-center mt-3">{message}</p>}

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <a href="/signup" style={{ color: "#d75b1c" }}>
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
