// src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming a successful response has a status code of 200
      if (response.status === 200) {
        setMessage("Signup successful! Please log in.");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setMessage(
        error.response.data.message || "An error occurred during signup."
      );
    } else if (error.request) {
      // The request was made but no response was received
      setMessage("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h2
        className="text-center mb-4"
        style={{ fontFamily: "Cursive", color: "#d75b1c" }}
      >
        Signup
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="form-control"
            style={{ border: "1px solid #d75b1c" }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            required
            className="form-control"
            style={{ border: "1px solid #d75b1c" }}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="form-control"
            style={{ border: "1px solid #d75b1c" }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            onChange={handleChange}
            required
            className="form-control"
            style={{ border: "1px solid #d75b1c" }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="form-control"
            style={{ border: "1px solid #d75b1c" }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="form-control"
            style={{ border: "1px solid #d75b1c" }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{ backgroundColor: "#d75b1c", border: "none" }}
        >
          Signup
        </button>
      </form>
      {message && <p className="text-danger text-center mt-3">{message}</p>}
      <p className="text-center mt-3">
        Already have an account?{" "}
        <a href="/login" style={{ color: "#d75b1c" }}>
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
